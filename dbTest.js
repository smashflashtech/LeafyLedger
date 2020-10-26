const db = require('./models')

db.user.findOrCreate({
  // constraint
  where: {
    name: 'Rizzok',
  }
}).then(function([returnedUser, created]) {
  db.plant.findOrCreate({
    where: { 
      apiId: parsed('678281'),
      name: "Evergreen oak",
      scientificName: "Quercus rotundifolia",
      lastWatered: "",
      pictureUrl: "https://bs.floristic.org/image/o/1a03948baf0300da25558c2448f086d39b41ca30",
    }
  }).then(function([plant, created]) {
    returnedUser.addPlant(plant).then( function(relationInfo) {
      console.log(relationInfo)
      console.log('-----------------------------')
      console.log(`${category.name} added to ${returnedProject.name}`)
    })
  })
})