const nodemailer = require('nodemailer');
const transporter  = nodemailer.createTransport({
  host: "smtp.googlemail.com",
  port: 465,
  auth: {
    user: "prosperlucky.uk@gmail.com",
    pass: "hqoqbxfkjfxpcqel"
  }
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
     console.error(error)
   }
 }

 module.exports= {sendMail}
  // send mail with defined transport object
