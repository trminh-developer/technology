document.addEventListener("DOMContentLoaded", () => {
    checkLoginStatus();
    setupPageFadeIn();
    setupPasswordToggle();
});

function setupPageFadeIn() {
    const content = document.querySelector('.container');
    if (!content) return;

    content.style.opacity = 0;
    content.style.transform = "translateY(20px)";
    content.style.transition = "all 0.8s ease";

    setTimeout(() => {
        content.style.opacity = 1;
        content.style.transform = "translateY(0)";
    }, 100);
}

function setupPasswordToggle() {
    const passwordInput = document.getElementById('login-pass');
    const toggleBtn = document.getElementById('toggle-btn');
    const eyeIcon = document.getElementById('eye-icon');
    const eyeOpen = document.getElementById('eye-open');
    const eyeClose = document.getElementById('eye-close');

    if (!toggleBtn || !passwordInput) return;

    toggleBtn.addEventListener('click', () => {
        const isPassword = passwordInput.getAttribute('type') === 'password';
        passwordInput.setAttribute('type', isPassword ? 'text' : 'password');

        if (eyeIcon) {
            eyeIcon.classList.toggle('bi-eye', isPassword);
            eyeIcon.classList.toggle('bi-eye-slash', !isPassword);
        }

        if (eyeOpen && eyeClose) {
            eyeOpen.classList.toggle('hidden', isPassword);
            eyeClose.classList.toggle('hidden', !isPassword);
        }
    });
}

async function handleRegister(event) {
    event.preventDefault();

    const username = document.getElementById('reg-user').value.trim();
    const password = document.getElementById('reg-pass').value;

    if (!username || !password) {
        alert("Vui lòng nhập đủ thông tin!");
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();

        if (response.ok) {
            alert("Đăng ký thành công! Hãy đăng nhập.");
            window.location.href = "/Website/username/login.html";
        } else {
            alert(data.error || "Đăng ký thất bại!");
        }
    } catch (error) {
        console.error(error);
        alert("Lỗi kết nối tới server!");
    }
}

async function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById('login-user').value.trim();
    const password = document.getElementById('login-pass').value;

    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('token', data.token);
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            alert("Đăng nhập thành công!");
            window.location.href = "/Website/main/index.html";
        } else {
            alert(data.error || "Sai tên đăng nhập hoặc mật khẩu!");
        }
    } catch (error) {
        console.error(error);
        alert("Lỗi kết nối tới server!");
    }
}

function handleLogout() {
    localStorage.removeItem('isLoggedIn');
    alert("Đã đăng xuất!");
    window.location.href = "/Website/username/login.html";
}

function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedUserRaw = localStorage.getItem('currentUser');

    let storedUser = null;
    if (storedUserRaw) {
        try {
            storedUser = JSON.parse(storedUserRaw);
        } catch {
            localStorage.removeItem('currentUser');
            localStorage.removeItem('isLoggedIn');
        }
    }

    const guestNav = document.getElementById('guest-nav');
    const userNav = document.getElementById('user-nav');
    const usernameDisplay = document.getElementById('username-display');

    if (isLoggedIn && storedUser) {
        if (guestNav) guestNav.classList.add('hidden');
        if (userNav) userNav.classList.remove('hidden');
        if (usernameDisplay) {
            usernameDisplay.innerText = "Hi, " + storedUser.username;
            const profileLink = usernameDisplay.closest('a');
            if (profileLink) {
                profileLink.href = storedUser.role === 'Admin' ? '/Website/Admin/profile.html' : '/Website/profile/index.html';
            }
        }
    } else {
        if (guestNav) guestNav.classList.remove('hidden');
        if (userNav) userNav.classList.add('hidden');
    }
}

async function kiemTraVaGui(event) {
    if (event) event.preventDefault();
    
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        alert("Vui lòng nhập đủ Họ tên, Email và nội dung tư vấn!");
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message })
        });
        const data = await response.json();

        if (response.ok) {
            alert("Đã gửi thành công!");
            const form = document.getElementById("myForm");
            if (form) form.reset();
        } else {
            alert(data.error || "Lỗi gửi liên hệ!");
        }
    } catch (error) {
        console.error(error);
        alert("Lỗi kết nối tới server!");
    }
}
