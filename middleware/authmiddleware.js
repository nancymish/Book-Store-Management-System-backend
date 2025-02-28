const jwt = require("jsonwebtoken");
require("dotenv").config();

const Authentication = (req,res,next) =>{
    const token = req.headers["token"];

    if(!token){
        res.status(401).json({message:"token is not provided"})
        return;
    }
    try {

        jwt.verify(token, process.env.JWT_SECRET_KEY,(err,user)=>{
            if(err){
                res.status(403).json({message:"Token expired, Please Login again.."}, err.message)
                return;
            }
            req.user=user;
            next();
        });
        
    } catch (error) {
        res.status(400).json({message:"invalid token", error:error.message});
    }
}  


const checkAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied: Admins Only" });
  }
  next();
};




module.exports = {Authentication, checkAdmin}