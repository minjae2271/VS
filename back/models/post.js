module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      postType: { //대분류 : 밸런스, 수치입력, 랜덤...
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      postSubject: { //중분류 : 호불호, ox...
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      postCategory: { //소분류 : 유머, 진지 ..
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      content1: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      content2: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      content3: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      condition: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      condition1: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      condition2: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      condition3: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      view_cnt: {
        type: DataTypes.INTEGER,
      }
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  Post.associate = (db) => {
    db.Post.belongsTo(db.User);
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    db.Post.hasMany(db.Pick);
    db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag"});
  };
  return Post;
};
