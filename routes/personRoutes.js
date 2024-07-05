const router = require('express').Router()
const { application } = require('express')
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

router.get('/:id', async (req, res) => {
    //Extrair o dado da requisição

    const id = req.params.id;
    try {
        const person = await Person.findOne({_id: id})

        if (!person) {
            res.status(422).json({message: "O usuário não foi encontrado"})
            return
        }

        res.status(201).json(person)
    } catch (error) {
        res.status(500).json({error: error})
    }

})


//Atualização de dados
router.patch("/:id",  async (req, res) => {
    const id = req.params.id;

    const {name, salary, approved} = req.body

    const person = {
        name, salary, approved
    }

    try {
        const updatePerson = await Person.updateOne({_id: id}, person)

        if (updatePerson.matchedCount === 0) {
            res.status(422).json({message: "Usuário não encontrado"})
            return
        }
        
        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

//Deleção de dados
router.delete('/:id', async (req, res) => {
    const id  = req.params.id;

    const person = await Person.findOne({_id: id})

    if (!person) {
        res.status(422).json({message: "Usuário não encontrado"})
        return
    }
    try {
        await Person.deleteOne({_id: id})

        res.status(200).json({message: "Usuário removido com sucesso"})
    } catch(error) {
        res.status(500).json({error: error})
    }

})

module.exports = router
