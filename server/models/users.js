
const users = (sequelize, DataTypes) => {
  const tbl = sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      required: true,
      length: 50,
    },
    role: {
      type: DataTypes.ENUM,
      values: ['user', 'admin', 'disabled']

    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }, {
      paranoid: true,
      underscored: true
    });
  return tbl;
};


// db.define('user', {
//   id: { type: Sequelize.UUID, primaryKey: true },
//   name: { type: Sequelize.STRING, length: 50, validate: { notNull: true } },
//   email: { type: Sequelize.STRING, unique: true, length: 50, validate: { isEmail: true, notNull: true } },
//   password: { type: Sequelize.STRING, validate: { notNull: true } }
// });

export default users;

