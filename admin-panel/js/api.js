/* =====================================================
   SEJ ADMIN PANEL – API CONFIG (FINAL FIXED)
   Backend: Node.js (Render)
   Auth: JWT (Admin Only)
===================================================== */

// ✅ REAL BACKEND URL
const API_BASE = "https://sej-ayurveda-backend.onrender.com/api";

/* -----------------------------------
   TOKEN HELPER
----------------------------------- */
function getToken() {
  // ✅ SAME KEY AS LOGIN
  return localStorage.getItem("adminToken");
}

/* -----------------------------------
   COMMON FETCH HANDLER
----------------------------------- */
async function request(path, options = {}) {
  try {
    const res = await fetch(API_BASE + path, options);

    // Auto logout on auth failure
    if (res.status === 401 || res.status === 403) {
      localStorage.removeItem("adminToken");
      window.location.href = "login.html";
      return;
    }

    const data = await res.json();
    return data;

  } catch (err) {
    alert("Server not reachable. Please try again.");
    console.error(err);
  }
}

/* -----------------------------------
   GET (Admin Protected)
----------------------------------- */
function apiGet(path) {
  return request(path, {
    headers: {
      "Authorization": "Bearer " + getToken()
    }
  });
}

/* -----------------------------------
   POST (Admin Protected)
----------------------------------- */
function apiPost(path, body) {
  return request(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + getToken()
    },
    body: JSON.stringify(body)
  });
}

/* -----------------------------------
   PUT (Admin Protected)
----------------------------------- */
function apiPut(path, body) {
  return request(path, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + getToken()
    },
    body: JSON.stringify(body)
  });
}

/* -----------------------------------
   DELETE (Admin Protected)
----------------------------------- */
function apiDelete(path) {
  return request(path, {
    method: "DELETE",
    headers: {
      "Authorization": "Bearer " + getToken()
    }
  });
}
