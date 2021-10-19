const nodemailer = require('nodemailer');
const transporter  = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "f48bb5a51d15c1",
    pass: "fedfa3d32bf2c7"
  }
});
 const sendMail = async(email,url,subject,text,html)=>{
   try {
     
     let info = await transporter.sendMail({
       from: '"Fred Foo 👻" <charleeotaru@gmail.com>', // sender address
       to: email, // list of receivers
      //  subject: "Hello ✔", // Subject line
      subject: subject,
       text: `${text} ${url}`, 
       html: `<h1> ${html} </h1> <a href="${url}">${url}</a>`
     });
    
     console.log("Message sent: %s", info);
     return info;
   } catch (error) {
     console.error(error)
   }
 }

 module.exports= {sendMail}
  // send mail with defined transport object
