import cors from 'cors'
import express, { type Request, type Response } from 'express'
import { pool } from './db.js'

const app = express()
app.use(cors())
app.use(express.json())

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

const PORT = Number(process.env.PORT ?? 4000)
app.listen(PORT, () => {
  console.log(`✅ Express running at http://localhost:${PORT}`)
})
