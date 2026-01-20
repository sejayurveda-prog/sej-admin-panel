/* =========================================================
   SEJ AYURVEDA – ADMIN AUTH JS (FINAL FIXED)
========================================================= */

(function () {
  "use strict";

  /* ======================================================
     TOKEN HELPERS (SAME KEY AS api.js)
  ====================================================== */

  const TOKEN_KEY = "adminToken";

  function getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  function setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  function removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  }

  /* ======================================================
     LOGIN (JWT)
  ====================================================== */

  async function adminLogin(email, password) {
    const res = await fetch(API_BASE + "/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.message || "Login failed");
    }

    // ✅ CORRECT TOKEN PATH
    setToken(data.data.token);

    return data;
  }

  /* ======================================================
     LOGOUT
  ====================================================== */

  function adminLogout() {
    removeToken();
    window.location.href = "login.html";
  }

  /* ======================================================
     PAGE PROTECTION
  ====================================================== */

  function protectPage() {
    if (!getToken()) {
      window.location.href = "login.html";
    }
  }

  /* ======================================================
     EXPORT
  ====================================================== */

  window.ADMIN_AUTH = {
    adminLogin,
    adminLogout,
    protectPage
  };

})();
