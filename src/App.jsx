import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import VideoChooser from './pages/VideoChooser.jsx';
import VideoPreview from './pages/VideoPreview.jsx';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/videos"/>} />
        <Route path="/videos" element={<VideoChooser />} />
        <Route path="/preview/:filename" element={<VideoPreview />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
