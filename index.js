const express = require('express')
const mongoose = require('mongoose')
const app = express()

const Person = require('./models/Person')
const personRoutes = require('./routes/personRoutes')

// Middleware para analisar o corpo da requisição
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/person', personRoutes)

// Rota inicial / endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Olá mundo' })
})

// Conexão ao MongoDB
const db_user = 'Kaua'
const db_password = encodeURIComponent('Kaua!!24092007')

mongoose
    .connect(`mongodb+srv://${db_user}:${db_password}@cluster0.3pfy0z8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Conectamos ao MongoDB')
        app.listen(3000, () => {
            console.log('Servidor rodando na porta 3000')
        })
    })
    .catch((err) => console.log(err))



