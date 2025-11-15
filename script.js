// Validate email (replaces Zod)
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
}

// Toast
function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Form logic
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("email-form");
  const emailInput = document.getElementById("email");
  const submitBtn = document.getElementById("submit-btn");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value;

    if (!validateEmail(email)) {
      showToast("Email invalide", "error");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Envoi...";

    await new Promise((res) => setTimeout(res, 1000));

    showToast("Inscription réussie !", "success");

    emailInput.value = "";
    submitBtn.disabled = false;
    submitBtn.textContent = "Rejoindre";
  });
});
