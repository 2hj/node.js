const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

//config.json 자료값 연결
const sequelize = new Sequelize(config.database, config.username, config.password, config,);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require('./user')(sequelize, Sequelize);
db.Member = require('./member')(sequelize, Sequelize);
db.Question = require('./question')(sequelize, Sequelize);
db.Answer = require('./answer')(sequelize, Sequelize);
db.Japan = require('./japan')(sequelize, Sequelize);

db.User.hasMany(db.Question, { foreignKey: 'q_user_id', sourceKey: 'u_id'});
db.Question.belongsTo(db.User, { foreignKey: 'q_user_id', targetKey: 'u_id'});

db.User.hasMany(db.Answer, { foreignKey: 'a_user_id', sourceKey: 'u_id'});
db.Answer.belongsTo(db.User, { foreignKey: 'a_user_id', targetKey: 'u_id'});

db.Question.hasMany(db.Answer, { foreignKey: 'a_target_id', sourceKey: 'q_id' });
db.Answer.belongsTo(db.Question, { foreignKey: 'a_target_id', targetKey: 'q_id'});

module.exports = db;