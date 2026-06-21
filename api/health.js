export default function handler(req, res) {
  return res.status(200).json({
    ok: true,
    service: 'content-pilot-tiktok',
    app: 'AI Content Factory control plane',
    timestamp: new Date().toISOString()
  });
}
