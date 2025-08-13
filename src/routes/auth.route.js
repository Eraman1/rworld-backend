const express = require("express");
const {
  LoginUser,
  RefreshAccessToken,
} = require("../controller/auth.controller");
const router = express.Router();

// @route   POST /api/auth/login
// @desc    Login user and return tokens
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 example: admin123
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Bad request
 */
router.post("/login", LoginUser);

// @route   POST /api/auth/refresh
// @desc    Refresh access token using refresh token
router.post("/refresh", RefreshAccessToken);

module.exports = router;
