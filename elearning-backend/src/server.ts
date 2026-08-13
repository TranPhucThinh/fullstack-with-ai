import cors from 'cors'
import express, { NextFunction, type Request, type Response } from 'express'
import { pool } from './db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const JWT_SECRET = 'secret-dev-doi-sau'

const app = express()
app.use(cors())
app.use(express.json())

const auth = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Thiếu token' })
    return
  }

  try {
    const decoded = jwt.verify(header.slice(7), JWT_SECRET) as {
      userId: number
    }
    req.userId = decoded.userId
    next()
  } catch {
    res.status(401).json({ error: 'Token không hợp lệ hoặc hết hạn' })
  }
}

app.get('/api/me', auth, async (req: Request, res: Response) => {
  const { rows } = await pool.query(
    'SELECT id, email, name FROM users WHERE id=$1',
    [req.userId],
  )
  res.json(rows[0])
})

// GET /api/users — đọc toàn bộ users từ database
app.get('/api/users', async (req: Request, res: Response) => {
  const { rows } = await pool.query(
    'SELECT id, email, name FROM users ORDER BY id',
  )
  res.json(rows)
})

// POST /api/users — tạo user mới, trả về dòng vừa tạo kèm id (SERIAL)
app.post('/api/users', async (req: Request, res: Response) => {
  const { email, name } = req.body ?? {}

  if (!email || !name) {
    res.status(400).json({ error: 'email và name là bắt buộc' })
    return
  }
  const { rows } = await pool.query(
    'INSERT INTO users (email, name) VALUES ($1, $2) RETURNING id, email, name',
    [email, name],
  )
  res.status(201).json(rows[0])
})

// GET /api/users/:id — lấy 1 user
app.get('/api/users/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id) // ép kiểu id từ URL về số
  if (!Number.isInteger(id)) {
    res.status(404).json({ error: 'User not found' })
    return
  }
  const { rows } = await pool.query(
    'SELECT id, email, name FROM users WHERE id = $1',
    [id],
  )
  if (rows.length === 0) res.status(404).json({ error: 'User not found' })
  else res.json(rows[0])
})

// PUT /api/users/:id — cập nhật name/email
app.put('/api/users/:id', async (req: Request, res: Response) => {
  const { email, name } = req.body ?? {}
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) {
    res.status(404).json({ error: 'User not found' })
    return
  }
  const { rows } = await pool.query(
    'UPDATE users SET email = $1, name = $2 WHERE id = $3 RETURNING id, email, name',
    [email, name, id],
  )
  if (rows.length === 0) res.status(404).json({ error: 'User not found' })
  else res.json(rows[0])
})

// DELETE /api/users/:id — xóa user
app.delete('/api/users/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) {
    res.status(404).json({ error: 'User not found' })
    return
  }
  const { rowCount } = await pool.query('DELETE FROM users WHERE id = $1', [id])
  if (rowCount === 0) res.status(404).json({ error: 'User not found' })
  else res.status(204).end()
})

// GET /api/courses — danh sách khóa học (public)
app.get('/api/courses', async (req: Request, res: Response) => {
  const { rows } = await pool.query('SELECT * FROM courses ORDER BY id')
  res.json(rows)
})

// POST /api/courses — tạo khóa (CHỈ user đăng nhập)
app.post('/api/courses', auth, async (req: Request, res: Response) => {
  const { title, price, description } = req.body ?? {}
  if (!title) {
    res.status(400).json({ error: 'title là bắt buộc' })
    return
  }
  const { rows } = await pool.query(
    'INSERT INTO courses (title, price, description) VALUES ($1, $2, $3) RETURNING *',
    [title, price ?? 0, description ?? null],
  )
  res.status(201).json(rows[0])
})

// POST /api/enrollments — đăng ký khóa (CHỈ user đăng nhập)
app.post('/api/enrollments', auth, async (req: Request, res: Response) => {
  const { course_id } = req.body ?? {}
  if (!course_id) {
    res.status(400).json({ error: 'course_id là bắt buộc' })
    return
  }
  try {
    const { rows } = await pool.query(
      'INSERT INTO enrollments (user_id, course_id) VALUES ($1, $2) RETURNING *',
      [req.userId, course_id],
    )
    res.status(201).json(rows[0])
  } catch (error: any) {
    if (error.code === '23505') {
      res.status(409).json({ error: 'Đã đăng ký khóa này rồi' })
      return
    }
    if (error.code === '23503') {
      res.status(400).json({ error: 'Khóa học không tồn tại' })
      return
    }
    throw error
  }
})

// GET /api/me/courses — khóa học của tôi (JOIN enrollments + courses)
app.get('/api/me/courses', auth, async (req: Request, res: Response) => {
  const { rows } = await pool.query(
    `SELECT c.id, c.title, e.enrolled_at
    FROM enrollments e JOIN courses c ON c.id = e.course_id
    WHERE e.user_id = $1 ORDER BY e.enrolled_at
    `,
    [req.userId],
  )
  res.json(rows)
})

app.post('/api/auth/register', async (req: Request, res: Response) => {
  const { email, name, password } = req.body ?? {}

  if (!email || !name || !password) {
    res.status(400).json({ error: 'email, name, password là bắt buộc' })
    return
  }
  const hash = await bcrypt.hash(password, 10)
  try {
    const { rows } = await pool.query(
      'INSERT INTO users (email, name, password_hash) VALUES ($1, $2, $3) RETURNING id, email, name',
      [email, name, hash],
    )
    const token = jwt.sign(
      {
        userId: rows[0].id,
      },

      JWT_SECRET,
      { expiresIn: '1h' },
    )
    res.status(201).json({ user: rows[0], token })
  } catch (error: any) {
    if (error.code === '23505') {
      res.status(409).json({ error: 'Email đã tồn tại' })
      return
    }
    throw error
  }
})

app.post('/api/auth/login', async (req: Request, res: Response) => {
  const { email, password } = req.body ?? {}
  const { rows } = await pool.query('SELECT * FROM users WHERE email=$1', [
    email,
  ])

  if (
    rows.length === 0 ||
    !(await bcrypt.compare(password, rows[0].password_hash))
  ) {
    res.status(401).json({ error: 'Sai email hoặc mật khẩu' })
    return
  }
  const token = jwt.sign({ userId: rows[0].id }, JWT_SECRET, {
    expiresIn: '1h',
  })
  res.json({ token })
})

const PORT = Number(process.env.PORT ?? 4000)
app.listen(PORT, () => {
  console.log(`✅ Express running at http://localhost:${PORT}`)
})
