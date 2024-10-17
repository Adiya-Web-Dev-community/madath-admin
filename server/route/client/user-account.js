const userSchema = require('../../model/client/user-account')
const adminAccountSchema = require('../../model/admin/adminAccount')

const router = require('express').Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // assuming you want to use JWT for authentication
const sendOtpMail = require('../../function/sendOtpMail');
const { adminAccountMiddleware,adminAccountRoleCheckMiddleware,clientAccountMiddleware } = require('../../middleware/auth');
require('dotenv').config()

router.post('/create',async (req,res)=>{
try{
    const findUser = await userSchema.findOne({ email: req.body.email });
    const emailExists = !findUser; 
    
    const min = 100000;
    const max = 999999;
    const generatedOTP = Math.floor(Math.random() * (max - min + 1)) + min;
    

    if (emailExists) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10); 
        const tempDoc = new  userSchema({...req.body,password:hashedPassword,otp:generatedOTP})
        const saveDoc = await tempDoc.save()
        sendOtpMail(req.body.email,generatedOTP)
        return res.status(200).json({"statusCode": 200,success:true,data:saveDoc,message:"Account Request sent"})
    }else{
       return  res.status(200).json({ "statusCode": 409,success:false,"message":"Usre All Ready exist"})
    }

}catch(error){
res.status(500).json({error:error,message:error.message,success:false})
}
})

router.post('/verify_createdAccount', async (req, res) => {
  try {
      const { otp, email } = req.body;

      const findUser = await userSchema.findOne({ email, otp });

      if (!findUser) {
          return  res.status(200).json({ "statusCode": 409,success:false,"message":"Invalid OTP"})
      }
      await userSchema.findByIdAndUpdate(findUser._id,{ email, otp,isEmailVerify:true },{new:false})
      res.status(200).json({"statusCode": 200,success:true, message: "Account Created successfully"});
  } catch (error) {
      res.status(500).json({ error: error.message, message: "Something went wrong...",success:false });
  }
});

router.post('/login', async (req, res) => {
  try {

    const min = 100000;
    const max = 999999;
    const generatedOTP = Math.floor(Math.random() * (max - min + 1)) + min;

    const { email, password } = req.body;
    // Find the user by email
    const findUser = await userSchema.findOne({ email });

    if (!findUser || !findUser?.isEmailVerify) {
      return res.status(200).json({"statusCode": 401,success:false, message: "User does not exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, findUser.password);

    if (!isPasswordValid) {
      return res.status(200).json({"statusCode": 401,success:false, message: "Invalid password" });
    }
      await userSchema.findByIdAndUpdate(findUser._id, {otp:generatedOTP}, { new: true });
    
      sendOtpMail(email,generatedOTP)


    res.status(200).json({"statusCode": 200,success:true, message: "Account Login.... " });

  } catch (error) {
    res.status(500).json({ error: error.message,success:false, message: "Something went wrong..." });
  }
});

router.post('/verify_otp', async (req, res) => {
    try {
        const { otp, email } = req.body;

        const findUser = await userSchema.findOne({ email, otp });

        if (!findUser) {
            return  res.status(200).json({ "statusCode": 401,"message":"Invalid OTP .",success:false})
        }
        const token = jwt.sign(
            { id: findUser._id, email: findUser.email },
            process.env.SECRET_KEY, // Use your secret key
            { expiresIn: '365d' } // Expires in 365 days (1 year)
        );

       return res.status(200).json({ "statusCode": 200, message: "Successfully Login",
         success:true,
         token,name:findUser.fullName||"",email: findUser.email});
    } catch (error) {
        return res.status(500).json({ error: error.message, message: "Something went wrong...",success:false });
    }
});


router.post('/verify_email', async (req, res) => {
    try {
        const {email } = req.body;

        const min = 100000;
        const max = 999999;
        const generatedOTP = Math.floor(Math.random() * (max - min + 1)) + min;

        const findUser = await userSchema.findOne({ email });
        await userSchema.findByIdAndUpdate(findUser._id, {otp:generatedOTP}, { new: true });

        if (!findUser) {
            return res.status(200).json({"statusCode": 401, message: "Invalid OTP or email" });
        }
        sendOtpMail(email,generatedOTP)
        res.status(200).json({ "statusCode": 200,message: "Successfully Confirm",success:true});
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Something went wrong...",success:false });
    }
});

router.post('/verify_email_otp', async (req, res) => {
    try {
        const { otp, email } = req.body;

        const findUser = await userSchema.findOne({ email, otp });

        if (!findUser) {
            return res.status(200).json({"statusCode": 401, message: "Invalid OTP or email.",success:false });
        }

        const token = jwt.sign(
            { id: findUser._id, email: findUser.email },
            process.env.SECRET_KEY, // Use your secret key
            { expiresIn: '365d' } // Expires in 365 days (1 year)
        );

        res.status(200).json({ "statusCode": 200,message: "OTP Confirm", token,email:findUser.email||"",success:true});

    } catch (error) {
        res.status(500).json({ error: error.message, message: "Something went wrong...",success:false });
    }
});

router.post('/create_verify_email_password', async (req, res) => {
    try {
        const findUser = await userSchema.findOne({ email: req.body.email });
        const emailExists = findUser; 
        if (emailExists) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10); 
            await userSchema.findByIdAndUpdate(findUser._id, {password:hashedPassword}, { new: true });
            res.status(200).json({data:req.body.email,message:"Successfully saved"})
        }else{
            res.status(200).json({"statusCode": 400,message:"Bad request"})
        }

    } catch (error) {
        res.status(500).json({ error: error.message, message: "Something went wrong..." });
    }
});

// Get All Admin Users with Search and Pagination
router.get('/all',adminAccountMiddleware, async (req, res) => {
    try {
        const { name, page = 1, limit = 10 } = req.query;

        let query = {};
      
        if (name) {
            const regexPattern = new RegExp(name, 'i'); 
            query.$or = [
                { name: { $regex: regexPattern } },
                { email: { $regex: regexPattern } }
            ];
        }
      
        const adminObj = await adminAccountSchema.findById(req.accountId);

      const normalizeDate = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
      };

      const currentDate = normalizeDate(new Date());
      const primumEndDate = normalizeDate(new Date(adminObj?.primumEndDate));
       if (adminObj?.premiumUserStatus === "Requested To Premium User"&&adminObj?.role!=="admin") {
        return res
          .status(202)
          .json({ message: "Premium request has been accepted for processing" });
      } 
     else if (adminObj?.premiumUserStatus !== "Accepted To Premium User"&&adminObj?.role!=="admin") {
        return res
          .status(403)
          .json({ message: "Forbidden: Insufficient role not a Primum User" });
      } else if (currentDate > primumEndDate &&adminObj?.role!=="admin") {
        return res
        .status(403)
        .json({ message: "Forbidden: Insufficient role Primum Expired" });
      }


        const totalDocuments = await userSchema.countDocuments(query);
        const users = await userSchema.find(query)
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .exec();



        res.status(200).json({
            data: users,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalDocuments / limit),
            totalDocuments,
            message: "Successfully fetched"
        });
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Something went wrong..." });
    }
});
    

router.patch('/update/:id',adminAccountMiddleware,adminAccountRoleCheckMiddleware(process.env.ADMIN_KEY), async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (req.body?.password) {
            updateData.password = await bcrypt.hash(req.body.password, 10);
        }
        const response = await userSchema.findByIdAndUpdate(req.params.id, updateData, { new: true });
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});


router.delete('/delete/:id',adminAccountMiddleware,adminAccountRoleCheckMiddleware(process.env.ADMIN_KEY), async (req, res) => {
    try {
        const response = await userSchema.findByIdAndDelete(req.params.id);
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

router.get('/get-profile',clientAccountMiddleware, async (req, res) => {
    try {
      const clientinfo  =await userSchema.findById(req.accountId).select('fullName email');
      res.status(200).json({data:clientinfo,"statusCode": 200,success:true })
    } catch (error) {
      res.status(500).json({ error: error.message, message: "Something went wrong...",success:false });
    }
});


module.exports = router;


