Posts = new Mongo.Collection('posts');

Posts.allow({
  insert: function(userId, doc) {return !! userId;}, // autoriser l'insertion des posts seulement si l'utilisateur est authentifié
  update: function(userId, post) {return !! userId;},
  remove: function(userId, post) {return !! userId;}
 });