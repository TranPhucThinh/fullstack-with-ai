// Verify auth flow: register/login/me — bcrypt + JWT + PostgreSQL
import express, { type Request, type Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import pg from 'pg'
import { loadEnvFile } from 'node:process'

loadEnvFile()
const pool = new pg.Pool()
const app = express()
app.use(express.json())
const SECRET = 'secret-verify-bai14'

// Middleware auth
function auth(req: Request, res: Response, next: any) {
  const h = req.headers.authorization
  if (!h?.startsWith('Bearer ')) { res.status(401).json({ error: 'Thiếu token' }); return }
  try { (req as any).userId = (jwt.verify(h.slice(7), SECRET) as any).userId; next() }
  catch { res.status(401).json({ error: 'Token không hợp lệ' }) }
}

// Register
app.post('/api/auth/register', async (req: Request, res: Response) => {
  const { email, name, password } = req.body ?? {}
  if (!email || !name || !password) { res.status(400).json({ error: 'Thiếu field' }); return }
  const hash = await bcrypt.hash(password, 10)
  try {
    const { rows } = await pool.query(
      'INSERT INTO users (email, name, password_hash) VALUES ($1,$2,$3) RETURNING id, email, name',
      [email, name, hash])
    res.status(201).json({ user: rows[0], token: jwt.sign({ userId: rows[0].id }, SECRET, { expiresIn: '1h' }) })
  } catch (e: any) {
    if (e.code === '23505') { res.status(409).json({ error: 'Email đã tồn tại' }); return }
    throw e
  }
})

// Login
app.post('/api/auth/login', async (req: Request, res: Response) => {
  const { email, password } = req.body ?? {}
  const { rows } = await pool.query('SELECT * FROM users WHERE email=$1', [email])
  if (rows.length === 0 || !(await bcrypt.compare(password, rows[0].password_hash))) {
    res.status(401).json({ error: 'Sai email hoặc mật khẩu' }); return
  }
  res.json({ token: jwt.sign({ userId: rows[0].id }, SECRET, { expiresIn: '1h' }) })
})

// Me (protected)
app.get('/api/me', auth, async (req: Request, res: Response) => {
  const { rows } = await pool.query('SELECT id, email, name FROM users WHERE id=$1', [(req as any).userId])
  res.json(rows[0])
})

app.listen(4100, () => console.log('✅ Auth verify on :4100'))