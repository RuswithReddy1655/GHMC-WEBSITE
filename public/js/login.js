/* =========================
   GLOBAL ROLE
========================= */
let role = "citizen";


/* =========================
   PAGE LOAD DEFAULT
========================= */
document.addEventListener("DOMContentLoaded", () => {

    // default role
    const firstBtn = document.querySelector(".toggle-btn");
    setRole("citizen", firstBtn);

});


/* =========================
   ROLE TOGGLE
========================= */
function setRole(selectedRole, btn) {

    role = selectedRole;

    const buttons = document.querySelectorAll(".toggle-btn");
    const label = document.getElementById("userLabel");
    const input = document.getElementById("userInput");
    const track = document.getElementById("trackLink");

    // remove active
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");


    /* ===== change UI ===== */

    if (role === "citizen") {

        label.textContent = "Mobile Number";

        input.type = "tel";
        input.placeholder = "Enter 10-digit mobile number";
        input.maxLength = 10;

        track.style.display = "block";
    }
    else {

        label.textContent = "Admin ID";

        input.type = "text";
        input.placeholder = "Enter Admin ID";
        input.maxLength = 20;

        track.style.display = "none";
    }

    input.value = "";
}


/* =========================
   LOGIN SUBMIT
========================= */
document.getElementById("loginForm").addEventListener("submit", function (e) {

    e.preventDefault();

    const user = document.getElementById("userInput").value.trim();
    const pass = document.getElementById("password").value.trim();

    if (!user || !pass) {
        alert("Please fill all fields");
        return;
    }


    /* ===== Citizen Login ===== */
    if (role === "citizen") {

        const mobileRegex = /^[0-9]{10}$/;

        if (!mobileRegex.test(user)) {
            alert("Enter valid 10-digit mobile number");
            return;
        }

        alert("Citizen Login Successful");

        // redirect
        window.location.href = "citizen-dashboard.html";
    }


    /* ===== Admin Login ===== */
    else {

        alert("Admin Login Successful");

        // redirect
        window.location.href = "admin-dashboard.html";
    }

});


/* =========================
   REGISTER BUTTON
========================= */
document.getElementById("registerBtn").addEventListener("click", () => {

    if (role === "admin") {
        window.location.href = "register-admin.html";
    }
    else {
        window.location.href = "register-citizen.html";
    }

});
