const crypto = require('crypto');
const axios = require('axios');
const  ServiceBooking  = require('../model/client/Genral_Service_Boooking'); // Ensure you have the correct path to your models
const  Barber_Booking  = require('../model/client/Barber_Booking'); // Ensure you have the correct path to your models
const  Restaurant_Booking  = require('../model/client/Restaurant_Booking'); // Ensure you have the correct path to your models


const salt_key = '14fa5465-f8a7-443f-8477-f986b8fcfde9'; // Replace with your actual salt key
const getBookedItemData = (type)=>{
    const getPaymentStatus = async (req,res) => {
        const merchantTransactionId ='MID'+ req.params.id
        const merchantId = 'PGTESTPAYUAT77'
        let data = []
    
        if(type==="Genral Service"){
         data = await ServiceBooking.findById(req.params.id)
        // .select('servicess')
        .populate('itemMongooseId')
        .exec();
        } else if(type==="Barber"){
            data = await  Barber_Booking.findById(req.params.id)
            // .select('servicess')
            .populate('itemMongooseId')
            .exec();
        } else if(type==="Restaurant_Booking"){
            data = await  Restaurant_Booking.findById(req.params.id)
            // .select('servicess')
            .populate('itemMongooseId')
            .exec();
        }
    
        const keyIndex = 1
        const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + salt_key;
        const sha256 = crypto.createHash('sha256').update(string).digest('hex');
        const checksum = sha256 + '###' + keyIndex;
    
        const options = {
            method: 'GET',
            url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum,
                'X-MERCHANT-ID': `${merchantId}`
            }
    
    
        }
    
    
        axios.request(options).then(function (response) {
            if (response.data.success === true) {
                const url = 'http://localhost:5173/success'
                return res.status(200).json({transitionData:response.data.itemMongooseId,url,data})
            } else {
                const url = 'http://localhost:5173/fail'
                return res.status(200).json({transitionData:response.data.itemMongooseId,url,data})
            }
        }).catch(function (error) {
            return res.status(500).json(error)
        })
    
    };

    
    return  getPaymentStatus
}

module.exports = {getBookedItemData}
