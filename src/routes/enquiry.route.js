const express = require("express");
const {
  getEnquiries,
  getEnquiryById,
  createEnquiry,
  deleteEnquiry,
} = require("../controller/enquiry.controller");
const { verifyToken } = require("../middleware/auth.middleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Enquiries
 *   description: Enquiry management APIs
 */

/**
 * @swagger
 * /api/enquiry:
 *   get:
 *     summary: Get all enquiries
 *     tags: [Enquiries]
 *     responses:
 *       200:
 *         description: List of all enquiries
 */
router.get("/",verifyToken, getEnquiries);

/**
 * @swagger
 * /api/enquiry/{id}:
 *   get:
 *     summary: Get a single enquiry by ID
 *     tags: [Enquiries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Enquiry ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Enquiry found
 *       404:
 *         description: Enquiry not found
 */
router.get("/:id",verifyToken, getEnquiryById);

/**
 * @swagger
 * /api/enquiry:
 *   post:
 *     summary: Create a new enquiry
 *     tags: [Enquiries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               phone:
 *                 type: string
 *                 example: "+91-9876543210"
 *               company:
 *                 type: string
 *                 example: RWorld Software
 *               service:
 *                 type: string
 *                 example: Web Development
 *               message:
 *                 type: string
 *                 example: I need a new company website.
 *               path:
 *                 type: string
 *                 example: /contact
 *     responses:
 *       201:
 *         description: Enquiry created successfully
 *       400:
 *         description: Bad request
 */
router.post("/", createEnquiry);

/**
 * @swagger
 * /api/enquiry/{id}:
 *   delete:
 *     summary: Delete an enquiry by ID
 *     tags: [Enquiries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Enquiry ID to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Enquiry deleted
 *       404:
 *         description: Enquiry not found
 */
router.delete("/:id",verifyToken, deleteEnquiry );

module.exports = router;
