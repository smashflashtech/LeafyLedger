'use strict';
const bcrypt = require('bcrypt')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      models.user.belongsToMany(models.plant, {through: "plantsUsers"})
    }

    validPassword(passwordTyped) {
      return bcrypt.compareSync(passwordTyped, this.password) 
    }

    toJSON() {
      let userData = this.get() 
      delete userData.password  
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

user.beforeCreate( (pendingUser, options) => { 
  if (pendingUser && pendingUser.password) { 
    let hash = bcrypt.hashSync(pendingUser.password, 12) 
    pendingUser.password = hash 
  }
})
  return user;
};