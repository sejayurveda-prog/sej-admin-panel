(function () {
  "use strict";

  if (window.ADMIN_AUTH && ADMIN_AUTH.protectPage) {
    ADMIN_AUTH.protectPage();
  }

  const tbody = document.getElementById("consultationsBody");
  let ALL_DATA = [];

  /* -----------------------------
     FETCH FROM GOOGLE SHEET
  ----------------------------- */
  async function loadConsultations() {
    try {
      const res = await apiGet("/admin/consultations/recent");

      console.log("SHEET DATA 👉", res);

      if (!res || !Array.isArray(res.data)) {
        throw new Error("Invalid sheet response");
      }

      ALL_DATA = res.data;
      render(ALL_DATA);
    } catch (err) {
      console.error(err);
      empty("Unable to load consultations");
    }
  }

  /* -----------------------------
     RENDER TABLE (MATCH SHEET)
  ----------------------------- */
  function render(data) {
    if (!data.length) {
      empty("No consultations found.");
      return;
    }

    tbody.innerHTML = data
      .map(
        (c) => `
        <tr>
          <td>${c.Name || "-"}</td>
          <td>${c.ConsultationType || "-"}</td>
          <td>${formatDate(c.ScheduledDateTime)}</td>
          <td>${c.Status || "-"}</td>
          <td>
            <button class="action-btn" onclick='view(${JSON.stringify(c)})'>
              View
            </button>
          </td>
        </tr>
      `
      )
      .join("");
  }

  /* -----------------------------
     EMPTY STATE
  ----------------------------- */
  function empty(msg) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6">
          <div class="empty">${msg}</div>
        </td>
      </tr>
    `;
  }

  /* -----------------------------
     DATE FORMAT
  ----------------------------- */
  function formatDate(d) {
    if (!d) return "-";
    const dt = new Date(d);
    return isNaN(dt) ? d : dt.toLocaleString("en-IN");
  }

  /* -----------------------------
     VIEW DETAILS (SHEET ROW)
  ----------------------------- */
  window.view = function (data) {
    console.log("CONSULTATION DETAIL 👉", data);

    alert(`
Name: ${data.Name}
Phone: ${data.Phone}
Type: ${data.ConsultationType}
Problem: ${data.Problem}
Amount: ₹${data.Amount}
Payment: ${data.PaymentStatus}
Txn ID: ${data.TransactionId}
Scheduled: ${formatDate(data.ScheduledDateTime)}
Status: ${data.Status}
Created: ${formatDate(data.CreatedAt)}
`);
  };

  loadConsultations();
})();
