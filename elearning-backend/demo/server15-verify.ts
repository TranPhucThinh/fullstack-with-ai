// Verify Bài 15 — gom CRUD users + courses + enrollments + auth thành API Express hoàn chỉnh
import express, { NextFunction, type Request, type Response } from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import pg from 'pg'
import { loadEnvFile } from 'node:process'

loadEnvFile()
const pool = new pg.Pool()
const app = express()
app.use(cors())
app.use(express.json())
const SECRET = 'secret-verify-bai15'

// ---- AUTH middleware ----
const auth = (req: Request, res: Response, next: NextFunction) => {
  const h = req.headers.authorization
  if (!h?.startsWith('Bearer ')) { res.status(401).json({ error: 'Thiếu token' }); return }
  try { (req as any).userId = (jwt.verify(h.slice(7), SECRET) as any).userId; next() }
  catch { res.status(401).json({ error: 'Token không hợp lệ' }) }
}

// ---- AUTH ----
app.post('/api/auth/register', async (req, res) => {
  const { email, name, password } = req.body ?? {}
  if (!email || !name || !password) { res.status(400).json({ error: 'Thiếu field' }); return }
  const hash = await bcrypt.hash(password, 10)
  try {
    const { rows } = await pool.query(
      'INSERT INTO users (email, name, password_hash) VALUES ($1,$2,$3) RETURNING id,email,name',
      [email, name, hash])
    res.status(201).json({ user: rows[0], token: jwt.sign({ userId: rows[0].id }, SECRET, { expiresIn: '1h' }) })
  } catch (e: any) {
    if (e.code === '23505') { res.status(409).json({ error: 'Email đã tồn tại' }); return }
    throw e
  }
})
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body ?? {}
  const { rows } = await pool.query('SELECT * FROM users WHERE email=$1', [email])
  if (rows.length === 0 || !(await bcrypt.compare(password, rows[0].password_hash))) {
    res.status(401).json({ error: 'Sai email hoặc mật khẩu' }); return
  }
  res.json({ token: jwt.sign({ userId: rows[0].id }, SECRET, { expiresIn: '1h' }) })
})
app.get('/api/me', auth, async (req, res) => {
  const { rows } = await pool.query('SELECT id,email,name FROM users WHERE id=$1', [(req as any).userId])
  res.json(rows[0])
})

// ---- USERS (có sẵn bài 12) ----
app.get('/api/users', async (req, res) => {
  const { rows } = await pool.query('SELECT id,email,name FROM users ORDER BY id')
  res.json(rows)
})

// ---- COURSES (mới từ bài 13) ----
app.get('/api/courses', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM courses ORDER BY id')
  res.json(rows)
})
app.post('/api/courses', auth, async (req, res) => {
  const { title, price, description } = req.body ?? {}
  if (!title) { res.status(400).json({ error: 'title là bắt buộc' }); return }
  const { rows } = await pool.query(
    'INSERT INTO courses (title, price, description) VALUES ($1,$2,$3) RETURNING *',
    [title, price ?? 0, description ?? null])
  res.status(201).json(rows[0])
})

// ---- ENROLLMENTS (mới từ bài 13) ----
app.post('/api/enrollments', auth, async (req, res) => {
  const { course_id } = req.body ?? {}
  if (!course_id) { res.status(400).json({ error: 'course_id là bắt buộc' }); return }
  try {
    const { rows } = await pool.query(
      'INSERT INTO enrollments (user_id, course_id) VALUES ($1,$2) RETURNING *',
      [(req as any).userId, course_id])
    res.status(201).json(rows[0])
  } catch (e: any) {
    if (e.code === '23505') { res.status(409).json({ error: 'Đã đăng ký khóa này rồi' }); return }
    if (e.code === '23503') { res.status(400).json({ error: 'Khóa học không tồn tại' }); return }
    throw e
  }
})
app.get('/api/me/courses', auth, async (req, res) => {
  const { rows } = await pool.query(
    `SELECT c.id, c.title, e.enrolled_at
     FROM enrollments e JOIN courses c ON c.id = e.course_id
     WHERE e.user_id = $1 ORDER BY e.enrolled_at`, [(req as any).userId])
  res.json(rows)
})

app.listen(4200, () => console.log('✅ Bai 15 verify on :4200'))