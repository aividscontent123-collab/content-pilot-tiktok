module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({
    ok: true,
    service: 'ai-content-factory-telegram',
    webhook: '/api/telegram/webhook',
    commands: ['stats', 'generate', 'new_video', 'queue', 'status', 'approve', 'reject', 'publish_next']
  });
};
