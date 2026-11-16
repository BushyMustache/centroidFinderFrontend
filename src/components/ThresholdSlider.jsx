export default function ThresholdSlider({ threshold, onThresholdChange }) {
    return (
        <div className="threshold-slider">
            <label htmlFor="threshold">
                Threshold: {threshold}
            </label>

            <input 
                id="threshold"
                type="range"
                in="0"
                max="441"
                value={threshold}
                onChange={(event) => onThresholdChange(Number(event.target.value))}
            />
        </div>
    )
}