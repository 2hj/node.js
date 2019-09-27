module.exports = (sequelize , DataTypes) => (
  sequelize.define('japan', {
    j_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    j_place: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    j_explain: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    j_img: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    timestamps: false
  })
);