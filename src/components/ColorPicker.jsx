export default function ColorPicker({ color, onColorChange }) {
    return (
        <div className="color-picker">
            <label htmlFor="target-color">
                Target Color:
            </label>

            <input 
                id="target-color"
                type="color"
                value={color}
                onChange={(event) => onColorChange(event.target.value)}
            />

            <span>{color}</span>
        </div>
    )
}