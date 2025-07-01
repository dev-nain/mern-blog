import express from 'express'
import error from './middleware/error.js'
import config from './config/config.js'
import { connectDB } from './utils/db.js'
import blogRouter from './routes/blogs.js'


connectDB()

const app = express()
app.use(express.json())


app.get("/", (req, res) => {
    res.send("App is running")
})

app.use('/blogs', blogRouter)
app.use(error.notFound)
app.use(error.converter)
app.use(error.handler)



app.listen(config.port, () => {
    console.log(`App running on port: ${config.port}`)
})