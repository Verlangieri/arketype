Template.home_news.helpers({
  posts: function() {
    return Posts.find({}, {sort: {DateTime: -1}, limit: 1});
  }
});