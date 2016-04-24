Template.home_news.helpers({
  posts: function() {
    return Posts.find({}, {sort: {timestamp : 1}, limit: 1});
  }
});