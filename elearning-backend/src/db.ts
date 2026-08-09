import pg from 'pg'
import { loadEnvFile } from 'node:process'

loadEnvFile()

// Pool: "bể bơi" kết nối dùng chung — pg tự đọc PG* env vars
export const pool = new pg.Pool()

// Kiểm tra kết nối thật — chạy server sẽ thấy dòng này nếu database OK
pool
  .query('SELECT 1')
  .then(() => console.log('✅ Database connected'))
  .catch((err) => console.error('❌ Database error:', err.message))
