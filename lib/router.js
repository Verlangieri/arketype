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

Router.configure({
  layoutTemplate: 'layout', //indique le template mere
  loadingTemplate: 'loading', // indique la template d'attente
  notFoundTemplate: 'notFound', // Erreur si page pas trouvé
  waitOn: function() {subscribePosts();subscribeObjects();}
});
//Router.onAfterAction(function(){TweenMax.from($('.content'), 1,{autoAlpha: 0});this.next()});

//indique la template à utiliser pour l'url choisi
Router.route('/', {
  name: 'home',
});

Router.route('/login', {
  name: 'login',
});

Router.route('/vos-questions', {
  name: 'vosQuestions',
});

//-------------------------------------------------------//

Router.route('/posts/', {name: 'postsList'});
Router.route('/posts/:_id', {
	name: 'postPage',
	data: function() { return Posts.findOne(this.params._id);},
  waitOn: function() {subscribePosts();},
  onAfterAction: function(){TweenMax.set($('#transition-module'), {autoAlpha: 0});},
  onBeforeAction: function(){
    this.next();
    TransitionPostList('#transition-module','.content__posts__menu__list');
  }
      //load: function(){} // n'est pris en compte qu'au bout du deuxieme rafraichissement

});

Router.route('/postSubmit', {name: 'postSubmit'}); // Poster un post
Router.route('/posts/:_id/edit', { //Editer un post
  name: 'postEdit',
  data: function() { return Posts.findOne(this.params._id);},
  waitOn: function() {subscribePosts();}
});
//Router.onBeforeAction(function(){TweenMax.from($('.content'), 1,{autoAlpha: 0});this.next()});

//-------------------------------------------------------//

Router.route('/objects/', {name: 'objectsList'});
Router.route('/objects/:_id', {
	name: 'objectPage',
	data: function() { return Objects.findOne(this.params._id);},
  waitOn: function() {subscribeObjects();},
  onAfterAction: function(){TweenMax.set($('#transition-module'), {autoAlpha: 0});},
  onBeforeAction: function(){
    this.next();
    TransitionPostList('#transition-module','.content__posts__menu__list');
  }
});

Router.route('/objectSubmit', {name: 'objectSubmit'}); // Poster un post
Router.route('/objects/:_id/edit', { //Editer un post
  name: 'objectEdit',
  data: function() { return Objects.findOne(this.params._id);},
  waitOn: function() {subscribeObjects();}
});

//-------------------------------------------------------//

Router.route('/blog/', {name: 'postsBlogList', waitOn: function() {subscribePostsBlog();}});
Router.route('/blog/:_id', {
	name: 'postBlogPage',
	data: function() { return PostsBlog.findOne(this.params._id);},
	waitOn: function() {subscribePostsBlog();},
  onAfterAction: function(){TweenMax.set($('#transition-module'), {autoAlpha: 0});},
  onBeforeAction: function(){
    this.next();
    TransitionPostList('#transition-module','.content__posts__menu__list');
  }
});

Router.route('/blogSubmit', {name: 'postBlogSubmit'}); // Poster un post
Router.route('/blog/:_id/edit', { //Editer un post
  name: 'postBlogEdit',
  data: function() { return PostsBlog.findOne(this.params._id);},
  waitOn: function() {subscribePostsBlog();}
});

//-------------------------------------------------------//

Router.onBeforeAction('dataNotFound', {only: 'postPage'}); //Retourne une erreur si Url mal saisie
Router.onBeforeAction('dataNotFound', {only: 'postBlogPage'});
Router.onBeforeAction('dataNotFound', {only: 'objectPage'});

Router.onBeforeAction(requireLogin, {only: 'postBlogSubmit'}); //Access seulement au utilisateur identifié
Router.onBeforeAction(requireLogin, {only: 'postBlogEdit'});

Router.onBeforeAction(requireLogin, {only: 'postSubmit'}); //Access seulement au utilisateur identifié
Router.onBeforeAction(requireLogin, {only: 'postEdit'});

Router.onBeforeAction(requireLogin, {only: 'objectSubmit'}); //Access seulement au utilisateur identifié
Router.onBeforeAction(requireLogin, {only: 'objectEdit'});

/* --------------------------------- ROUTER FUNCTIONS
-------------*/

//Transition post list
function TransitionPostList(container, list){
  //#transition-module
  //.content__posts__menu__list
  TweenMax.to($(container), 0.5,{autoAlpha: 1, delay: 0.3, onStart:function(){
      //Ajoute le active dans la liste des articles
      var liUrl,
          li =  $(list),
          currentPage = window.location.pathname;

      li.each(function( index ) {
        liUrl = $( this ).find("a[href]").attr('href');
        if (liUrl == currentPage) {
          li.removeClass( "active" )
          $( this ).addClass( "active" );
        }
      });
  }});
}





