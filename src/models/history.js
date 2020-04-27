'use strict';
module.exports = (sequelize, DataTypes) => {
  const History = sequelize.define('History', {
    date: DataTypes.DATE,
    action: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER
  }, {});
  History.associate = function(models) {
    History.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
    History.belongsTo(models.Client, {
      foreignKey: 'order_id',
    });
  };
  return History;
};
export default (sequelize, DataTypes) => {
  const History = sequelize.define('History', {
    date: {
      type: DataTypes.DATE,
      allowNull: {
        args: false,
        msg: 'Please enter date'
      }
    },    
    action: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter action'
      },
    },
    order_id: {
      type: DataTypes.INTEGER,
        references: {
          model: 'Client',
          key: 'id'
        }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
        as: 'event_owner',
      }
    }
  
  }, {});
  History.associate = (models) => {
   History.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
    
    History.belongsTo(models.Client, {
      foreignKey: 'order_id',
    });
  };
  return History;
};