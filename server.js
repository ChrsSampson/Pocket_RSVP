// production server - if needed
import express from 'express'
import path from 'path'
import fs from 'fs'

const port = 8080

const app = express()


// make sure dist exists
const exists = fs.readdirSync('.').includes('dist')

if (!exists) {
    throw new Error('Make sure to run `npm run build` before starting the server.')
}

app.use(express.static('dist'))

app.get('/', (req, res) => {
    res.sendFile('dist/index.html')
    })

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})
