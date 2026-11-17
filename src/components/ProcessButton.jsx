function ProcessButton({ onProcess, processing }) {
  return (
    <button
      type="button"
      onClick={onProcess}
      disabled={processing}
      className="process-button"
    >
      {processing ? 'Starting...' : 'Process Video'}
    </button>
  );
}

export default ProcessButton
