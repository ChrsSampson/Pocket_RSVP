// production server - if needed
import express from 'express'
import path from 'path'
import fs from 'fs'

const port = 8080

const app = express()

const __dirname = path.resolve()

// make sure dist exists
const exists = fs.readdirSync('.').includes('dist')

if (!exists) {
    throw new Error('Make sure to run `npm run build` before starting the server.')
}

app.use(express.static('dist'))

app.get('/', (req, res) => {
    res.sendFile('dist/index.html')
})

app.use((req,res,next) => {
    res.sendFile('index.html', {root: path.join(__dirname, "dist")})
})

app.use((err,req,res,next) => {
    console.error(err.stack)
    res.status(500).send(
        "<html><body><h1>500 Internal Server Error</h1><a href="/">Home</a></body></html>"
    )

})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})


