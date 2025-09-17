const canvasService = require('../services/canvasService');

const convertSketch = async (req, res) => {
  try {
    const { sketchFileId } = req.body;
    const userId = req.user.id; 
    const result = await canvasService.convertSketch(sketchFileId, userId);
    res.status(200).json({ message: 'Sketch conversion initiated', data: result });
  } catch (error) {
    res.status(500).json({ message: 'Error converting sketch', error: error.message });
  }
};

module.exports = {
  convertSketch
};