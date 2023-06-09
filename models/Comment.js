const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model { }

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        comment_content: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    },
    {
        sequelize,
        freezeTableName: true,
        modelName: 'comment',
    }
)

module.exports = Comment;