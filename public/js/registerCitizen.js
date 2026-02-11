document.addEventListener("DOMContentLoaded", () => {

let generatedOTP = null;
let otpVerified = false;

/* ELEMENTS */
const sendBtn = document.getElementById("sendOtpBtn");
const verifyBtn = document.getElementById("verifyOtpBtn");
const otpMsg = document.getElementById("otpMsg");

const name = document.getElementById("name");
const mobile = document.getElementById("mobile");
const otp = document.getElementById("otp");
const address = document.getElementById("address");
const pincode = document.getElementById("pincode");

const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const passMsg = document.getElementById("passMsg");

const togglePass = document.getElementById("togglePass");
const toggleConfirm = document.getElementById("toggleConfirm");

const form = document.getElementById("registerForm");


/* ================= OTP SEND ================= */
sendBtn.onclick = () => {

    if (!/^[6-9]\d{9}$/.test(mobile.value))
        return alert("Enter valid mobile number");

    generatedOTP = Math.floor(1000 + Math.random() * 9000);

    alert("Demo OTP: " + generatedOTP);

    otpMsg.innerText = "OTP Sent ✓";
};


/* ================= OTP VERIFY ================= */
verifyBtn.onclick = () => {

    if (otp.value == generatedOTP) {
        otpVerified = true;
        otpMsg.innerText = "OTP Verified ✓";
        otpMsg.style.color = "green";
    } else {
        otpVerified = false;
        otpMsg.innerText = "Invalid OTP";
        otpMsg.style.color = "red";
    }
};


/* ================= PASSWORD TOGGLE ================= */
function toggle(input, btn){
    input.type = input.type === "password" ? "text" : "password";
    btn.innerText = input.type === "password" ? "Show" : "Hide";
}

togglePass.onclick = () => toggle(password, togglePass);
toggleConfirm.onclick = () => toggle(confirmPassword, toggleConfirm);


/* ================= PASSWORD STRENGTH ================= */
password.oninput = () => {

    const regex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

    passMsg.innerText = regex.test(password.value)
        ? "Strong password ✓"
        : "Weak password";
};


/* ================= SUBMIT ================= */
form.onsubmit = (e) => {

    e.preventDefault();

    if(!otpVerified)
        return alert("Verify OTP first");

    if(password.value !== confirmPassword.value)
        return alert("Passwords do not match");

    const citizen = {
        name: name.value,
        mobile: mobile.value,
        address: address.value,
        pincode: pincode.value,
        password: password.value
    };

    localStorage.setItem("citizenUser", JSON.stringify(citizen));

    alert("Citizen Registered Successfully ✅");

    window.location.href = "login.html";
};

});
