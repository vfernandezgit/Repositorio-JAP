document.addEventListener("DOMContentLoaded", function (e) {
    const registerForm = document.getElementById("registerForm");

    registerForm.onsubmit = function (e) {
        e.preventDefault();
        let userEmail = document.getElementById('email').value;
        localStorage.setItem('email', userEmail);
        window.location.href = "index.html";
    };
});

function create_account() {

    var name = document.getElementById("name").value;
    var last_name = document.getElementById("last_name").value;
    var age = document.getElementById("age").value;
    var phone = document.getElementById("phone_number").value;
    var email = document.getElementById("email").value;

    if (name == "" || last_name == "" || age == "" || phone == "" || email == "") {
        var message = "Ingrese sus datos para continuar.";
        $('#alertModal').find('.modal-body p').text(message);
        $('#alertModal').modal('show');
    }
    else {

        localStorage.setItem("name", (name));
        localStorage.setItem("last_name", (last_name));
        localStorage.setItem("age", (age));
        localStorage.setItem("phone", (phone));
        localStorage.setItem("email", (email));
    }
}