import { useParams } from 'react-router-dom';

export default function VideoPreview() {
    const { filename } = useParams();

    const thumbnailUrl = `/api/thumbnail/${encodeURIComponent(filename)}`;

    return (
        <div>
            <h1>Video Preview</h1>
            
            <h2>{filename}</h2>

            <img 
                src={thumbnailUrl}
                alt={`Thumbnail of ${filename}`}
                style={{ width: "400px" }}
            />
        </div>
    )
}