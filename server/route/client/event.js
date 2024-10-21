const eventSchema = require('../../model/admin/event')
const router = require('express').Router()
require('dotenv').config()

router.get("/all/active_Event", async (req, res) => {
    try {
      const response = await eventSchema.find({eventStaus:true})
      res.status(200).json({
        statusCode: 200,
        success: true,
        message: "Successfully Fethced",
        data: response,
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

module.exports = router