
const loginForm = document.querySelector('.login-form-js');
const nameInput = document.querySelector('.inputName-js');
const passwordInput = document.querySelector('.inputPassword-js');
const submitBtn = document.querySelector('.submit-btn-js');
const formTitle = document.querySelector('.form-title-js');
const toggleLink = document.querySelector('.toggle-link-js');
const toggleText = document.querySelector('.toggle-text-js');
const alertBox = document.querySelector('.alert');
const loginMessage = document.querySelector('.loginMessage');
const resetBtn = document.querySelector('.clickHere-js');


let isSignUpMode = false;


function showNotification(message) {
  loginMessage.textContent = message;
  loginMessage.style.maxHeight = '60px';
  loginMessage.style.padding = '15px';
  loginMessage.style.opacity = '1';

  setTimeout(() => {
    loginMessage.style.maxHeight = '0';
    loginMessage.style.padding = '0';
    loginMessage.style.opacity = '0';
  }, 4000);
}


toggleLink.addEventListener('click', () => {
  isSignUpMode = !isSignUpMode; 
  
  if (isSignUpMode) {
    formTitle.textContent = 'Create Account';
    submitBtn.textContent = 'Sign Up';
    toggleText.textContent = 'Already have an account?';
    toggleLink.textContent = 'Log In';
    nameInput.value = '';
    passwordInput.value = '';
  } else {
    formTitle.textContent = 'Login';
    submitBtn.textContent = 'Log In';
    toggleText.textContent = "Don't have an account?";
    toggleLink.textContent = 'Sign Up';
  }
  alertBox.textContent = ''; 
});


loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = nameInput.value.trim();
  const password = passwordInput.value.trim();

  const storedUser = JSON.parse(localStorage.getItem('username'));
  const storedPass = JSON.parse(localStorage.getItem('password'));

  if (isSignUpMode) {

    localStorage.setItem('username', JSON.stringify(username));
    localStorage.setItem('password', JSON.stringify(password));
    
    showNotification('Account Created Successfully!');
    
    
    toggleLink.click(); 
    nameInput.value = '';
    passwordInput.value = '';

  } else {
    
    if (username === storedUser && password === storedPass) {
      showNotification('Login Successful!...');
      setTimeout(() => {
        window.location.href = './home.html';
      }, 1500);
    } else {
      alertBox.textContent = 'Invalid credentials. try again or Sign Up.';
    }
  }
});


resetBtn.addEventListener('click', () => {
  localStorage.removeItem('username');
  localStorage.removeItem('password');
  showNotification('create a new account.');
  
  
  if (!isSignUpMode) toggleLink.click();
});