function subscribeObjects(){
	return Meteor.subscribe('objects');
}
function subscribePosts(){
	return Meteor.subscribe('posts');
}

Router.configure({
  layoutTemplate: 'layout', //indique le template mere
  loadingTemplate: 'loading', // indique la template d'attente
  notFoundTemplate: 'notFound', // Erreur si pas trouvé
  waitOn: function() {subscribePosts();subscribeObjects();}
});

//indique la template à utiliser pour l'url choisi
Router.route('/', {name: 'home'});
Router.route('/posts/', {name: 'postsList'});
Router.route('/posts/:_id', {
	name: 'postPage',
	data: function() { return Posts.findOne(this.params._id);}
});

Router.route('/objects/', {name: 'objectsList'});
Router.route('/objects/:_id', {
	name: 'objectPage',
	data: function() { return Objects.findOne(this.params._id);}
});


Router.onBeforeAction('dataNotFound', {only: 'postPage'}); //Retourne une erreur si Url mal saisie