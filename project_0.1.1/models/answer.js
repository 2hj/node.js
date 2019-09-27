module.exports = (sequelize, DataTypes) => (
  sequelize.define('answer', {
    a_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    a_user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    a_name: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    a_answer: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    a_target_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    timestamps: true
  })
);