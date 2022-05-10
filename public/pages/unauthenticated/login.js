document.getElementById("sign-in-button").addEventListener("click", e => {
    e.preventDefault();
    loginUser();
});

function loginUser() {
    fetch("/auth", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            email: document.getElementById("sign-in-email").value,
            password: document.getElementById("sign-in-password").value
        })
    }).then(response => {
        if (response.status === 200) {
            location.href = "/dashboard";
        } else if (response.status === 400) {
            toastr.error("Incorrect credentials");
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