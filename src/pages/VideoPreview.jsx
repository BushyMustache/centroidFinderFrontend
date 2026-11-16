import { useParams } from 'react-router-dom';

export default function VideoPreview() {
    const { filename } = useParams();

    return (
        <div>
            <h1>Video Preview</h1>
            <p>Selected video: {filename}</p>
        </div>
    )
}