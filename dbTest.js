const db = require('./models')

db.user.findOrCreate({
  // constraint
  where: {
    name: 'Rizzok',
  }
}).then(function([returnedUser, created]) {
  db.plant.findOrCreate({
    where: { 
      apiId: 12,
      name: "misc",
      scientificName: "",
      lastWatered: "",
      pictureUrl: "",
    }
  }).then(function([plant, created]) {
    returnedUser.addPlant(plant).then( function(relationInfo) {
      console.log(relationInfo)
      console.log('-----------------------------')
      console.log(`${category.name} added to ${returnedProject.name}`)
    })
  })
})