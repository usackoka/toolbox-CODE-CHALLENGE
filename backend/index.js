import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import router from './routes/index.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use('', router)
app.set('port', process.env.PORT || 3100)
app.listen(app.get('port'), () => {
  console.log('server on port ' + app.get('port'))
})
