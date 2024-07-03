const express = require('express')
const mongoose = require('mongoose')
const app = express()

const Person = require('./models/Person')

// Middleware para analisar o corpo da requisição
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Rotas da API
app.post('/person', async (req, res) => {
    // Extrair dados do corpo da requisição
    const { name, salary, approved } = req.body
    const person = { name, salary, approved }
    
    if (!name) {
        res.status(422).json({error: "O nome é obrigatório"})
    }

    // Criar novo documento no MongoDB
    try {
        await Person.create(person)
        res.status(201).json({ message: 'Pessoa inserida no sistema com sucesso' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

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



