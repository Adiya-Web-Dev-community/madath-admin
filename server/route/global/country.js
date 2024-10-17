const express = require("express");
const router = express.Router();
const CountryList = require('../../data/countryList')
// const countryData = require('../../data/countryData')



router.get('/get_all_CountryList', async (req, res) => {
    try {
        const { searchName = '' } = req.query;
        const normalizedSearchName = searchName.trim().toLowerCase();
        // Check if CountryList.data is defined and is an array
        if (!Array.isArray(CountryList.data)) {
            throw new Error('CountryList.data is not defined or is not an array');
        }

        // Filter the country list based on the search term
        const filteredData = CountryList.data.filter(el => 
            el.name.toLowerCase().includes(normalizedSearchName)
        );

        // Send the filtered data in the response
        res.status(200).json({ data: filteredData,totalItem:filteredData?.length });
    } catch (error) {
        // Send a detailed error message in the response
        res.status(500).json({
            error: error.message,
            stack: error.stack // Optionally include the stack trace for debugging
        });
    }
});



module.exports = router
