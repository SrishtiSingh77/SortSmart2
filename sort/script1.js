document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.getElementById("loginBtn");
    const modal = document.getElementById("loginModal");
    const closeBtn = document.querySelector(".close");
    const loginForm = document.getElementById("loginForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const emailError = document.getElementById("emailError");

    // Open modal unless logout clicked
    loginBtn.addEventListener("click", function (event) {
        if (event.target.id === "logoutIcon") return;
        modal.style.display = "flex";
    });

    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Autofill email/pass if name matches a saved user
    nameInput.addEventListener("input", function () {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const match = users.find(u => u.name.toLowerCase() === nameInput.value.trim().toLowerCase());
        if (match) {
            emailInput.value = match.email;
            passwordInput.value = match.password;
        } else {
            emailInput.value = "";
            passwordInput.value = "";
        }
    });

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!email.includes("@")) {
            emailError.textContent = "Please enter a valid email address.";
            return;
        } else {
            emailError.textContent = "";
        }

        // Store or update user
        let users = JSON.parse(localStorage.getItem("users")) || [];
        const existingIndex = users.findIndex(u => u.email === email);

        if (existingIndex >= 0) {
            users[existingIndex] = { name, email, password };
        } else {
            users.push({ name, email, password });
        }

        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUser", email);

        // Fixed template literals by using backticks instead of regular quotes
        loginBtn.innerHTML = `Hello, ${name} <img src="poweroff.png" id="logoutIcon" class="logout-icon" alt="Logout">`;
        modal.style.display = "none";

        attachLogoutListener();
    });

    // Auto login if user exists
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const currentUserEmail = localStorage.getItem("currentUser");
    if (currentUserEmail) {
        const user = users.find(u => u.email === currentUserEmail);
        if (user) {
            // Fixed template literals by using backticks
            loginBtn.innerHTML = `Hello, ${user.name} <img src="poweroff.png" id="logoutIcon" class="logout-icon" alt="Logout">`;
            attachLogoutListener();
        }
    }

    function attachLogoutListener() {
        setTimeout(() => {
            const logoutIcon = document.getElementById("logoutIcon");
            if (logoutIcon) {
                logoutIcon.addEventListener("click", function (event) {
                    event.preventDefault();
                    event.stopPropagation(); // Added to prevent event bubbling
                    localStorage.removeItem("currentUser");
                    loginBtn.innerHTML = "Login / Signup";

                    // Reset form inputs
                    loginForm.reset();
                    emailError.textContent = "";
                });
            }
        }, 0);
    }
});