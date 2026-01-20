/* =====================================================
   SEJ ADMIN – ORDERS PAGE LOGIC (FINAL – SHEET MATCHED)
===================================================== */

(function () {
  "use strict";

  // 🔐 Protect page
  if (window.ADMIN_AUTH && typeof ADMIN_AUTH.protectPage === "function") {
    ADMIN_AUTH.protectPage();
  }

  const tbody = document.getElementById("ordersBody");
  const filters = document.querySelectorAll(".filters select, .filters input");

  let ALL_ORDERS = [];

  /* -----------------------------------
     FETCH ORDERS
     GET /api/admin/orders/recent
  ----------------------------------- */
  async function loadOrders() {
    try {
      const res = await apiGet("/admin/orders/recent");

      if (!res || res.success !== true) {
        throw new Error("Orders API failed");
      }

      // ✅ VERY IMPORTANT (Sheet based)
      ALL_ORDERS = res.data || res.orders || [];
      render(ALL_ORDERS);

    } catch (err) {
      console.error("Orders error:", err);
      empty("No orders found.");
    }
  }

  /* -----------------------------------
     RENDER TABLE (EXACT SHEET KEYS)
  ----------------------------------- */
  function render(data) {
    if (!data.length) return empty("No orders found.");

    tbody.innerHTML = data.map(o => `
      <tr>
        <td>${o.OrderID || "-"}</td>
        <td>${o.Name || "-"}</td>
        <td>${o.Phone || "-"}</td>
        <td>${o.KitName || "-"}</td>
        <td>₹${o.TotalAmount || 0}</td>
        <td>${statusBadge(o.PaymentStatus)}</td>
        <td>
          <button class="action-btn" onclick="view('${o.OrderID}')">
            View
          </button>
        </td>
      </tr>
    `).join("");
  }

  /* -----------------------------------
     EMPTY STATE
  ----------------------------------- */
  function empty(msg) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7">
          <div class="empty">${msg}</div>
        </td>
      </tr>`;
  }

  /* -----------------------------------
     STATUS BADGE
  ----------------------------------- */
  function statusBadge(s = "") {
    const v = (s || "").toLowerCase();
    let cls = "pending";

    if (v === "paid") cls = "approved";
    else if (v === "failed") cls = "rejected";

    return `<span class="badge ${cls}">${s || "pending"}</span>`;
  }

  /* -----------------------------------
     FILTERS (Sheet based)
  ----------------------------------- */
  function applyFilters() {
    let data = [...ALL_ORDERS];
    const [statusSel, kitSel, dateInp] = filters;

    if (statusSel.value) {
      data = data.filter(
        x =>
          (x.PaymentStatus || "").toLowerCase() ===
          statusSel.value.toLowerCase()
      );
    }

    if (kitSel.value) {
      data = data.filter(
        x =>
          (x.KitName || "").toLowerCase() ===
          kitSel.value.toLowerCase()
      );
    }

    if (dateInp.value) {
      const d = new Date(dateInp.value).toLocaleDateString("en-IN");
      data = data.filter(
        x =>
          x.CreatedAt &&
          new Date(x.CreatedAt).toLocaleDateString("en-IN") === d
      );
    }

    render(data);
  }

  filters.forEach(f => f.addEventListener("change", applyFilters));

  /* -----------------------------------
     ACTION
  ----------------------------------- */
  window.view = function (id) {
    alert("View Order: " + id);
  };

  /* -----------------------------------
     INIT
  ----------------------------------- */
  loadOrders();

})();
