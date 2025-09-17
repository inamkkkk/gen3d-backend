const userService = require('../services/userService');
const logService = require('../services/logService');

const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const newUser = await userService.registerUser(username, email, password, role);
    res.status(201).json(newUser);
  } catch (error) {
    logService.logError('userController', 'registerUser', error.message);
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await userService.loginUser(email, password);
    res.status(200).json({ token });
  } catch (error) {
    logService.logError('userController', 'loginUser', error.message);
    res.status(401).json({ message: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    logService.logError('userController', 'getUserProfile', error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile
};