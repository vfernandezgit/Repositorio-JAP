document.addEventListener("DOMContentLoaded", function(e){
  const loginForm = document.getElementById("loginForm");
  
  loginForm.onsubmit= function (e){
      e.preventDefault();
      let userEmail = document.getElementById('inputEmail').value;
      localStorage.setItem('email', userEmail);
      window.location.href = "index.html";
  };
  });