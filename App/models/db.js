const { Sequelize } = require('sequelize');

require('dotenv').config();

if (!process.env.DATABASE_URL) {
    console.error('❌ LỖI NGHIÊM TRỌNG: Chưa cấu hình DATABASE_URL trong file .env');
    console.error('Vui lòng tạo file .env trong thư mục App/ và thêm: DATABASE_URL=chuỗi_kết_nối_supabase_của_bạn');
    process.exit(1);
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

module.exports = sequelize;
