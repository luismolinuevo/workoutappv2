'use strict';
const {Model} = require('sequelize');
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ workouts }) {
      this.hasMany(workouts, {
        onDelete: "cascade",
      });
    }

    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }
  user.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      validate: {
        notEmpty: true
      }
    },
    firstName: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    lastName: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    passwordHash: { type: DataTypes.STRING },
    password: {
      type: DataTypes.VIRTUAL,
      validate: {
        isLongEnough: (val) => {
          if (val.length < 7) {
            throw new Error("Please choose a longer password");
          }
        },
      },
    },
  },
  {
    sequelize,
    modelName: 'user',
  });

  user.beforeSave((user, options) => {
    if (user.password) {
      user.passwordHash = bcrypt.hashSync(user.password, 10);
    }
  });

  return user;
};