const aiService = require('../services/aiService');

const generateViews = async (req, res) => {
  const { modelFileId } = req.body;
  const userId = req.user.id;

  try {
    const result = await aiService.generateViews(modelFileId, userId);
    res.status(200).json({ message: 'Views generated successfully', data: result });
  } catch (error) {
    res.status(500).json({ message: 'Error generating views', error: error.message });
  }
};

module.exports = {
  generateViews
};