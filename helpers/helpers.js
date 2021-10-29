const nodemailer = require('nodemailer');
const config =        require('../config/config')
const transporter  = nodemailer.createTransport({
  host: config.EMAIL_HOST,
  port: config.EMAIL_PORT,
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASSWORD
  },
  
});

 const sendMail = async(email,url,subject,text,html)=>{
   try {
     
     let info = await transporter.sendMail({
       from: '"Charles " <charleeotaru@gmail.com>', // sender address
       to: email, // list of receivers
      //  subject: "Hello ✔", // Subject line
      subject: subject,
       text: `${text} ${url}`, 
       html: `<h1> ${html} </h1> <a href="${url}">${url}</a>`
     });
    
     console.log("Message sent: %s", JSON.stringify(info));
     return info;
   } catch (error) {
     console.error("there  was err"+error)
   }
 }

 const generateToken=(guid)=>{
   let numberSequence = config.NumberSequence
   if(guid == 0){
    let  newString = numberSequence.substr(0,numberSequence.length-1)
     numberSequence  = newString +1
   }else{
    // let extractedInteger  = guid.replace(/[^1-9]/g,'')
    let range= checkRange(guid)
    let newString = numberSequence.slice(0,( numberSequence.length - range))
    const increasedValue  = parseInt(guid) + 1
     numberSequence  =    newString + increasedValue
   }

   return numberSequence
 }

 const checkRange=(number)=>{
   let numberToInteger = parseInt(number)
   let range = 0;
     
   if(numberToInteger > 0 && numberToInteger < 9){
     range=1//unit
   }
   else if(numberToInteger >= 9 && numberToInteger < 99){
     range=2//tens
   }
   else if(numberToInteger >= 99 && numberToInteger < 999){
     range=3//hundrendth
   }
   else if(numberToInteger >= 999 && numberToInteger < 9999){
     range=4//units of thousand
   }
   else if(numberToInteger >= 9999 && numberToInteger < 99999){
     range=5//tens of thousands
   }
   else if(numberToInteger >= 99999 && numberToInteger < 999999){
     range=6//hundrenth of thounsand
   }
   else if(numberToInteger >= 999999 && numberToInteger < 9999999){
     range=7//unit of  millions
   }
   else if(numberToInteger >= 9999999 && numberToInteger < 99999999){
     range=8//tens of millions
   }
   else if(numberToInteger >= 99999999 && numberToInteger < 999999999){
     range=9//hundrenth of millions
   }
   else if(numberToInteger >= 999999999 &&  numberToInteger < 9999999999){
     range=10//unit of billions
   }
   else if(numberToInteger >= 9999999999 && numberToInteger < 99999999999){
     range=11//tens of billions
   }
   return range
 }

 module.exports= {sendMail, generateToken}
  // send mail with defined transport object
