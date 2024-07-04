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