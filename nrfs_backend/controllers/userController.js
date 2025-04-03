// controllers/userController.js
const { registerUser, loginUser } = require('../services/userService');

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    const newUser = await registerUser(name, email, password);
    return res.status(201).json({
      message: 'User created successfully.',
      user: { id: newUser.id, email: newUser.email }
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const { token, user } = await loginUser(email, password);
    return res.json({ token, user: { id: user.id, email: user.email } });
  } catch (err) {
    next(err);
  }
};
