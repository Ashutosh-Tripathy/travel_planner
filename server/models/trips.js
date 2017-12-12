
const trip = (sequelize, DataTypes) => {
  const tbl = sequelize.define('trip', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    destination: {
      type: DataTypes.STRING,
      required: true,
      length: 50,
    },
    startdate: {
      type: DataTypes.DATE,
      required: true,
    },
    enddate: {
      type: DataTypes.DATE,
      required: true,
    },
    destination: {
      type: DataTypes.STRING,
      required: true,
      length: 500,
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

// const tripModel = db.define('trip', {
//   id: { type: Sequelize.UUID, primaryKey: true },
//   destination: { type: Sequelize.STRING, length: 50, validate: { notNull: true } },
//   startdate: { type: Sequelize.DATE, validate: { notNull: true } },
//   enddate: { type: Sequelize.DATE, validate: { notNull: true } },
//   comment: { type: Sequelize.STRING, length: 50, validate: { notNull: true } },
// });

export default trip;

