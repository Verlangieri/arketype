Template.objectSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    //Fonction si la date n'est pas renseigné
    var datePost = $(e.target).find('[name=date]').val();
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

    postObject._id = Objects.insert(postObject);
    Router.go('objectPage', postObject);
  }
});

