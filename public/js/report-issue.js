/* =====================================
   REPORT ISSUE PAGE SCRIPT
===================================== */

console.log("✅ Report Issue JS Loaded");


/* =====================================
   DOM READY
===================================== */
document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("reportForm");
    const imageInput = document.getElementById("image");
    const preview = document.getElementById("preview");

    if (form) form.addEventListener("submit", handleSubmit);

    if (imageInput) {
        imageInput.addEventListener("change", previewImage);
    }

});


/* =====================================
   HANDLE FORM SUBMIT
===================================== */
function handleSubmit(e) {

    e.preventDefault();

    const department = document.querySelector("[name='type']").value;
    const zone = document.getElementById("zone").value;
    const circle = document.getElementById("circle").value;
    const ward = document.getElementById("ward").value;
    const address = document.getElementById("address").value;

    if (!department || !zone || !circle || !ward || !address) {
        alert("Please fill all fields");
        return;
    }

    const complaint = {
        id: generateID(),
        department,
        zone,
        circle,
        ward,
        address,
        status: "Ongoing",
        date: new Date().toLocaleString()
    };

    let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

    complaints.push(complaint);

    localStorage.setItem("complaints", JSON.stringify(complaints));

    alert("Complaint submitted successfully ✅");

    // ✅ redirect to dashboard
    window.location.href = "citizen-dashboard.html";
}


/* =====================================
   IMAGE PREVIEW
===================================== */
function previewImage(event) {

    const file = event.target.files[0];
    const preview = document.getElementById("preview");

    if (!file || !preview) return;

    const reader = new FileReader();

    reader.onload = () => {
        preview.src = reader.result;
        preview.style.display = "block";
    };

    reader.readAsDataURL(file);
}


/* =====================================
   GENERATE COMPLAINT ID
===================================== */
function generateID() {
    return "CMP" + Math.floor(Math.random() * 1000000);
}
