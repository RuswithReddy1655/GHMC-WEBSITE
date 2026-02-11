document.addEventListener("DOMContentLoaded", load);

async function load(){

  const res = await fetch("/api/complaints");
  const data = await res.json();

  const container = document.getElementById("complaints");
  container.innerHTML = "";

  data.forEach(c => {

    container.innerHTML += `
      <div class="card">

        <h3>ID: ${c.complaintId}</h3>
        <p><b>Address:</b> ${c.address}</p>
        <p><b>Status:</b> ${c.status}</p>

        <h4>Before</h4>
        ${
          c.beforeImage
          ? `<img src="/uploads/${c.beforeImage}" class="img">`
          : "No image"
        }

        <h4>After</h4>
        ${
          c.afterImage
          ? `<img src="/uploads/${c.afterImage}" class="img">`
          : "Not uploaded"
        }

      </div>
    `;
  });
}
