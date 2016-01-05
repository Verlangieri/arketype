Template.postPage.helpers({
  posts: function() {
    return Posts.find();
  }
});