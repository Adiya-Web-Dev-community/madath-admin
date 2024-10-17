const adminSchema = require('../../model/admin/adminAccount')
const router = require('express').Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // assuming you want to use JWT for authentication
const sendOtpMail = require('../../function/sendOtpMail');
const mailAlert = require('../../function/mailAlert')
const { adminAccountMiddleware,adminAccountRoleCheckMiddleware, HandleCheckIsSuperAdmin } = require('../../middleware/auth');
require('dotenv').config()

router.post('/create',adminAccountMiddleware,adminAccountRoleCheckMiddleware(process.env.ADMIN_KEY),async (req,res)=>{
try{
    const findUser = await adminSchema.findOne({ email: req.body.email });
    const emailExists = !findUser; 
    if (emailExists) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10); 
        const tempDoc = new  adminSchema({...req.body,password:hashedPassword})
        const saveDoc = await tempDoc.save()
        res.status(200).json({data:saveDoc,message:"Successfully saved"})
    }else{
        res.status(409).json({message:"Usre All Ready exist"})
    }
}catch(error){
res.status(500).json({error:error,message:error.message})
}
})


router.post('/login', async (req, res) => {
  try {

    const min = 100000;
    const max = 999999;
    const generatedOTP = Math.floor(Math.random() * (max - min + 1)) + min;

    const { email, password } = req.body;
    // Find the user by email
    const findUser = await adminSchema.findOne({ email });

    if (!findUser) {
      return res.status(401).json({ message: "User does not exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, findUser.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
      await adminSchema.findByIdAndUpdate(findUser._id, {otp:generatedOTP,otpCreatedAt:new Date()}, { new: true });
    
      sendOtpMail(email,generatedOTP)


    res.status(200).json({ message: "Login successful" });

  } catch (error) {
    res.status(500).json({ error: error.message, message: "Something went wrong..." });
  }
});

router.post('/verify_otp', async (req, res) => {
    try {
        const { otp, email } = req.body;

        // Find user by email and OTP
        const findUser = await adminSchema.findOne({ email, otp });
        if (!findUser) {
            return res.status(401).json({ message: "Invalid OTP or email." });
        }
        const otpExpiryTime = 2 * 60 * 1000; // 10 minutes
        const currentTime = Date.now();

        if (currentTime - new Date(findUser.otpCreatedAt).getTime() > otpExpiryTime) {
            return res.status(401).json({ message: "OTP has expired." });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: findUser._id, email: findUser.email, role: findUser.role },
            process.env.SECRET_KEY, // Use your secret key
            { expiresIn: '365d' } // Expires in 365 days (1 year)
        );

        // Respond with success and token
        res.status(200).json({
            status:200,
            message: "OTP verified successfully",
            token,
            name: findUser.name || "",
            email: findUser.email || "",
            id: findUser._id
        });

    } catch (error) {
        res.status(500).json({ error: error.message, message: "Something went wrong..." });
    }
});

router.post('/resend_Otp/:email', async (req, res) => {
    try {
        const findUser = await adminSchema.findOne({ email:req.params.email});
        if (!findUser) {
            return res.status(401).json({ message: "Bad Request" });
        }
        const min = 100000;
        const max = 999999;
        const generatedOTP = Math.floor(Math.random() * (max - min + 1)) + min;

        await adminSchema.findByIdAndUpdate(findUser._id, {otp:generatedOTP,otpCreatedAt:new Date()}, { new: true });
        sendOtpMail(req.params.email,generatedOTP)

       res.status(200).json({status:200, message: "Otp Resend Successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Something went wrong..." });
    }
})

router.post('/verify_email', async (req, res) => {
    try {
        const {email } = req.body;

        const min = 100000;
        const max = 999999;
        const generatedOTP = Math.floor(Math.random() * (max - min + 1)) + min;

        const findUser = await adminSchema.findOne({ email });
        await adminSchema.findByIdAndUpdate(findUser._id, {otp:generatedOTP}, { new: true });

        if (!findUser) {
            return res.status(401).json({ message: "Invalid OTP or email." });
        }
        sendOtpMail(email,generatedOTP)
        res.status(200).json({ message: "Successfully Confirm"});
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Something went wrong..." });
    }
});

router.post('/verify_email_otp', async (req, res) => {
    try {
        const { otp, email } = req.body;

        const findUser = await adminSchema.findOne({ email, otp });

        if (!findUser) {
            return res.status(401).json({ message: "Invalid OTP or email." });
        }

        const token = jwt.sign(
            { id: findUser._id, email: findUser.email },
            process.env.SECRET_KEY, // Use your secret key
            { expiresIn: '365d' } // Expires in 365 days (1 year)
        );

        res.status(200).json({ message: "Successfully saved", token,email:findUser.email||""});

    } catch (error) {
        res.status(500).json({ error: error.message, message: "Something went wrong..." });
    }
});

router.post('/create_verify_email_password', async (req, res) => {
    try {
        const findUser = await adminSchema.findOne({ email: req.body.email });
        const emailExists = findUser; 
        if (emailExists) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10); 
            await adminSchema.findByIdAndUpdate(findUser._id, {password:hashedPassword}, { new: true });
            res.status(200).json({data:req.body.email,message:"Successfully saved"})
        }else{
            res.status(400).json({message:"Bad request"})
        }

    } catch (error) {
        res.status(500).json({ error: error.message, message: "Something went wrong..." });
    }
});

// Get All Admin Users with Search and Pagination
router.get('/all',adminAccountMiddleware,adminAccountRoleCheckMiddleware(process.env.ADMIN_KEY), async (req, res) => {
    try {
        const { name, page = 1, limit = 10,rightsVal="admin" } = req.query;

        let query = {
            role:rightsVal
        };
      
        if (name) {
            const regexPattern = new RegExp(name, 'i'); // Create case-insensitive regex pattern
            query.$or = [
                { name: { $regex: regexPattern } },
                { email: { $regex: regexPattern } }
            ];
        }

        // Calculate the total number of documents for pagination
        const totalDocuments = await adminSchema.countDocuments(query);

        // Find users with pagination and search query
        const users = await adminSchema.find(query)
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
    
router.get('/admin/:id',adminAccountMiddleware, async (req, res) => {
    try {
        const adminData = await adminSchema.findById(req.params.id);
        res.status(200).json({data: adminData,message: "Successfully fetched"});
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Something went wrong..." });
    }
});  

router.patch('/update/:id',adminAccountMiddleware, async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (req.body?.password) {
            updateData.password = await bcrypt.hash(req.body.password, 10);
        }
        const response = await adminSchema.findByIdAndUpdate(req.params.id, updateData, { new: true });
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

router.delete('/delete/:id',adminAccountMiddleware,adminAccountRoleCheckMiddleware(process.env.ADMIN_KEY), async (req, res) => {
    try {
         const response = await adminSchema.findByIdAndDelete(req.params.id);
         return res.status(200).json(response)
    } catch (err) {
         return res.status(500).json({ error: err })
    }
})

router.post('/Login_Role_Check',HandleCheckIsSuperAdmin);

router.post('/check_user_activity',adminAccountMiddleware, async (req, res) => {
    try {

  
      const { email,userId } = req.body;
      // Find the user by email
      const findUser = await adminSchema.findById(userId);

      if (!findUser) {
        mailAlert(email)
        return res.status(401).json({ message: "Invalid OTP or email." });
    }
  
      const token = jwt.sign(
        { id: findUser._id, email: findUser.email,role:findUser.role},
         process.env.SECRET_KEY, // Use your secret key
        { expiresIn: '365d' } // Expires in 365 days (1 year)
    );

    res.status(200).json({ message: "Successfully saved", token,name:findUser.name||"",email:findUser.email||""});
  
    } catch (error) {
      res.status(500).json({ error: error.message, message: "Something went wrong..." });
    }
});

router.patch('/upload-banner',adminAccountMiddleware,async (req, res)=>{
    try {
        const adminObj = await adminSchema.findById(req.accountId);

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
          } 
          else if (currentDate > primumEndDate&&adminObj?.role!=="admin") {
            return res
            .status(403)
            .json({ message: "Forbidden: Insufficient role Primum Expired" });
          }

        const updateData = { ...req.body };
        const response = await adminSchema.findByIdAndUpdate(req.accountId, updateData, { new: true });
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
})

router.get('/get-banner',adminAccountMiddleware,async (req, res)=>{
    try {
        const adminObj = await adminSchema.findById(req.accountId);

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
          } else if (currentDate > primumEndDate&&adminObj?.role!=="admin") {
            return res
            .status(403)
            .json({ message: "Forbidden: Insufficient role Primum Expired" });
          }

        return res.status(200).json(adminObj?.bannerImage);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
})

router.patch('/updateBanner/:status',adminAccountMiddleware, async (req, res) => {
    const { status } = req.params; // Get the new status from the request body
    try {
      if (!['enabled', 'disable'].includes(status)) {
        return res.status(400).json({ message: "Invalid status value. Use 'enabled' or 'disable'." });
      }
        const updatedAdmin = await adminSchema.findByIdAndUpdate(
        req.accountId,
        { 'bannerImage.status': status }, // Update the banner status
        { new: true } // Return the updated document
      );
      if (!updatedAdmin) {
        return res.status(404).json({ message: "Admin not found." });
      }
      res.status(200).json({ message: "Banner status updated successfully.", admin: updatedAdmin.bannerImage });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while updating the banner status." });
    }
});

router.delete('/deletebanner',adminAccountMiddleware, async (req, res) => {  
    try {
        await adminSchema.findByIdAndUpdate(req.accountId,
        { 'bannerImage.imageUrl': "" }, // Update the banner status
        { new: true } // Return the updated document
      );
      res.status(200).json({ message: "Banner Deleted successfully.", admin: {} });
    } catch (error) {
      res.status(500).json({error, message: "An error occurred while Deleted the banner status." });
    }
});

router.post('/request-to-primiumUser',adminAccountMiddleware,async (req,res)=>{
    try {
      await adminSchema.findByIdAndUpdate(req.accountId,{premiumUserStatus:'Requested To Premium User'},{new:true});
      res.status(200).json({ message: "Requested  successfully."});
    } catch (error) {
      res.status(500).json({ message: "An error occurred while updating the banner status." });
    }   
})

router.post('/register-to-primiumUser/:id',adminAccountMiddleware,async (req,res)=>{
    try {

    const response =  await adminSchema.findByIdAndUpdate(req.params.id,{
        premiumUserStatus:'Accepted To Premium User',
        primumStartDate: new Date(req.body.primumStartDate),
        primumEndDate: new Date(req.body.primumEndDate),
    },{new:true});

      res.status(200).json({ message: "User Register successfully",data:{
        primumStartDate: response.primumStartDate,
        primumEndDate:response.primumEndDate,
        premiumUserStatus:'Accepted To Premium User',
    }});
    } catch (error) {
      res.status(500).json({ message: "An error occurred while updating the banner status." });
    }   
})

module.exports = router;


