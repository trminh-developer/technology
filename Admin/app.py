import os
import sqlite3
from flask import Flask, render_template, jsonify, g, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
DATABASE = 'database.sql'

# --- Cấu hình Database ---
def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
        db.row_factory = sqlite3.Row
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

def init_db():
    with app.app_context():
        db = get_db()
        cursor = db.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                role TEXT NOT NULL,
                status TEXT NOT NULL
            )
        ''')
        cursor.execute('SELECT count(*) FROM users')
        if cursor.fetchone()[0] == 0:
            sample_users = [
                ('TrMinh', 'trminhlaptrinh@gmail.com', 'Admin', 'Active'),
                ('TrMinh', 'trminhlaptrinh@gmail.com', 'Editor', 'Active'),
            ]
            cursor.executemany('INSERT INTO users (name, email, role, status) VALUES (?, ?, ?, ?)', sample_users)
            db.commit()

# --- Routes Giao Diện ---
@app.route('/')
def index():
    return render_template('admin.html')

# Routes API

# 1. READ: Lấy danh sách & Thống kê
@app.route('/api/stats')
def get_stats():
    db = get_db()
    cursor = db.cursor()
    # Thống kê thực tế từ DB
    cursor.execute('SELECT count(*) FROM users')
    total_users = cursor.fetchone()[0]
    return jsonify({
        'total_users': total_users,
        'revenue': '$45,200', # Giả định
        'active_sessions': 320,
        'server_load': '12%'
    })

@app.route('/api/users', methods=['GET'])
def get_users():
    db = get_db()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM users ORDER BY id DESC') # Mới nhất lên đầu
    users = cursor.fetchall()
    return jsonify([dict(user) for user in users])

# 2. CREATE: Thêm người dùng mới
@app.route('/api/users', methods=['POST'])
def add_user():
    data = request.json
    db = get_db()
    cursor = db.cursor()
    cursor.execute('INSERT INTO users (name, email, role, status) VALUES (?, ?, ?, ?)',
                    (data['name'], data['email'], data['role'], data['status']))
    db.commit()
    return jsonify({'message': 'User added successfully!'})

# 3. UPDATE: Sửa người dùng
@app.route('/api/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.json
    db = get_db()
    cursor = db.cursor()
    cursor.execute('UPDATE users SET name=?, email=?, role=?, status=? WHERE id=?',
                   (data['name'], data['email'], data['role'], data['status'], user_id))
    db.commit()
    return jsonify({'message': 'User updated successfully!'})

# 4. DELETE: Xóa người dùng
@app.route('/api/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute('DELETE FROM users WHERE id=?', (user_id,))
    db.commit()
    return jsonify({'message': 'User deleted successfully!'})

if __name__ == '__main__':
    if not os.path.exists(DATABASE):
        init_db()
    app.run(debug=True, port=5000)