const nodemailer = require('nodemailer')
const Hospital = require('../modals/hospital')
const crypto = require('crypto')
const bcrypt = require('bcryptjs')
exports.sendEmail = async(req,res) => {
    const {from,subject,text} = req.body
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL, // generated ethereal user
          pass: process.env.EMAIL_PASSWORD, // generated ethereal password
        },
      });
      const mailData = {
        from: from,  // sender address
          to: 'kabirsngh0022@gmail.com',   // list of receivers
          subject: subject,
          text: "Hello from NitiMed (GOI)",
          html: `<b>From: ${from}</b><br/><p>${text}</p>`,
    };
    transporter.sendMail(mailData, function (err, info) {
        if(err)
          return res.status(400).json({error: err})
        else
          return res.json({email: "EMAIL SENT"})
     });
}
exports.sendOtp = async(req,res) => {
  const hospital = await Hospital.findOne({email:req.body.email})
  if(hospital){
    crypto.randomBytes(10, (err, buf) => {
      if (err) return res.json({success:false,message: 'Try Again later.'});
      var resetPasswordToken = buf.toString('hex')
      var resetPasswordExpires = Date.now() + 3600000
      Hospital.findByIdAndUpdate(hospital.id,{resetPasswordToken,resetPasswordExpires},{new: true}).then((hosp) => {
        if(hosp){
          let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
              user: process.env.EMAIL, // generated ethereal user
              pass: process.env.EMAIL_PASSWORD, // generated ethereal password
            },
          });
          let message = 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'https://' + req.headers.host + '/reset/' + resetPasswordToken +'/'+hosp.id + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
          const mailData = {
              from: "nititele@gmail.com",  // sender address
              to: req.body.email,   // list of receivers
              subject: "Password Reset",
              text: "email",
              html: `<b>From: nititele@gmail.com</b><br/><p>${message}</p>`,
        };
        transporter.sendMail(mailData, function (err, info) {
            if(err)
              return res.status(400).json({success: false,message: err})
            else
              return res.json({success: true,message: 'Check your email Id for password reset'})
         });
        }else{
          return res.json({success:false,message: 'Try Again later.'});
        }
      })
    });
  }else{
    return res.status(400).json({
      success: false,
      message: 'No user exists with this email.'
    })
  }
}
exports.verifyOtp = async(req,res) => {
  const {token,id,password} = req.body;
  const hospital = await Hospital.findOne({_id:id,token,resetPasswordExpires : {$gt : Date.now()}})
  if(hospital && hospital.resetPasswordToken=== token){
    var newpassword  = bcrypt.hashSync(password,process.env.SECRET_PASS)
    Hospital.findByIdAndUpdate(hospital.id,{password : newpassword,resetPasswordToken:'',resetPasswordExpires:''}).then((data)=>{
      if(data){
        return res.json({
          success: true,
          message: 'Password updated'
        })
      }else{
        return res.json({
          success: false,
          message: 'Either the link has expired or you are not authorised for this action'
        })
      }
    })
  }else{
    return res.json({
      success: false,
      message: 'Either the link has expired or you are not authorised for this action'
    })
  }
}