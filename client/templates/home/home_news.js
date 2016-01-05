Template.home_news.helpers({
  posts: function() {
    return Posts.find({}, {sort: {date: -1}, limit: 1});
  }
});