// PROTECTION
var requireLogin = function() {
    if (! Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            this.render('accessDenied');
        }
    } else {
        this.next();
    }
}

function subscribeObjects(){
	return Meteor.subscribe('objects');
}
function subscribePosts(){
	return Meteor.subscribe('posts');
}
function subscribePostsBlog(){
	return Meteor.subscribe('postsBlog');
}

function animation (){
$('.header').animate({left: "-1000px", scrollTop: 0}, 400);
}

Router.configure({
  layoutTemplate: 'layout', //indique le template mere
  loadingTemplate: 'loading', // indique la template d'attente
  notFoundTemplate: 'notFound', // Erreur si page pas trouvé
  waitOn: function() {subscribePosts();subscribeObjects();},
});

//Router.onAfterAction(function(){TweenMax.from($('.content'), 1,{autoAlpha: 0});this.next()});

//indique la template à utiliser pour l'url choisi
Router.route('/', {
  name: 'home',
  load: function() {animation();this.next();} // au chargement de de la page d'accueil
});

Router.route('/posts/', {name: 'postsList'});
Router.route('/posts/:_id', {
	name: 'postPage',
	data: function() { return Posts.findOne(this.params._id);},
  //load: function(){} // n'est pris en compte qu'au bout du deuxieme rafraichissement
});

Router.route('/objects/', {name: 'objectsList'});
Router.route('/objects/:_id', {
	name: 'objectPage',
	data: function() { return Objects.findOne(this.params._id);}
});

Router.route('/blog/', {name: 'postsBlogList', waitOn: function() {subscribePostsBlog();}});
Router.route('/blog/:_id', {
	name: 'postBlogPage',
	data: function() { return PostsBlog.findOne(this.params._id);},
	waitOn: function() {subscribePostsBlog();}
});
Router.route('/blogSubmit', {name: 'postBlogSubmit'}); // Poster un post
Router.route('/blog/:_id/edit', { //Editer un post
  name: 'postBlogEdit',
  data: function() { return PostsBlog.findOne(this.params._id);},
  waitOn: function() {subscribePostsBlog();}
});

Router.onBeforeAction('dataNotFound', {only: 'postPage'}); //Retourne une erreur si Url mal saisie
Router.onBeforeAction('dataNotFound', {only: 'postBlogPage'});
Router.onBeforeAction('dataNotFound', {only: 'objectPage'});

Router.onBeforeAction(requireLogin, {only: 'postBlogSubmit'}); //Access seulement au utilisateur identifié
Router.onBeforeAction(requireLogin, {only: 'postBlogEdit'});