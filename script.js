const API_BASE = "http://localhost:5000/api"; // change if deployed

// ---------- Auth Page ----------
if (document.getElementById("authForm")) {
  const form = document.getElementById("authForm");
  const toggle = document.getElementById("toggle");
  let isLogin = true;

  toggle.addEventListener("click", (e) => {
    e.preventDefault();
    isLogin = !isLogin;
    document.getElementById("submitBtn").innerText = isLogin ? "Login" : "Register";
    toggle.innerHTML = isLogin ? `New here? <a href="#">Register</a>` : `Already registered? <a href="#">Login</a>`;
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = form.username.value;
    const password = form.password.value;

    const endpoint = isLogin ? "login" : "register";
    const res = await fetch(`${API_BASE}/auth/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "dashboard.html";
    } else {
      alert(data.message || "Error");
    }
  });
}

// ---------- Dashboard Page ----------
if (document.getElementById("sessionDraft")) {
  const token = localStorage.getItem("token");
  const draft = document.getElementById("sessionDraft");
  const sessionList = document.getElementById("sessionList");
  const publishBtn = document.getElementById("publishBtn");

  let timeout = null;

  draft.addEventListener("input", () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      autoSaveDraft(draft.value);
    }, 1000); // auto-save after 1s of inactivity
  });

  async function autoSaveDraft(content) {
    await fetch(`${API_BASE}/sessions/draft`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    });
    console.log("Draft auto-saved");
  }

  publishBtn.addEventListener("click", async () => {
    const res = await fetch(`${API_BASE}/sessions/publish`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content: draft.value }),
    });
    const data = await res.json();
    if (res.ok) {
      draft.value = "";
      loadSessions();
    } else {
      alert(data.message);
    }
  });

  async function loadSessions() {
    const res = await fetch(`${API_BASE}/sessions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const sessions = await res.json();
    sessionList.innerHTML = "";
    sessions.forEach((s) => {
      const li = document.createElement("li");
      li.innerText = s.content;
      sessionList.appendChild(li);
    });
  }

  loadSessions();
}
