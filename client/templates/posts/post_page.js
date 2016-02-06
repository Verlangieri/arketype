Template.postPage.helpers({
  posts: function() {
    return Posts.find();
  }
});

Template.postPage.rendered = function() {
    if(!this._rendered) {
      this._rendered = true;
      console.log('Template onLoad');
      TweenMax.set($('.content__posts__menu__list'), {autoAlpha: 0});
      TweenMax.from($('.content__posts'), 0.8,{autoAlpha: 0, marginTop: '40px'});
      //TweenMax.from($('.menu__extra__link'), 0.3,{marginTop: '10px', delay: 1.4},0.2);
      TweenMax.from($('#menu__extra__content--articles'), 0.8, {left: '-100%', delay: 0.7});
      TweenMax.staggerTo($('.content__posts__menu__list'), 0.3,{autoAlpha: 1, delay: 1.4},0.2);
    }
};