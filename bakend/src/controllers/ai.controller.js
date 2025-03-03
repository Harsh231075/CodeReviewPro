const aiService = require('../services/ai.service')

module.exports.getReview = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const code = req.body.code;
  if (!code) {
    res.status(400).send('Prompt is required')
  }
  const reponse = await aiService(code);

  res.send(reponse);
}
