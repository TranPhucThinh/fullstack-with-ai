// Verify nhanh Bài 14 — bcrypt + JWT
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const hash = await bcrypt.hash('secret123', 10)
console.log('hash:', hash.slice(0, 25) + '...')
console.log('compare dung:', await bcrypt.compare('secret123', hash))
console.log('compare sai:', await bcrypt.compare('sai', hash))

const token = jwt.sign({ userId: 1 }, 'demo-secret', { expiresIn: '1h' })
console.log('token:', token.slice(0, 25) + '...')
console.log('verify:', jwt.verify(token, 'demo-secret'))
try { jwt.verify(token, 'sai-secret'); console.log('LOI: khong nem loi') }
catch (e) { console.log('sai secret nem loi dung:', e.message) }
console.log('OK: bcrypt + jwt xanh')