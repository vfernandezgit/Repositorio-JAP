
document.addEventListener("DOMContentLoaded", function (e) {
    display_profile_info();
});

function save_profile_info() {

    var name = document.getElementById("name").value;
    var last_name = document.getElementById("last_name").value;
    var age = document.getElementById("age").value;
    var phone = document.getElementById("phone_number").value;
    var email = document.getElementById("email").value;

    if (name == "" && last_name == "" && age == "" && phone == "" && email == "") {
        var message = "Ingrese sus datos para continuar.";
        $('#alertModal').find('.modal-body p').text(message);
        $('#alertModal').modal('show');

        document.getElementById("name").disabled = false;
        document.getElementById("last_name").disabled = false;
        document.getElementById("age").disabled = false;
        document.getElementById("phone_number").disabled = false;
        document.getElementById("email").disabled = true;

        document.getElementById("modify").style = "display: none;"
        document.getElementById("save").style = "display: block;"
    }
    else {

        localStorage.setItem("name", (name));
        localStorage.setItem("last_name", (last_name));
        localStorage.setItem("age", (age));
        localStorage.setItem("phone", (phone));
        localStorage.setItem("email", (email));

        document.getElementById("name").disabled = true;
        document.getElementById("last_name").disabled = true;
        document.getElementById("age").disabled = true;
        document.getElementById("phone_number").disabled = true;
        document.getElementById("email").disabled = true;

        document.getElementById("modify").style = "display: block;"
        document.getElementById("save").style = "display: none;"
    }
}

function modify_profile_info() {

    document.getElementById("name").disabled = false;
    document.getElementById("last_name").disabled = false;
    document.getElementById("age").disabled = false;
    document.getElementById("phone_number").disabled = false;
    document.getElementById("email").disabled = true;

    var name = document.getElementById("name").value;
    var last_name = document.getElementById("last_name").value;
    var age = document.getElementById("age").value;
    var phone = document.getElementById("phone_number").value;
    var email = document.getElementById("email").value;

    localStorage.setItem("name", (name));
    localStorage.setItem("last_name", (last_name));
    localStorage.setItem("age", (age));
    localStorage.setItem("phone", (phone));
    localStorage.setItem("email", (email));

    document.getElementById("modify").style = "display: none;"
    document.getElementById("save").style = "display: block;"

}

function display_profile_info() {

    var nombre = localStorage.getItem("name");
    document.getElementById("name").value = nombre;

    var apellido = localStorage.getItem("last_name");
    document.getElementById("last_name").value = apellido;

    var edad = localStorage.getItem("age");
    document.getElementById("age").value = edad;

    var telefono = localStorage.getItem("phone");
    document.getElementById("phone_number").value = telefono;

    var correo = localStorage.getItem("email");
    document.getElementById("email").value = correo;

    if (nombre != "" || apellido != "" || edad != "" || telefono != "" || correo != "") {
        document.getElementById("modify").style = "display: block;"
        document.getElementById("save").style = "display: none;"

        document.getElementById("name").disabled = true;
        document.getElementById("last_name").disabled = true;
        document.getElementById("age").disabled = true;
        document.getElementById("phone_number").disabled = true;
        document.getElementById("email").disabled = true;
    }
    else {
        document.getElementById("modify").style = "display: none;"
        document.getElementById("save").style = "display: block;"

        document.getElementById("name").disabled = false;
        document.getElementById("last_name").disabled = false;
        document.getElementById("age").disabled = false;
        document.getElementById("phone_number").disabled = false;
        document.getElementById("email").disabled = true;
    }

}

/*Cargar imagen de usuario*/

document.querySelector("#myFileInput").addEventListener("change", function () {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
        localStorage.setItem("user_uploaded_image", reader.result);
    });
    reader.readAsDataURL(this.files[0]);
});

document.addEventListener("DOMContentLoaded", () => {
    const recentImageDataUrl = localStorage.getItem("user_uploaded_image");

    if (recentImageDataUrl == null) {
        document.getElementById("imgPreview").style = "display: none;"
    }
    else if (recentImageDataUrl != null) {
        document.querySelector("#imgPreview").setAttribute("src", recentImageDataUrl);
    }

});

var loadFile = function (event) {
    var image = document.getElementById('imgPreview');
    image.src = URL.createObjectURL(event.target.files[0]);

    window.location.href = "./my-profile.html";

};

