function TimestampSelector({
  timestamp,
  duration,
  onTimestampChange,
}) {
  return (
    <div className="timestamp-selector">
      <h3>Select Video Timestamp</h3>

      <div className="timestamp-controls">
        <input
          type="range"
          min="0"
          max={duration}
          step="0.1"
          value={timestamp}
          onChange={(event) =>
            onTimestampChange(Number(event.target.value))
          }
          disabled={duration <= 0}
        />

        <div className="timestamp-input">
          <label htmlFor="timestamp-seconds">
            Time (seconds):
          </label>

          <input
            id="timestamp-seconds"
            type="number"
            min="0"
            max={duration}
            step="0.1"
            value={timestamp}
            onChange={(event) => {
              const value = Number(event.target.value)

              if (Number.isFinite(value)) {
                onTimestampChange(
                  Math.min(Math.max(value, 0), duration)
                )
              }
            }}
            disabled={duration <= 0}
          />
        </div>
      </div>

      <p>
        {timestamp.toFixed(1)}s / {duration.toFixed(1)}s
      </p>
    </div>
  )
}

export default TimestampSelector
