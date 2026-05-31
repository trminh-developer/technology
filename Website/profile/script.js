const API_URL = 'http://localhost:3000/api/auth/profile';

function showToast(message, isError = false) {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.style.background = isError ? '#ef4444' : '#10b981';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

async function loadProfile() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/Website/username/login.html';
        return;
    }

    try {
        const response = await fetch(API_URL, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!response.ok) {
            localStorage.removeItem('token');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('currentUser');
            window.location.href = '/Website/username/login.html';
            return;
        }

        const user = await response.json();
        
        // Populate display fields
        document.getElementById('display-name').innerText = user.name || user.username;
        document.getElementById('display-role').innerText = user.role;
        document.getElementById('header-username').innerText = user.username;

        if (user.role !== 'Admin') {
            document.querySelectorAll('.menu li').forEach(li => {
                if (li.innerText.includes('Dashboard') || li.innerText.includes('Users') || li.innerText.includes('Settings')) {
                    li.style.display = 'none';
                }
            });
        }
        
        
        let avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || user.username)}&background=3b82f6&color=fff`;
        if (user.avatar) {
            avatarUrl = 'http://localhost:3000' + user.avatar;
            document.getElementById('main-avatar').src = avatarUrl;
            document.getElementById('header-avatar').src = avatarUrl;
        } else {
            document.getElementById('main-avatar').src = `${avatarUrl}&size=120`;
            document.getElementById('header-avatar').src = avatarUrl;
        }

        // Populate inputs
        document.getElementById('input-name').value = user.name || '';
        document.getElementById('input-username').value = user.username || '';
        document.getElementById('input-email').value = user.email || '';
        document.getElementById('input-phone').value = user.phone || '';
        
    } catch (error) {
        console.error('Lỗi tải profile:', error);
        showToast('Lỗi tải dữ liệu!', true);
    }
}

window.updateProfile = async function(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const name = document.getElementById('input-name').value;
    const username = document.getElementById('input-username').value;
    const email = document.getElementById('input-email').value;
    const phone = document.getElementById('input-phone').value;

    try {
        const response = await fetch(API_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name, username, email, phone })
        });
        
        const data = await response.json();
        if (response.ok) {
            showToast('Cập nhật hồ sơ thành công!');
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            loadProfile();
        } else {
            if (response.status === 404) {
                localStorage.removeItem('token');
                window.location.href = '/Website/username/login.html';
                return;
            }
            showToast(data.error || 'Cập nhật thất bại', true);
        }
    } catch (error) {
        console.error(error);
        showToast('Lỗi kết nối tới server', true);
    }
}

window.updatePassword = async function(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const oldPassword = document.getElementById('input-old-password').value;
    const newPassword = document.getElementById('input-new-password').value;
    const confirmPassword = document.getElementById('input-confirm-password').value;

    if (newPassword !== confirmPassword) {
        showToast('Mật khẩu xác nhận không khớp!', true);
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ oldPassword, newPassword })
        });
        
        const data = await response.json();
        if (response.ok) {
            showToast('Đổi mật khẩu thành công! Vui lòng đăng nhập lại.');
            document.getElementById('form-security').reset();
            setTimeout(() => {
                localStorage.removeItem('token');
                window.location.href = '/Website/username/login.html';
            }, 2000);
        } else {
            showToast(data.error || 'Lỗi đổi mật khẩu', true);
        }
    } catch (error) {
        console.error(error);
        showToast('Lỗi kết nối tới server', true);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadProfile();

    const avatarInput = document.getElementById('input-avatar');
    if (avatarInput) {
        avatarInput.addEventListener('change', async function() {
            const file = this.files[0];
            if (!file) return;

            const formData = new FormData();
            formData.append('avatar', file);

            const token = localStorage.getItem('token');
            try {
                const response = await fetch('http://localhost:3000/api/auth/avatar', {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}` },
                    body: formData
                });
                
                const data = await response.json();
                if (response.ok) {
                    showToast('Đổi ảnh đại diện thành công!');
                    document.getElementById('main-avatar').src = 'http://localhost:3000' + data.avatar;
                    document.getElementById('header-avatar').src = 'http://localhost:3000' + data.avatar;
                    
                    // Cập nhật local storage
                    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
                    currentUser.avatar = data.avatar;
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                } else {
                    showToast(data.error || 'Lỗi tải ảnh', true);
                }
            } catch (err) {
                console.error(err);
                showToast('Lỗi mạng', true);
            }
        });
    }
});
