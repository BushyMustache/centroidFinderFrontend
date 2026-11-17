
function DetectionInfo({ detectionInfo }) {
  return (
    <section className="detection-info">
      <h3>Detection Results</h3>

      {!detectionInfo ? (
        <p>Waiting for image processing...</p>
      ) : (
        <>
          <p>
            Connected Groups: {detectionInfo.totalGroups}
          </p>

          {detectionInfo.largestGroup ? (
            <>
              <p>
                Largest Group Size:{' '}
                {detectionInfo.largestGroup.size} pixels
              </p>

              <p>
                Centroid X:{' '}
                {detectionInfo.largestGroup.centroid.x}
              </p>

              <p>
                Centroid Y:{' '}
                {detectionInfo.largestGroup.centroid.y}
              </p>
            </>
          ) : (
            <p>No matching pixels detected.</p>
          )}
        </>
      )}
    </section>
  )
}

export default DetectionInfo
