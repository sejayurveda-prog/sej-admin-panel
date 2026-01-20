/* =========================================================
   SEJ AYURVEDA – ADMIN SETTINGS JS (FINAL)
   Read-only settings page (JWT protected)
========================================================= */

(function () {
  "use strict";

  // 🔐 Protect page (JWT – unified auth system)
  if (window.ADMIN_AUTH && typeof ADMIN_AUTH.protectPage === "function") {
    ADMIN_AUTH.protectPage();
  }

  /* ======================================================
     READ-ONLY MODE (INTENTIONAL)
  ====================================================== */

  // This page is intentionally READ-ONLY.
  // All settings are controlled from backend only.
  //
  // Future backend APIs (already planned):
  // GET  /api/admin/settings
  // PUT  /api/admin/settings
  //
  // Editable features (future):
  // - Consultation fees
  // - Advance payment percentage
  // - Admin credentials / access
  // - Notification rules

  console.log(
    "✅ Admin Settings loaded (read-only, JWT protected, backend-ready)"
  );

})();
