import { useState, useRef, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { processImage, imageDataToBinaryArray, findConnectedGroups, } from '../utils/imageProcessing';
import ColorPicker from '../components/ColorPicker';
import ThresholdSlider from '../components/ThresholdSlider';
import DetectionInfo from '../components/DetectionInfo';
import ProcessButton from '../components/ProcessButton'
import JobStatus from '../components/JobStatus';
import TimestampSelector from '../components/TimestampSelector';

export default function VideoPreview() {
    const { filename } = useParams();

    const [targetColor, setTargetColor] = useState("#ff0000");
    const [threshold, setThreshold] = useState(120);
    const [detectionInfo, setDetectionInfo] = useState(null);
    const [processing, setProcessing] = useState(false)
    const [jobId, setJobId] = useState(null)
    const [processError, setProcessError] = useState(null)
    const [timestamp, setTimestamp] = useState(0)
    const [duration, setDuration] = useState(0) 

    const imageRef = useRef(null);
    const canvasRef = useRef(null);
    const navigate = useNavigate()

    const thumbnailUrl = `/api/thumbnail/${encodeURIComponent(filename)}?time=${timestamp}`;

    const updatePreview = useCallback(() => {
        const image = imageRef.current;
        const canvas = canvasRef.current;

        if (!image || !canvas || !image.complete || !image.naturalWidth) return;

        const context = canvas.getContext('2d');

        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;

        context.drawImage(image, 0, 0);

        const imageData = context.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
        );
                
        const processedImage = processImage(imageData, targetColor, threshold);
        const binaryImage = imageDataToBinaryArray(processedImage);

        const groups = findConnectedGroups(binaryImage);
        setDetectionInfo({
            totalGroups: groups.length,
            largestGroup: groups.length > 0 ? groups[0] : null,
        });

        context.putImageData(processedImage, 0, 0);

        if (groups.length > 0) {
        const largestGroup = groups[0];
        const { x, y } = largestGroup.centroid;

        context.beginPath();
        context.arc(x, y, 6, 0, 2 * Math.PI);
        context.fillStyle = '#ff0000';
        context.fill();

        context.lineWidth = 2;
        context.strokeStyle = '#ffffff';
        context.stroke();
        }

    }, [targetColor, threshold]);

    useEffect(() => {
        updatePreview();
    }, [updatePreview]);

    useEffect(() => {
    setTimestamp(0);
    setDuration(0);
    }, [filename]);

    async function handleProcessVideo() {
    if (processing) return;

    setProcessing(true);
    setProcessError(null);
    setJobId(null);

    try {
        const color = targetColor.replace('#', '');

        const params = new URLSearchParams({
        targetColor: color,
        threshold: String(threshold),
        });

        const url =
        `/api/process/${encodeURIComponent(filename)}?${params}`

        const response = await fetch(url, {
        method: 'POST',
        });

        if (!response.ok) {
        throw new Error(
            `Failed to start processing (HTTP ${response.status})`
            );
        };

        const data = await response.json();

        if (!data.jobId) {
            throw new Error('Backend did not return a job ID');
        };

        setJobId(data.jobId);
    } catch (error) {
        setProcessError(error.message);
    } finally {
        setProcessing(false);
        }
    }

    return (
    <div className="video-preview">

        <button
            type="button"
            className="back-button"
            onClick={() => navigate('/videos')}
        >
            Back to Videos
        </button>
        <h1>Video Preview</h1>
        <h2>{filename}</h2>

        <video
            key={filename}
            src={`/videos/${encodeURIComponent(filename)}`}
            preload="metadata"
            style={{ display: 'none' }}
            onLoadedMetadata={(event) => {
                const videoDuration = event.currentTarget.duration

                if (Number.isFinite(videoDuration)) {
                setDuration(videoDuration)
                }
            }}
        />

        <TimestampSelector
            timestamp={timestamp}
            duration={duration}
            onTimestampChange={setTimestamp}
        />

        <div className="image-container">
        <div className="preview-panel">
            <h3>Original Image</h3>
            <img
            ref={imageRef}
            src={thumbnailUrl}
            alt="Original video frame"
            onLoad={updatePreview}
            />
        </div>

        <div className="preview-panel">
            <h3>Binarized Preview</h3>
            <canvas ref={canvasRef} />
        </div>
        </div>

        <div className="processing-controls">
        <ColorPicker
            color={targetColor}
            onColorChange={setTargetColor}
        />

        <ThresholdSlider
            threshold={threshold}
            onThresholdChange={setThreshold}
        />
        </div>

        <DetectionInfo detectionInfo={detectionInfo} />

        <div className="process-section">
        <ProcessButton onProcess={handleProcessVideo} processing={processing} />
        {processError && (
            <p className="process-error">
            Error: {processError}
            </p>
        )}

        <JobStatus jobId={jobId} />
        </div> 

    </div>
    )
}