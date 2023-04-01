const nodemailer = require("nodemailer");
const otpGenerator = require('otp-generator')

const otpvalidator=(usermail)=>{
    const OTP = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false ,lowerCaseAlphabets:false ,digits:true});

const transporter = nodemailer.createTransport({
    service: 'gmail',
  auth: {
    // user: 'forsmmpanel@gmail.com',
    // pass: 'noymjrhbxjwiclin'
    user: "hair05styler@gmail.com",
    pass: "efcjdepnofhkyydp"
  }
});

transporter.sendMail({
    to: usermail,
    from: 'hair05styler@gmail.com',
    subject: "Verify your email",
    text: "also this ?",
    html: `<h1>Your OTP is :- ${OTP}</h1>`
})
.then((info)=>{
    console.log(info.response)
    console.log("mail send")
})
.catch((err)=>{
    console.log(err)
})
return OTP
}


module.exports = otpvalidator