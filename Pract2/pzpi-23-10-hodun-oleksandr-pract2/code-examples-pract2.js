const express = require('express');
const app = express();

const PORT = 3000;
const VALID_TOKEN = 'Bearer user_token';

function getNearestServer(videoId) {
  return `https://edge-eu-1.netflix-demo.com/video/${videoId}/stream.mpd`;
}

app.get('/api/playback/start', (req, res) => {
  const { videoId } = req.query;
  const authHeader = req.headers.authorization;

  if (!authHeader || authHeader !== VALID_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!videoId) {
    return res.status(400).json({ error: 'videoId is required' });
  }

  const cdnUrl = getNearestServer(videoId);

  res.json({
    videoId: Number(videoId),
    title: 'Example Series',
    quality: '1080p',
    cdnUrl,
    subtitles: ['uk', 'en', 'pl']
  });
});

app.get('/video/:videoId/stream.mpd', (req, res) => {
  const { videoId } = req.params;

  res.type('application/dash+xml');
  res.send(`
<?xml version="1.0" encoding="UTF-8"?>
<MPD type="static">
  <Period>
    <AdaptationSet mimeType="video/mp4">
      <Representation id="${videoId}" bandwidth="5000000" width="1920" height="1080" />
    </AdaptationSet>
  </Period>
</MPD>
  `);
});

app.listen(PORT, () => {
  console.log(`Demo server started on http://localhost:${PORT}`);
  console.log(`Playback API example: http://localhost:${PORT}/api/playback/start?videoId=78521`);
  console.log(`CDN example: http://localhost:${PORT}/video/78521/stream.mpd`);
});
