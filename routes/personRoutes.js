const router = require('express').Router()
const Person = require('../models/Person')

// Rota para criar uma nova pessoa
router.post('/', async (req, res) => {
    // Extrair dados do corpo da requisição
    const { name, salary, approved } = req.body
    const person = { name, salary, approved }
    
    if (!name) {
        return res.status(422).json({ error: "O nome é obrigatório" })
    }

    // Criar novo documento no MongoDB
    try {
        await Person.create(person)
        res.status(201).json({ message: 'Pessoa inserida no sistema com sucesso' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

//Read de dados - Leitura
router.get('/', async (req, res) => {
    try {
        //Método para retornar todos os dados
        const people = await Person.find()
        res.status(200).json(people)
    } catch (error){
        res.status(500).json({error: error})

    }
})



module.exports = router
