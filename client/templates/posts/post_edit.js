Template.postEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentPostId = this._id;

    //Fonction si la date n'est pas renseigné
    var datePost = $(e.target).find('[name=date]').val()
    if (datePost == ""){
      datePost = new Date();
      var options = {year: "numeric", month: "short", day: "numeric"};
      datePost = datePost.toLocaleDateString("fr-FR", options);
    }

    var postArticle = {
      date: datePost,
      title: $(e.target).find('[name=title]').val(),
      text: $(e.target).find('[name=text]').val()
    };

    Posts.update(currentPostId, function(error) {
      if (error) {
        // affiche l'erreur à l'utilisateur
        console.log(error.reason);
      } else {
        Router.go('postPage', {_id: currentPostId});
      }
    });
  },
  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this post?")) {
      var currentPostId = this._id;
      Posts.remove(currentPostId);
      Router.go('postsList');
    }
  }
});
