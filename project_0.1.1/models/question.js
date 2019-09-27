module.exports = (sequelize, DataTypes) => (
  sequelize.define('question', {
    q_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    q_user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    q_name: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    q_title: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    q_question: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    timestamps: true,
  })
);