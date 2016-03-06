Template.objectsList.helpers({
  objects: function() {
    return Objects.find();
  }
});

Template.objectsList.rendered = function() {
    if(!this._rendered) {
      this._rendered = true;
      TweenMax.from($('.title-current'), 1,{autoAlpha: 0,marginLeft: '30px'});
      TweenMax.from($('.title-current span'), 0.8,{autoAlpha: 0,marginLeft: '30px', delay: 0.4});
      TweenMax.staggerFrom($('.posts-list'), 0.6,{autoAlpha: 0},0.2);
    }
};