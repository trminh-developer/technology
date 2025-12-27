// Hiệu ứng xuất hiện khi tải trang 
document.addEventListener("DOMContentLoaded", () => {
    checkLoginStatus();
    const content = document.querySelector('.container');
    if (content) {
        content.style.opacity = 0;
        content.style.transform = "translateY(20px)";
        content.style.transition = "all 0.8s ease";

        setTimeout(() => {
            content.style.opacity = 1;
            content.style.transform = "translateY(0)";
        }, 100);
    }
    const passwordInput = document.getElementById('login-pass');
    const toggleBtn = document.getElementById('toggle-btn');

    // Xử lý nút hiện/ẩn mật khẩu
    if (toggleBtn && passwordInput) {
        toggleBtn.addEventListener('click', () => {
            // Kiểm tra type hiện tại
            const currentType = passwordInput.getAttribute('type');

            // Đổi type: password <-> text
            const newType = currentType === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', newType);
        });
    }
    setupPassswordToggle();
});
// 1. Kiểm tra trạng thái Đăng nhập khi tải trang
document.addEventListener("DOMContentLoaded", () => {
    checkLoginStatus();

    // Hiệu ứng Fade-in trang
    const content = document.querySelector('.container');
    if (content) {
        content.style.opacity = 0;
        content.style.transform = "translateY(20px)";
        content.style.transition = "all 0.8s ease";
        setTimeout(() => {
            content.style.opacity = 1;
            content.style.transform = "translateY(0)";
        }, 100);
    }
});

// Hàm ẩn/hiển password
function setupPassswordToggle() {

    const passwordInput = document.getElementById('login-pass');
    const toggleBtn = document.getElementById('toggle-btn');
    const eyeOpen = document.getElementById('eye-open');
    const eyeClose = document.getElementById('eye-close');

    if (toggleBtn && passwordInput && eyeOpen && eyeClose) {
        toggleBtn.addEventListener('click', () => {
            const currentType = passwordInput.getAttribute('type');
            if (currentType === 'passowrd') {
                passwordInput.setAttribute('type', 'text');
                eyeOpen.classList.add('hidden');
                eyeClose.classList.remove('hidden');
            } else {
                passwordInput.setAttribute('type', 'password');
                eyeOpen.classList.remove('hidden');
                eyeClose.classList.add('hidden');
            }
        });
    }
}

// 2. Hàm xử lý Đăng Ký
function handleRegister(event) {
    event.preventDefault(); // Chặn load lại trang
    const username = document.getElementById('reg-user').value;
    const pass = document.getElementById('reg-pass').value;

    if (!username || !pass) return alert("Vui lòng nhập đủ thông tin!");

    // Lưu vào Local Storage (Giả lập Database)
    const user = { username, pass };
    localStorage.setItem('currentUser', JSON.stringify(user));

    alert("Đăng ký thành công! Hãy đăng nhập.");
    window.location.href = "login.html";
}

// 3. Hàm xử lý Đăng Nhập
function handleLogin(event) {
    event.preventDefault(); // Ngăn load lại trang

    // 1. Lấy giá trị người dùng nhập
    const username = document.getElementById('login-user').value;
    const pass = document.getElementById('login-pass').value;

    // 2. Lấy dữ liệu đã lưu trong LocalStorage
    const storedUserRaw = localStorage.getItem('currentUser');

    if (!storedUserRaw) {
        alert("Chưa có tài khoản nào được đăng ký!");
        return;
    }

    const storedUser = JSON.parse(storedUserRaw);

    // 3. So sánh thông tin
    // Trim() giúp loại bỏ khoảng trắng thừa nếu người dùng lỡ tay copy paste
    if (username.trim() === storedUser.username && pass === storedUser.pass) {
        localStorage.setItem('isLoggedIn', 'true'); // Đánh dấu đã đăng nhập
        alert("Đăng nhập thành công!");
        window.location.href = "../main/index.html"; // Chuyển về trang chủ
    } else {
        alert("Sai tên đăng nhập hoặc mật khẩu!");
    }
}

// 4. Hàm xử lý Đăng Xuất
function handleLogout() {
    localStorage.removeItem('isLoggedIn');
    alert("Đã đăng xuất!");
    window.location.href = "login.html";
}

// 5. Hàm kiểm tra & Cập nhật giao diện Navbar
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));

    const guestNav = document.getElementById('guest-nav'); // Menu cho khách
    const userNav = document.getElementById('user-nav');   // Menu cho thành viên
    const usernameDisplay = document.getElementById('username-display');

    if (isLoggedIn && storedUser) {
        if (guestNav) guestNav.classList.add('hidden');
        if (userNav) userNav.classList.remove('hidden');
        if (usernameDisplay) usernameDisplay.innerText = "Hi, " + storedUser.username;
    } else {
        if (guestNav) guestNav.classList.remove('hidden');
        if (userNav) userNav.classList.add('hidden');
    }
}
// Gửi Thông tin support
function kiemTraVaGui() {
    // 1. Lấy giá trị từ các ô nhập
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;

    // 2. Kiểm tra xem có ô nào bị bỏ trống không
    if (name == "") {
        alert("Vui lòng nhập Họ và tên!");
        document.getElementById("name").focus(); // Đưa con trỏ chuột vào ô này
        return; // Dừng lại, không gửi
    }

    if (email == "") {
        alert("Vui lòng nhập Email!");
        document.getElementById("email").focus();
        return;
    }

    if (message == "") {
        alert("Vui lòng nhập nội dung tư vấn!");
        document.getElementById("message").focus();
        return;
    }

    // 3. Nếu tất cả đã nhập đủ -> Hiện thông báo và Gửi Form
    alert("Đã gửi thành công!");
    document.getElementById("myForm").submit(); // Lệnh gửi form đi
}