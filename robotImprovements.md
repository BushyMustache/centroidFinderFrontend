# Improvements

## Optimization
- Keep image processing from blocking the UI. 
  - In `VideoPreview.jsx`, every color or threshold change runs the full preview calculation synchronously. That calculation also converts pixels into nested arrays and finds connected components in `imageProcessing.js`. On large frames, slider changes may make the page feel sluggish. Consider moving the work to a Web Worker, and avoid constructing intermediate per-pixel objects and nested arrays.
- Reduce thumbnail requests while scrubbing. 
  - Changing the timestamp changes the thumbnail URL, potentially triggering a request for every slider update. Debounce or throttle preview requests, or make sure the backend efficiently serves frequent timestamp requests.
- Add focused tests for the image algorithm. 
  - In particular, test no matching pixels, multiple components, diagonal pixels (to document the current four-neighbor connectivity), and fractional centroid coordinates. These would help protect the core behavior while optimizing it