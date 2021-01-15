const jwt  = require('jsonwebtoken');
module.exports = (req,res,next)=>{
    console.log("req",req);
    // console.log("req",req.body);
    // for test api
    console.log(req.headers);
    // for index
    console.log("check auth ");
    // console.log(req.body.headers.authorization);
    console.log(req.headers.authorization);
    console.log("check auth 2.0");
    try{
        // const decoded = jwt.verify(req.body.token,process.env.JWT_KEY);
        // console.log("decoded",decoded);
        const decoded = jwt.verify(req.headers.authorization,process.env.JWT_KEY);
        req.userData = decoded;
        console.log("try block");
    }
    catch(error){
        console.log("catch of auth");
        // console.log(error);
        return res.status(401).json({message:'Auth Failed'});
    }
    next();
}