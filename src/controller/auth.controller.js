const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const LoginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // const token = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
    //const token = await getToken(user);
    const token = await getTokens(user._id, user.email, user.isAdmin);
    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const RefreshAccessToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token is required" });
  }

  try {
    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Verify refresh token matches DB
    const user = await User.findById(decoded.userId);
    if (!user || user.refreshToken !== refreshToken) {
      return res
        .status(403)
        .json({ message: "Invalid or revoked refresh token" });
    }

    // Generate new tokens
    const tokens = await getTokens(
      decoded.userId,
      decoded.email,
      decoded.isAdmin
    );

    return res.status(200).json({
      message: "Token refreshed successfully",
      tokens,
    });
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Invalid or expired refresh token" });
  }
};
// helper function
const getTokens = async (userId, email, isAdmin) => {
  const accessToken = jwt.sign(
    { userId, email, isAdmin },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { userId, email, isAdmin },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  // Save refresh token (optional)
  await User.updateOne({ _id: userId }, { $set: { refreshToken } });

  return { accessToken, refreshToken };
};

module.exports = {
  LoginUser,
  RefreshAccessToken,
};
