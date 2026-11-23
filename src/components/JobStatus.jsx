import { useEffect, useState } from 'react'

function JobStatus({ jobId }) {
  const [status, setStatus] = useState('waiting')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!jobId) return

    let cancelled = false
    let timeoutId

    async function checkStatus() {
      try {
        const response = await fetch(
          `/api/process/${encodeURIComponent(jobId)}/status`
        )

        if (!response.ok) {
          throw new Error(
            `Failed to check status (HTTP ${response.status})`
          )
        }

        const data = await response.json()

        if (cancelled) return

        setStatus(data.status)
        setResult(data.result ?? null)

        if (data.status === 'error' || data.status === 'failed') {
          setError(data.error || 'Video processing failed')
          return
        }

        if (data.status === 'done') {
          return
        }

        // Check again after 2 seconds.
        timeoutId = setTimeout(checkStatus, 2000)
        } catch (err) {
        if (!cancelled) {
          setError(err.message)
        }
      }
    }

    setStatus('waiting')
    setResult(null)
    setError(null)

    checkStatus()

    return () => {
      cancelled = true
      clearTimeout(timeoutId)
    }
}, [jobId])

if (!jobId) return null

    return (
    <div className="job-status">
        <h3>Video Processing Status</h3>

        <p>
        <strong>Job ID:</strong> {jobId}
        </p>

        {error ? (
        <p className="process-error">Error: {error}</p>
        ) : status === 'done' ? (
        <>
            <p>Processing completed successfully!</p>

            {result && (
            <a className="download-csv-button"href={result} download>
                Download CSV Results
            </a>
            )}
        </>
        ) : (
        <p>Processing video... Current status: {status}</p>
        )}
    </div>
    )
}

export default JobStatus
