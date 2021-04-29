module.exports = {
    middleware:  (req,res,next)=>{
        res.json({
            status: 1,
            data: "Global Middleware"
        })
        next()
    }
}