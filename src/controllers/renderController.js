const aiService = require('../services/aiService');

const applyStyle = async (req, res) => {
  const { modelFileId, style } = req.body;
  const userId = req.user.id;
  try {
    const result = await aiService.applyRenderStyle(modelFileId, style, userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to apply render style' });
  }
};

const exportModel = async (req, res) => {
  const { modelFileId, format } = req.body;
  const userId = req.user.id;
  try {
    const result = await aiService.exportModelForRendering(modelFileId, format, userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to export model for rendering' });
  }
};

module.exports = {
  applyStyle,
  exportModel
};