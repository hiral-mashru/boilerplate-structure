module.exports = {
 demoModule: (req,res,next)=> {
  console.log("This is middleware demoModule")
  res.send('This is middleware demoModule')
  next();
 }
}