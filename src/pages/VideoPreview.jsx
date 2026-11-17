import { useState, useRef, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { processImage, imageDataToBinaryArray, findConnectedGroups, } from '../utils/imageProcessing';
import ColorPicker from '../components/ColorPicker';
import ThresholdSlider from '../components/ThresholdSlider';

export default function VideoPreview() {
    const { filename } = useParams();

    const [targetColor, setTargetColor] = useState("#ff0000");
    const [threshold, setThreshold] = useState(120);

    const imageRef = useRef(null);
    const canvasRef = useRef(null);

    const thumbnailUrl = `/api/thumbnail/${encodeURIComponent(filename)}`;

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
        // Convert the processed pixels into a 0/1 array.
        const binaryImage = imageDataToBinaryArray(processedImage);

        // Find and sort all connected groups.
        const groups = findConnectedGroups(binaryImage);

        // Display the binarized image.
        context.putImageData(processedImage, 0, 0);

        // Draw the centroid of the largest group.
        if (groups.length > 0) {
        const largestGroup = groups[0]
        const { x, y } = largestGroup.centroid

        context.beginPath()
        context.arc(x, y, 6, 0, 2 * Math.PI)
        context.fillStyle = '#ff0000'
        context.fill()

        // White outline makes the centroid easier to see.
        context.lineWidth = 2
        context.strokeStyle = '#ffffff'
        context.stroke()
        }

    }, [targetColor, threshold]);

    useEffect(() => {
        updatePreview();
    }, [updatePreview])

    return (
        <div className="video-preview">
            <h1>Video Preview</h1>
            <h2>{filename}</h2>

            <div className="image-container">
                <div>
                    <h3>Original Image</h3>
                    <img
                        ref={imageRef}
                        src={thumbnailUrl}
                        alt="Original video frame"
                        onLoad={updatePreview}
                        style={{ maxWidth: "100%" }}
                    />
                </div>

                <div>
                    <h3>Binarized Preview</h3>
                    <canvas 
                        ref={canvasRef}
                        style={{ maxWidth: "100%", height: "auto" }}
                    />
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
            </div>
        </div>
    )
}