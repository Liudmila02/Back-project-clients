'use strict';
module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
    client: DataTypes.STRING,
    project: DataTypes.STRING,
    department: DataTypes.STRING,
    estimate: DataTypes.FLOAT,
    budget: DataTypes.FLOAT,
    start_date: DataTypes.DATE,
    user_id: DataTypes.INTEGER
  }, {});
  Client.associate = function(models) {
    Client.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
    Client.hasMany(models.History, {
      foreignKey: 'order_id',
      onDelete: 'CASCADE'
    });
  };
  return Client;
};

export default (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
    client: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter client'
      }
    },    
    project: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter project'
      },
    },
    department: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter department'
      },
    },
    estimate: {
      type: DataTypes.FLOAT,
      allowNull: {
        args: false,
        msg: 'Please enter estimate'
      },
    },
    budget: {
      type: DataTypes.FLOAT,
      allowNull: {
        args: false,
        msg: 'Please enter budget'
      },
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: {
        args: false,
        msg: 'Please enter start date'
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
        as: 'event_owner',
      }
    },
    order_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Client',
        key: 'id',
        as: 'event_owner',
      }
    }
  
  }, {});
  Client.associate = (models) => {
    Client.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE'
    });

    Client.hasMany(models.History, {
      foreignKey: 'order_id',
      onDelete: 'CASCADE',
    });
  };
  return Client;
};