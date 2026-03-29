const button = document.querySelector('.signin-js');
const name_ = document.querySelector('.inputName-js');
const password_ = document.querySelector('.inputPassword-js');
const alertContainer = document.querySelector('.alert');
const clearLocal = document.querySelector('.clickHere-js');
const loginMessage = document.querySelector('.loginMessage');


 function clearAlert(){
    setTimeout(()=>{
      alertContainer.innerHTML = '';
    },8000);
  } 


button.addEventListener('click',(e)=>{
  e.preventDefault();

  const username = name_.value;
  const password = password_.value;

  if(username ==='' && password === ''){
    alertContainer.innerHTML='enter username and password';
    clearAlert();
    return;
  }

  if(username ===''){
    alertContainer.innerHTML = 'enter username';
    clearAlert();
    return;
  }

  if( password === ''){
    alertContainer.innerHTML = 'enter password  ';
    clearAlert();
    return; 
  }
  
  let accuratepassword = JSON.parse(localStorage.getItem('password')) || null;
  let accurateEmail = JSON.parse(localStorage.getItem('username')) || null;

    if(accuratepassword===null || accurateEmail === null){
      accuratepassword=password;
      accurateEmail=username;
       window.location.replace('./home.html');
    };

    if(accuratepassword!==password || accurateEmail!==username){
      alertContainer.innerHTML = 'incorrect password or email';
      clearAlert();
      return;
    }else{
       window.location.replace('./home.html');
    }


   localStorage.setItem('password',JSON.stringify(accuratepassword));
   localStorage.setItem('username',JSON.stringify(accurateEmail));

});

clearLocal.addEventListener('click',()=>{
    localStorage.removeItem('password');
    localStorage.removeItem('username');

    topMessage();

    name_.value='';
    password_.value=''
    
   })


   function topMessage(){
    loginMessage.style.maxHeight='37px';
    loginMessage.style.padding='7px';
    loginMessage.style.opacity='1';

    setTimeout(()=>{
      loginMessage.style.maxHeight='0';
      loginMessage.style.padding='0';
      loginMessage.style.opacity='0';
    },4500)

   }