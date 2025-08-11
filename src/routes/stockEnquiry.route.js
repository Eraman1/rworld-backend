const express = require("express");

const { verifyToken } = require("../middleware/auth.middleware");
const {
  getStockEnquiries,
  getStockEnquiryById,
  createStockEnquiry,
  deleteStockEnquiry,
} = require("../controller/stockEnquiry.controller");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Stock Enquiries
 *   description: Manage customer enquiries

 * /api/stock-enquiry:
 *   get:
 *     summary: Get all enquiries
 *     tags: [Stock Enquiries]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of enquiries
 *       401:
 *         description: Unauthorized
 *
 *   post:
 *     summary: Create a new enquiry
 *     tags: [Stock Enquiries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               company:
 *                 type: string
 *               service:
 *                 type: string
 *               message:
 *                 type: string
 *               path:
 *                 type: string
 *     responses:
 *       201:
 *         description: Enquiry created
 *       400:
 *         description: Invalid input
 *
 * /api/stock-enquiry/{id}:
 *   get:
 *     summary: Get enquiry by ID
 *     tags: [Stock Enquiries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Enquiry details
 *       404:
 *         description: Not found
 *
 *   delete:
 *     summary: Delete enquiry by ID
 *     tags: [Stock Enquiries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted successfully
 *       404:
 *         description: Not found
 */

router.get("/", verifyToken, getStockEnquiries);

router.get("/:id", verifyToken, getStockEnquiryById);

router.post("/", createStockEnquiry);

router.delete("/:id", verifyToken, deleteStockEnquiry);

module.exports = router;
