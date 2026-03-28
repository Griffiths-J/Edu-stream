const button = document.querySelector('.signin-js');
const name_ = document.querySelector('.inputName-js');
const password_ = document.querySelector('.inputPassword-js');
const alertContainer = document.querySelector('.alert');
const clearLocal = document.querySelector('.clickHere-js');

button.addEventListener('click',(e)=>{
  e.preventDefault();

  const username = name_.value;
  const password = password_.value;

  function clearAlert(){
    setTimeout(()=>{
      alertContainer.innerHTML = '';
    },8000);
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
       window.location.replace('./index.html');
    };

    if(accuratepassword!==password || accurateEmail!==username){
      alertContainer.innerHTML = 'incorrect password or email';
      clearAlert();
      return;
    }else{
       window.location.replace('./index.html');
    }


   localStorage.setItem('password',JSON.stringify(accuratepassword));
   localStorage.setItem('username',JSON.stringify(accurateEmail));

});

clearLocal.addEventListener('click',()=>{
    localStorage.removeItem('password');
    localStorage.removeItem('username');

    alertContainer.innerHTML = 'sign up again';
    clearAlert();
   })