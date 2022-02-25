import { DataTypes } from 'sequelize';
const instances = require('hapi-sequelizejs').instances;

module.exports.taskModel = function () {
    const Tasks = instances.dbs.todoDB.sequelize.define('tasks', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        createdAt: {
            type: DataTypes.DATE,
        },
        title: {
            type: DataTypes.STRING,
        },
        dueDate: {
            type: DataTypes.DATE,
        },
        completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        freezeTableName: true,
        tableName: 'tasks',
        timestamps: false
    });

    instances.dbs.todoDB.sequelize.sync()

    return Tasks
}
