const StockEnquiry = require("../model/stockEnquriy.model");

const getStockEnquiries = async (req, res) => {
  try {
    const enquiries = await StockEnquiry.find();
    res.status(200).json(enquiries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getStockEnquiryById = async (req, res) => {
  try {
    const enquiry = await StockEnquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }
    res.status(200).json(enquiry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createStockEnquiry = async (req, res) => {
  try {
    const enquiry = await StockEnquiry.create(req.body);
    res.status(201).json(enquiry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const deleteStockEnquiry = async (req, res) => {
  try {
    const enquiry = await StockEnquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }
    res.status(200).json({ message: "Enquiry deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getStockEnquiries,
  getStockEnquiryById,
  createStockEnquiry,
  deleteStockEnquiry,
};
