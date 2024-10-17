const router = require("express").Router();
const eventSchema = require("../../model/admin/event");

router.get("/all", async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  try {
    const totalDocuments = await eventSchema.countDocuments();
    const response = await eventSchema
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Successfully Fethced",
      data: response,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalDocuments / limit),
      totalDocuments,
      dataCount: response.length,
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      success: false,
      message: error.message || "Somthing went wrong....",
      error: error,
      devErrorMessage: error.message,
    });
  }
});

router.post("/create", async (req, res) => {
  try {
    const tempDoc = new eventSchema(req.body);
    const response = await tempDoc.save();

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Successfully Save",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      success: false,
      message: "Somthing went wrong....",
      devErrorMessage: error.message,
    });
  }
});

router.patch("/update/:id", async (req, res) => {
  try {
    const response = await eventSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Successfully Updated",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      success: false,
      message: "Somthing went wrong....",
      devErrorMessage: error.message,
    });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const response = await eventSchema.findByIdAndDelete(req.params.id);
    res.status(200).json({
      statusCode: 200,
      success: true,
      data: response,
      message: "Successfully Deleted",
    });
  } catch (error) {
    res.status(200).json({
      statusCode: 200,
      success: false,
      data: response,
      message: "Somthing went wrong....",
      devErrorMessage: error.message,
    });
  }
});

module.exports = router;
