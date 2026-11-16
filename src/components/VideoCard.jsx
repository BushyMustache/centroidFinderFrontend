import { useNavigate } from 'react-router-dom';

export default function VideoCard({ filename }) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/preview/${encodeURIComponent(filename)}`);
    }

    return (
        <div className="video-card" onClick={handleClick}>
            <h3>{filename}</h3>
            <p>Click to preview video</p>
        </div>
    )
}