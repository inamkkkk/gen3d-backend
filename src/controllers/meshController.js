const aiService = require('../services/aiService');

const meshController = {
  generateMesh: async (req, res) => {
    try {
      const { modelFileId } = req.body;
      const userId = req.user.id;
      const meshFile = await aiService.generateMesh(modelFileId, userId);
      res.status(200).json(meshFile);
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate mesh' });
    }
  }
};

module.exports = meshController;