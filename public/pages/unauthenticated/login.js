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
            location.href = "/about";
        } else if (response.status === 400) {
            toastr.error("Incorrect credentials");
        } else if (response.status === 500) {
            toastr.error("Internal Server Error, please try again");
        }
    })
}