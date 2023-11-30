
const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3000

let mockCoworkings = require('./mock-coworking')
const coworkings = require('./mock-coworking')

app.use(express.json()) // inerprète le body de ma requète (req.json) en format json
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.send('Hello World !')
})

app.get('/api/coworkings', (req, res) => {
    // Afficher la phrase : Il y a ... coworkings dans la liste. 
    res.send(mockCoworkings)
})

app.get('/api/coworkings/:id', (req, res) => {
    let result = mockCoworkings.find(el => el.id === parseInt(req.params.id))

    if (!result) {
        result = `Aucun élément ne correspond à l'id n°${req.params.id}`
    }
    res.send(result)
})


app.post('/api/coworkings', (req, res) => {
    

      const newId = mockCoworkings[mockCoworkings.length - 1].id + 1



      // SPREAD OPERATOR
      let coworking = { id: newId, ...req.body } //Les parenthéses indiquent que c'est un objet id peut etre remplacé par un nom aléatoire choisi
      
      coworkings.push(coworking);  


      const result = {message : 'le coworking a bien été ajouté', data: coworking}

      
      res.send (result) 
})



app.put('/api/coworkings/:id', (req, res) => {
// La méthode find renvoie un clone de l'oblet, clone 
let coworking = mockCoworkings.find((el) => {
  return (
    el.id == parseInt(req.params.id)
  )
 })
  let result;
  if(coworking) {
    // coworking.superficy = req.body.superficy 
    const newCoworking = {...coworking, ...req.body} //Le tableau coworking est gardé et on y ajoute les  nouveaux objets de  req.body    
    // 
    const index = mockCoworkings.findIndex(el => el.id === parseInt(req.params.id))
    mockCoworkings[index] = newCoworking
    result = { message: 'Coworking modifié', data: newCoworking }
  } else {
    result ={message : "Coworking non modifié"}
  }
res.json(result)  
})

app.delete('/api/coworkings/:id', (req, res) => {
  const coworking = mockCoworkings.find((el) => {
    return (
      el.id == parseInt(req.params.id)
    )
   })  
   let result;
   if(coworking) {
    mockCoworkings = mockCoworkings.filter(el => el.id !== coworking.id)
     result = {message : 'Le delete fonctionne correctement, corworking supprimer ...',  data: coworking}
   } else {
     result = {message : 'ça a merdé ...'}
   }
  res.send (result)
 })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})