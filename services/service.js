module.exports = {
    service:  (req,res)=>{
        res.json({
            status: 1,
            data: "Global Service"
        })
    }
}