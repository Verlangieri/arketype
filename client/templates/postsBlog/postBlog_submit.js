Template.postBlogSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    //Fonction si la date n'est pas renseigné
    var datePost = $(e.target).find('[name=date]').val()
    if (datePost == ""){
      datePost = new Date();
      var options = {year: "numeric", month: "short", day: "numeric"};
      datePost = datePost.toLocaleDateString("fr-FR", options);
    }

    //Remplace les espaces
    var postText = $('textarea[name="text"]').val();
        postText = postText.replace(/\r?\n/g, '<br />');
    
    var postBlog = {
      date: datePost,
      title: $(e.target).find('[name=title]').val(),
      text: postText,
      image1: $(e.target).find('[name=image1]').val(),
      image2: $(e.target).find('[name=image2]').val(),
      image3: $(e.target).find('[name=image3]').val(),
      image4: $(e.target).find('[name=image4]').val()
    };

    postBlog._id = PostsBlog.insert(postBlog);
    Router.go('postBlogPage', postBlog);
  }
});

