module.exports = (sequelize, DataTypes) => (
  sequelize.define('user', {
    u_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    u_userId: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true
    },
    u_name: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    u_password: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    timestamps: true,
    paranoid: true
  })
);
/*
    timestamps
    - Sequelize는 테이블을 생성한 후 자동적으로 createdAt, updatedAt column을 생성한다.
    Database에 해당 테이블이 언제 생성되었고 가장 최근에 수정된 시간이 언제인지 추적할 수 있도록 해준다. 
    기능을 끄려면 false로 설정한다.
    paranoid
    - paranoid가 true이면 deletedAt column이 table에 추가된다.
    해당 row를 삭제시 실제로 데이터가 삭제되지 않고 deletedAt에 삭제된 날짜가 추가되며
    deletedAt에 날짜가 표기된 row는 find작업시 제외된다. 즉 데이터는 삭제되지 않지만 삭제된 효과를 준다.
    timestamps 옵션이 true여야만 사용할 수 있다.
*/