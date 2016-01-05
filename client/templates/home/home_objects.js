Template.home_objects.helpers({
  objects: function() {
    return Objects.find({}, {sort: {date: -1}, limit: 1});
  }
});