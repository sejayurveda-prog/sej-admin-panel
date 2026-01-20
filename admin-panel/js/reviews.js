/* =========================================================
   SEJ AYURVEDA – ADMIN REVIEWS JS (FINAL – SAFE VERSION)
   Source: Backend API → Google Sheet
========================================================= */

(function () {
  "use strict";

  // 🔐 Protect page (JWT)
  if (window.ADMIN_AUTH && typeof ADMIN_AUTH.protectPage === "function") {
    ADMIN_AUTH.protectPage();
  }

  const tbody = document.getElementById("reviewsBody");
  if (!tbody) return;

  let ALL_REVIEWS = [];

  /* ======================================================
     LOAD REVIEWS (ADMIN ONLY)
     GET /api/admin/reviews/pending
  ====================================================== */
  async function loadReviews() {
    try {
      const res = await apiGet("/admin/reviews/pending");

      // 🔥 HANDLE ALL POSSIBLE BACKEND RESPONSE SHAPES
      let list = [];

      if (Array.isArray(res)) {
        list = res;
      } else if (res && Array.isArray(res.data)) {
        list = res.data;
      } else if (res && Array.isArray(res.reviews)) {
        list = res.reviews;
      }

      if (!list.length) {
        empty("No reviews found.");
        return;
      }

      ALL_REVIEWS = list;
      render(ALL_REVIEWS);

    } catch (err) {
      console.error("❌ Reviews Error:", err);
      empty("Unable to load reviews");
    }
  }

  /* ======================================================
     RENDER TABLE
  ====================================================== */
  function render(data) {
    if (!data.length) {
      empty("No reviews found.");
      return;
    }

    tbody.innerHTML = data
      .map(
        (r) => `
        <tr>
          <td>${r.name || "-"}</td>
          <td>${r.rating ? r.rating + " ★" : "-"}</td>
          <td>${r.message || "-"}</td>
          <td>${statusBadge(r.Approved ?? r.approved)}</td>
          <td>
            <button class="action-btn approve-btn"
              onclick="approveReview('${r.id}')">
              Approve
            </button>
            <button class="action-btn reject-btn"
              onclick="rejectReview('${r.id}')">
              Reject
            </button>
          </td>
        </tr>
      `
      )
      .join("");
  }

  /* ======================================================
     STATUS BADGE
  ====================================================== */
  function statusBadge(v = "") {
    const s = String(v).toLowerCase();
    let cls = "pending";
    let text = "PENDING";

    if (s === "yes" || s === "approved" || s === "true") {
      cls = "approved";
      text = "APPROVED";
    } else if (s === "rejected" || s === "no") {
      cls = "rejected";
      text = "REJECTED";
    }

    return `<span class="badge ${cls}">${text}</span>`;
  }

  /* ======================================================
     EMPTY STATE
  ====================================================== */
  function empty(msg) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5">
          <div class="empty">${msg}</div>
        </td>
      </tr>`;
  }

  /* ======================================================
     ACTIONS (READY FOR BACKEND)
  ====================================================== */
  window.approveReview = async function (id) {
    alert("Approve review: " + id);

    // Future backend call:
    // await apiPut(`/admin/reviews/${id}/approve`);
    // loadReviews();
  };

  window.rejectReview = async function (id) {
    alert("Reject review: " + id);

    // Future backend call:
    // await apiPut(`/admin/reviews/${id}/reject`);
    // loadReviews();
  };

  /* ======================================================
     INIT
  ====================================================== */
  loadReviews();

})();
