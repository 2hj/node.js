module.exports = (sequelize , DataTypes) => (
  sequelize.define('member', {
    m_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    m_name: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true
    },
    m_num: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    m_img: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    m_comm: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    m_res: {
      type: DataTypes.STRING(40),
      allowNull: false
    }
  }, {
    timestamps: false
  })
);