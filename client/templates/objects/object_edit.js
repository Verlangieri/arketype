Template.objectEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentObjectId = this._id;

    //Fonction si la date n'est pas renseigné
    var datePost = $(e.target).find('[name=date]').val()
    if (datePost == ""){
      datePost = new Date();
      var options = {year: "numeric", month: "short", day: "numeric"};
      datePost = datePost.toLocaleDateString("fr-FR", options);
    }

    var postObject = {
      date: datePost,
      title: $(e.target).find('[name=title]').val(),
      text: $(e.target).find('[name=text]').val()
    };

    Objects.update(currentObjectId, function(error) {
      if (error) {
        // affiche l'erreur à l'utilisateur
        console.log(error.reason);
      } else {
        Router.go('objectPage', {_id: currentObjectId});
      }
    });
  },
  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this post ?")) {
      var currentObjectId = this._id;
      Objects.remove(currentObjectId);
      Router.go('objectsList');
    }
  }
});
