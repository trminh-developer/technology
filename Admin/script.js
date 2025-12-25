// --- Logic Frontend ---

// HÀM HỖ TRỢ: Giả lập dữ liệu nếu không có API (Để bạn test giao diện)
function getMockStats() {
    return {
        total_users: '12,345',
        revenue: '$45,230',
        active_sessions: '563',
        server_load: '34%'
    };
}

function getMockUsers() {
    return [
        { id: 1111, name: "TrMinh", email: "trminhlaptrinhvien@gmail.com", role: "Admin", status: "Active" },
        { id: 2536, name: "Trần Thị B", email: "b@example.com", role: "Editor", status: "Pending" },
        { id: 9256, name: "Lê Văn C", email: "c@example.com", role: "User", status: "Inactive" },
        { id: 1153, name: "Phạm Minh D", email: "d@example.com", role: "User", status: "Active" }
    ];
}

// 1. Load Stats
async function loadStats() {
    try {
        // Thử gọi API thật
        // const response = await fetch('/api/stats');
        // const data = await response.json();

        // SỬ DỤNG DỮ LIỆU GIẢ LẬP (Thay thế dòng fetch trên nếu chưa có backend)
        const data = getMockStats();

        // Render HTML
        const statsHtml = `
            <div class="card">
                <div class="card-header">
                    <div>
                        <div class="card-title">Tổng người dùng</div>
                        <div class="card-value">${data.total_users}</div>
                    </div>
                    <div class="card-icon"><i class="fa-solid fa-users"></i></div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <div>
                        <div class="card-title">Doanh thu</div>
                        <div class="card-value">${data.revenue}</div>
                    </div>
                    <div class="card-icon"><i class="fa-solid fa-sack-dollar"></i></div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <div>
                        <div class="card-title">Truy cập hiện tại</div>
                        <div class="card-value">${data.active_sessions}</div>
                    </div>
                    <div class="card-icon"><i class="fa-solid fa-eye"></i></div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <div>
                        <div class="card-title">Tải máy chủ</div>
                        <div class="card-value">${data.server_load}</div>
                    </div>
                    <div class="card-icon"><i class="fa-solid fa-server"></i></div>
                </div>
            </div>
        `;
        document.getElementById('stats-container').innerHTML = statsHtml;
    } catch (error) {
        console.error('Lỗi khi tải thống kê:', error);
        document.getElementById('stats-container').innerHTML = '<p style="color:red">Lỗi tải dữ liệu</p>';
    }
}

// 2. Load Users Table
async function loadUsers() {
    try {
        // Thử gọi API thật
        // const response = await fetch('/api/users');
        // const users = await response.json();

        // SỬ DỤNG DỮ LIỆU GIẢ LẬP (Thay thế dòng fetch trên nếu chưa có backend)
        const users = getMockUsers();

        const tableHtml = users.map(user => `
            <tr>
                <td>#${user.id}</td>
                <td>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random" style="width: 30px; height: 30px; border-radius: 50%;">
                        ${user.name}
                    </div>
                </td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td><span class="status ${user.status}">${user.status}</span></td>
            </tr>
        `).join('');

        document.getElementById('users-table-body').innerHTML = tableHtml;
    } catch (error) {
        console.error('Lỗi khi tải danh sách user:', error);
    }
}

// Khởi chạy khi load trang
document.addEventListener('DOMContentLoaded', () => {
    loadStats();
    loadUsers();
});