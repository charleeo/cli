const emailVerificationObject={
    subject:"Verify Your Account",
    text:'Hello! Welcome to mobile wallet. Please copy the link below to verify your account',
    html:"Hello! Welcome to mobile wallet. Please click on the link below to verify your account"
  }
  
  const forgotPasswordObjects={
    subject:"Reset Password Link",
    text:'Hello! You or someone has requested to reset your password on D-Save Mobile Wallet Account, If your did\'nt initiate this action please ignore this message and quickly login to your account to change your password else Please copy the link below to verify your account',
    html:"Hello! You or someone has requested to reset your password on D-Save Mobile Wallet Account, If your did\'nt initiate this action please ignore this message and quickly login to your account to change your password else Please click on the link below to verify your account"
  }
  
  module.exports = {emailVerificationObject, forgotPasswordObjects}