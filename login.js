console.log('login functionality come in')

document.getElementById('login-btn').addEventListener("click", function() {

   const inputName = document.getElementById("input-name");
   const contactName = inputName.value;
   console.log(contactName)

  
   const inputPassword = document.getElementById("input-password");
   const pinNumber = inputPassword.value;
   console.log(pinNumber)

   
   if(contactName == "admin" && pinNumber == "admin123"){

   alert("login Success");


   window.location.assign("/home.html")
   }
  
   else{
    alert("login Failed");
    return;
   }
   
  

})