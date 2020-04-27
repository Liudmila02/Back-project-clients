'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Client, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE'
    });
    User.hasMany(models.History, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE'
    });
  };
  return User;
};

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: sequelize.literal('uuid_generate_v4()'),
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your name'
      }
    },    
    email: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your email address'
      },
      unique: {
        args: true,
        msg: 'Email already exists'
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Please enter a valid email address'
        },
      },
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter a password'
      },
      validate: {
        isNotShort: (value) => {
          if (value.length < 8) {
            throw new Error('Password should be at least 8 characters');
          }
        },
      },
    },
  }, {});
  User.associate = (models) => {
    // associations can be defined here
    User.hasMany(models.Client, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE'
    });
    User.hasMany(models.History, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE'
    });
  };
  return User;
};