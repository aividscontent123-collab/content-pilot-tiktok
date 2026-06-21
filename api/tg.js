module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'GET') return res.status(200).json({ ok: true, service: 'tg', status: 'ready' });
  if (req.method !== 'POST') return res.status(405).json({ ok: false });
  const update = req.body || {};
  const received = Boolean(update.message || update.edited_message || update.channel_post || update.callback_query);
  return res.status(200).json({ ok: true, received });
};
