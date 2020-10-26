'use strict';
const bcrypt = require('bcrypt')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user.belongsToMany(models.plant, {through: "plantsUsers"})
    }

    //compares entered passwored to hash password (runs on login)
    validPassword(passwordTyped) {
      return bcrypt.compareSync(passwordTyped, this.password) //returns a boolean o see if password type into the form matches the hashed password in the databaed
    }

    //remove the hashed password from the user object (before serializing)
    toJSON() {
      let userData = this.get() //.get built into get hte user we are working with
      delete userData.password  //this removes the password so when we are passing around user info that the pw isnt a parto f that user object that gets passed between the backend and frontend..but does not remove it from the database
      return userData
    }
  };
  user.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Invalid email address'
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 99],
          msg: 'Name must be between 1 and 99 characters'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8, 99],
          msg: 'Password must be between 8 and 99 characters'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'user',
  });
//we're adding our hook, we are modifying the user before we save them to the database

user.beforeCreate( (pendingUser, options) => { // callback function: pending user is a variable that represents the user about to be saved to the database; options is a parameter we dont end up using but put it there just so that yo know it exists
  //if a user exists and if that user has a password
  if (pendingUser && pendingUser.password) { //comes from the form up there
    //hash the password with bcrypt
    let hash = bcrypt.hashSync(pendingUser.password, 12) //HASHING FUNCTION takes  pending user password string and then set number of hash rounds (12)
    //store the hash as the user's password
    pendingUser.password = hash 
  }
})
  return user;
};