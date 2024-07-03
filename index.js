//Configuração especial

const express = require('express')
const app = express()

//Ler json / middleware
app.use(
    express.urlencoded({
        extendend: true,
    }),
)
app.use(express.json())

//Rota inicial /endpoint
app.get('/', (req, res) => {

    //Mostrar req

    res.json({ message: 'Olá mundo'})

})

//Entregar uma porta 
app.listen(3000)