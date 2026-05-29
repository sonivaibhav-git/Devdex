const validateQuery = (schema) =>async(req,res,next)=>{
try{
    req.query = await schema.parseAsync(req.query);
    console.log(req.query)
    next();
}catch(err){

    res.status(400).json({
        message: "validation failed",
        errors: err.errors
    })
}
}
module.exports = {
   validateQuery
};