import express, { type Request, type Response } from 'express'
import { courses, createCourseId } from './courses.js'

const app = express()
app.use(express.json())

app.get('/api/courses', (req: Request, res: Response) => {
  const limit = Number(req.query.limit ?? courses.length)

  res.json(courses.slice(0, limit))
})

app.get('/api/courses/:id', (req: Request, res: Response) => {
  const course = courses.find((c) => c.id === Number(req.params.id))

  if (course) res.json(course)
  else res.status(404).json({ error: 'Course not found' })
})

app.post('/api/courses', (req: Request, res: Response) => {
  const { title, price } = req.body ?? {}
  if (!title || typeof title !== 'string') {
    res.status(400).json({ error: 'title là bắt buộc (string)' })
    return
  }

  const id = createCourseId()
  const course = {
    id,
    title,
    price: Number(price),
  }

  courses.push(course)

  res.status(201).json(course)
})

const PORT = Number(process.env.PORT ?? 4000)
app.listen(PORT, () => {
  console.log(`✅ Express running at http://localhost:${PORT}`)
})
