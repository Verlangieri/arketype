Template.blogSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var blog = {
   		date: 'une date',
      	title: $(e.target).find('[name=title]').val(),
      	text: $(e.target).find('[name=text]').val()
    };

    blog._id = Blogs.insert(blog);
    Router.go('blogPage', blog);
  }
});