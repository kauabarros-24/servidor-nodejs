

//Configuração especial


const express = require('express')
const { default: mongoose } = require('mongoose')
const app = express()
const db_user = 'Kaua'
const db_password = encodeURIComponent('Kaua!!24092007')

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
mongoose
.connect(
    `mongodb+srv://${db_user}:${db_password}@cluster0.3pfy0z8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
)
.then(() => {
    console.log('Conectamos ao MongoDB')
    app.listen(3000)
})
.catch((err) => console.log(err))
