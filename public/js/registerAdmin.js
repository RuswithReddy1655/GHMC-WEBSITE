document.addEventListener("DOMContentLoaded", () => {

let generatedOTP = null;
let otpVerified = false;

const sendBtn = document.getElementById("sendOtpBtn");
const verifyBtn = document.getElementById("verifyOtpBtn");
const otpMsg = document.getElementById("otpMsg");

const mobile = document.getElementById("mobile");
const otp = document.getElementById("otp");

const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const passMsg = document.getElementById("passMsg");

const togglePass = document.getElementById("togglePass");
const toggleConfirm = document.getElementById("toggleConfirm");

const form = document.getElementById("adminForm");


/* =====================
   SEND OTP
===================== */
sendBtn.addEventListener("click", () => {

    if (!/^[6-9]\d{9}$/.test(mobile.value)) {
        alert("Enter valid mobile number");
        return;
    }

    generatedOTP = Math.floor(1000 + Math.random() * 9000);

    alert("Demo OTP: " + generatedOTP); // demo only

    otpMsg.innerText = "OTP Sent ✓";
    otpMsg.style.color = "green";
});


/* =====================
   VERIFY OTP
===================== */
verifyBtn.addEventListener("click", () => {

    if (otp.value == generatedOTP) {
        otpVerified = true;
        otpMsg.innerText = "OTP Verified ✓";
        otpMsg.style.color = "green";
    } else {
        otpVerified = false;
        otpMsg.innerText = "Invalid OTP";
        otpMsg.style.color = "red";
    }
});


/* =====================
   SHOW/HIDE PASSWORD
===================== */
function toggle(input, btn){
    input.type = input.type === "password" ? "text" : "password";
    btn.innerText = input.type === "password" ? "Show" : "Hide";
}

togglePass.onclick = () => toggle(password, togglePass);
toggleConfirm.onclick = () => toggle(confirmPassword, toggleConfirm);


/* =====================
   PASSWORD STRENGTH
===================== */
password.addEventListener("input", () => {

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!regex.test(password.value)) {
        passMsg.innerText = "Weak password";
        passMsg.style.color = "red";
    } else {
        passMsg.innerText = "Strong password ✓";
        passMsg.style.color = "green";
    }
});


/* =====================
   SUBMIT FORM
===================== */
/* =====================
   SUBMIT FORM
===================== */
form.addEventListener("submit", (e) => {

    e.preventDefault();

    if (!otpVerified)
        return alert("Verify OTP first");

    if (password.value !== confirmPassword.value)
        return alert("Passwords do not match");


    /* ======================
       SAVE ADMIN DATA
    ====================== */
    const adminData = {
        empId: document.getElementById("empId").value,
        mobile: mobile.value,
        password: password.value
    };

    localStorage.setItem("adminUser", JSON.stringify(adminData));


    /* ======================
       AUTO LOGIN
    ====================== */
    localStorage.setItem("role", "admin");


    alert("Admin Registration Successful! ✅");


    /* ======================
       OPEN DASHBOARD DIRECTLY
    ====================== */
    window.location.href = "admin-dashboard.html";

});
});
