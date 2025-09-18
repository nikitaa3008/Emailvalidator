console.log("Script loaded");

const submitBtn = document.getElementById("submitBtn");
const resultCont = document.getElementById("resultCont");

submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const email = document.getElementById("username").value.trim();

  if (!email) {
    resultCont.innerHTML = `<div style="color:red;">⚠️ Please enter an email address</div>`;
    return;
  }

  resultCont.innerHTML = `<img width="123" src="img/loading.svg" alt="Loading...">`;

  try {
    const url = `/api/validate?email=${encodeURIComponent(email)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`API Error: ${res.status}`);

    const apiResult = await res.json();

    let str = "";
    for (let field of Object.keys(apiResult)) {
      if (apiResult[field] !== "" && apiResult[field] !== " ") {
        str += `<div><strong>${field}</strong>: ${apiResult[field]}</div>`;
      }
    }

    resultCont.innerHTML = str || `<div>No details found.</div>`;
  } catch (err) {
    console.error("Error fetching email data:", err);
    resultCont.innerHTML = `<div style="color:red;">❌ Failed to validate email. Please try again later.</div>`;
  }
});






