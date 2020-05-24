import React from 'react';
import LocalizedStrings from 'react-native-localization';
const strings = new LocalizedStrings({
  "en":{
    
    login_button_text:"LOGIN",
    email_placeholder:"Email",
    password_placeholder:"Password",
    forgot_passowrd_text:"Forogt Password?",
    dont_have_an_account_text: "Don't have an account? Create now" ,
    skip_n_browse_text: "Skip & Browse",
    sponsored_by_yys_legal_from_office:'SPONSORED BY YYS LEGAL FIRM OFFICE'
  },

"ar":{

  login_button_text:"تسجيل الدخول",
  email_placeholder:"البريد الإلكتروني",
  password_placeholder:"كلمه السر",
  forgot_passowrd_text:"هل نسيت كلمة المرور؟",
  dont_have_an_account_text: "لا تملك حساب؟ انشئ الأن",
  skip_n_browse_text: "تخطي وتصفح",
  sponsored_by_yys_legal_from_office:'برعاية YYS قانوني من المكتب'


  },
});
export default strings;