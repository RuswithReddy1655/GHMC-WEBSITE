async function trackComplaint(){

    const id = document.getElementById("cid").value.trim();

    if(!id){
        alert("Please enter Complaint ID");
        return;
    }

    const res = await fetch(`/api/complaints/${id}`);
    const data = await res.json();

    const result = document.getElementById("result");

    if(data.error){
        result.innerHTML = `<p style="color:red;">❌ Complaint not found</p>`;
        return;
    }

    result.innerHTML = `
        <div style="
            margin-top:20px;
            padding:15px;
            border-radius:8px;
            background:#ffffff;
            box-shadow:0 0 10px #ccc;
            text-align:left;
        ">
            <h4>Complaint Details</h4>
            <p><b>ID:</b> ${data._id}</p>
            <p><b>Status:</b> ${data.status}</p>
            <p><b>Area:</b> ${data.area}</p>
            <p><b>Description:</b> ${data.description}</p>
            <p><b>Date:</b> ${new Date(data.createdAt).toLocaleString()}</p>
        </div>
    `;
}
