/* =========================================================
   SEJ AYURVEDA – ADMIN DASHBOARD JS (FINAL)
   Uses backend /api/admin/dashboard
========================================================= */

(function () {
  "use strict";

  // 🔐 Protect dashboard (JWT required)
  if (window.ADMIN_AUTH && typeof ADMIN_AUTH.protectPage === "function") {
    ADMIN_AUTH.protectPage();
  }

  /* ======================================================
     LOAD DASHBOARD DATA
  ====================================================== */

  async function loadDashboardStats() {
    try {
      const res = await apiGet("/admin/dashboard");

      if (!res || res.success !== true) {
        throw new Error("Failed to load dashboard data");
      }

      const d = res.data || {};

      // SUMMARY CARDS (BACKEND SUPPORTED ONLY)
      setText("totalOrders", d.totalOrders);
      setText("totalConsultations", d.totalConsultations);
      setText("pendingOrders", d.pendingOrders);
      setText("pendingConsultations", d.pendingConsultations);
      setText("totalRevenue", d.totalRevenue, true);

    } catch (err) {
      console.error("Dashboard Error:", err);
    }
  }

  /* ======================================================
     HELPER FUNCTIONS
  ====================================================== */

  function setText(id, value, isCurrency = false) {
    const el = document.getElementById(id);
    if (!el) return;

    if (value === undefined || value === null) {
      el.innerText = "—";
    } else {
      el.innerText = isCurrency ? `₹${value}` : value;
    }
  }

  /* ======================================================
     INIT
  ====================================================== */

  document.addEventListener("DOMContentLoaded", loadDashboardStats);

})();
