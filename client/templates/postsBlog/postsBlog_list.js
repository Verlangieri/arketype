Template.postsBlogList.helpers({
  postsBlog: function() {
    return PostsBlog.find();
  },
});

Template.postsBlogList.rendered = function() {
    if(!this._rendered) {
      this._rendered = true;
      TweenMax.from($('.title-current'), 1,{autoAlpha: 0,marginLeft: '30px'});
      TweenMax.from($('.title-current span'), 0.8,{autoAlpha: 0,marginLeft: '30px', delay: 0.4});
    }
};