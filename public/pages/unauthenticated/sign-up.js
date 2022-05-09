document.getElementById("sign-up-confirm").addEventListener("click", validateUser);

function validateUser() {
    const email = document.getElementById("email-address").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("password-confirm").value;
    const firstName = document.getElementById("first-name").value;
    const birthdate = document.getElementById("birthdate").value;
    const gender = document.getElementById("gender").value;
    const sexuality = document.getElementById("sexuality").value;
    const subscribed = document.getElementById("newsletter-confirm").checked;
    const tosAgreement = document.getElementById("tos-confirm").checked;

    const passwordRequirements = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

    if (email === "" || password === "" || firstName === "" || birthdate === "" || gender === "Select Gender" || sexuality === "Select Sexuality") {
        toastr.error("Please check that all inputs are filled out");
    } else if (!password.match(passwordRequirements)) {
        toastr.error("Password must contain between 8-15 characters and the at least the following:</br>• 1 lowercase letter (ex. a)</br>• 1 uppercase letter(ex. A)</br>• 1 digit (ex. 1)</br>• 1 special character (ex. @)");
    } else if (password !== passwordConfirm) {
        toastr.error("Passwords do not match");
    } else if (calculateAge(birthdate) < 18) {
        toastr.error("You have to be over 18");
    } else if (tosAgreement != true) {
        toastr.error("You have to agree to the Terms of Service")
    } else if (password === passwordConfirm && calculateAge(birthdate) >= 18 && tosAgreement === true) {
        createUser();
    } 
}

function calculateAge(birthdate) {
    const convertBirthDate = new Date(birthdate);
    const difference = Date.now() - convertBirthDate.getTime();
    const age = new Date(difference);

    return Math.abs(age.getUTCFullYear() - 1970);
}

function createUser() {
    fetch("/users", {
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify({
            email: document.getElementById("email-address").value,
            password: document.getElementById("password").value,
            firstName: document.getElementById("first-name").value,
            birthdate: new Date(document.getElementById("birthdate").value),
            gender: document.getElementById("gender").value,
            sexuality: document.getElementById("sexuality").value,
            subscribed: document.getElementById("newsletter-confirm").checked,
            tosAgreement: document.getElementById("tos-confirm").checked
        })
    }).then(response => {
        if(response.status === 201) {
            toastr.success("User created - Redirecting to login");
            setTimeout(() => location.href = "/", 2000);
        } else if (response.status === 400) {
            toastr.error("E-mail already registered");
        } else if (response.status === 500) {
            toastr.error("Internal Server Error, please try again");
        }
    })
}

toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-center",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "1000",
    "hideDuration": "1000",
    "timeOut": "4000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}