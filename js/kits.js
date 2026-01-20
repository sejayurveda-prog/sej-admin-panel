/* =========================================================
   SEJ AYURVEDA – ADMIN KITS JS (FINAL – EXACT SHEET MATCH)
========================================================= */

(function () {
  "use strict";

  // 🔐 Protect page (JWT)
  if (window.ADMIN_AUTH && typeof ADMIN_AUTH.protectPage === "function") {
    ADMIN_AUTH.protectPage();
  }

  const tbody = document.getElementById("kitsBody");
  if (!tbody) return;

  /* ======================================================
     LOAD KITS (ADMIN ONLY)
     GET /api/admin/kits
  ====================================================== */
  async function loadKits() {
    try {
     const res = await apiGet("/admin/kits");

// 🔥 HANDLE ALL BACKEND FORMATS
let list = [];

if (Array.isArray(res)) {
  list = res;
} else if (res && res.data) {
  list = res.data;
} else if (res && res.kits) {
  list = res.kits;
}

if (!list.length) {
  tbody.innerHTML = `
    <tr>
      <td colspan="6">
        <div class="empty">No kits found.</div>
      </td>
    </tr>`;
  return;
}

      tbody.innerHTML = list
        .map(
          (k, i) => `
          <tr>
            <td>${k.id || `KIT-${i + 1}`}</td>
            <td>${k.name || "-"}</td>
            <td>${k.slug || "-"}</td>
            <td>₹${k.price || 0}</td>
            <td>${k.status || "-"}</td>
            <td>
              <button
                class="action-btn delete-btn"
                onclick="deleteKit('${k.id}')">
                Delete
              </button>
            </td>
          </tr>
        `
        )
        .join("");

    } catch (err) {
      console.error("Kits Error:", err);
      tbody.innerHTML = `
        <tr>
          <td colspan="6">
            <div class="empty">Unable to load kits.</div>
          </td>
        </tr>`;
    }
  }

  /* ======================================================
     DELETE KIT
     DELETE /api/admin/kits/:id
  ====================================================== */
  window.deleteKit = async function (id) {
    if (!confirm("Delete this kit?")) return;

    try {
      const res = await apiDelete(`/admin/kits/${id}`);
      if (res && res.success) {
        loadKits();
      } else {
        alert("Failed to delete kit");
      }
    } catch (err) {
      alert("Failed to delete kit");
    }
  };

  /* ======================================================
     INIT
  ====================================================== */
  loadKits();

})();
