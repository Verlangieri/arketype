// Permet de retourner tous les posts sur le client
//Il a besoin pour fonctionner d'ajouter une ligne au main.js pour souscrire à la publication. Meteor.subscribe('posts');
Meteor.publish('posts', function() {
  return Posts.find();
});

Meteor.publish('objects', function() {
  return Objects.find();
});

Meteor.publish('postsBlog', function() {
  return PostsBlog.find();
});