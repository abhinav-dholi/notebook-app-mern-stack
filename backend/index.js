const connectToMongo = require('./db')
const express = require('express')

connectToMongo();

const app = express()
const port = 5505

app.use(express.json())

// Available routes

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

// app.get('/', (req, res) => {
//   res.send('Hello Abhinav!')
// })

app.listen(port, () => {
  console.log(`Notebook app backend is listening at ${port}`)
})