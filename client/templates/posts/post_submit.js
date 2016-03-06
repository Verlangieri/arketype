Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

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
      text: $(e.target).find('[name=text]').val(),
      image1: $(e.target).find('[name=image1]').val(),
      image2: $(e.target).find('[name=image2]').val(),
      image3: $(e.target).find('[name=image3]').val(),
      image4: $(e.target).find('[name=image4]').val()
    };

    postArticle._id = Posts.insert(postArticle);
    Router.go('postPage', postArticle);
  }
});

