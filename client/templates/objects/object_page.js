Template.objectPage.helpers({
  objects: function() {
    return Objects.find();
  }
});

Template.objectPage.rendered = function() {
    if(!this._rendered) {
      this._rendered = true;
      console.log('Template onLoad');
      TweenMax.from($('.title-current'), 1,{autoAlpha: 0,marginLeft: '30px'});
      TweenMax.from($('.title-current span'), 0.8,{autoAlpha: 0,marginLeft: '30px', delay: 0.4});
      TweenMax.from($('.content__posts'), 0.8,{autoAlpha: 0, marginTop: '40px'});
      TweenMax.from($('.content__posts__menuu'), 0.8,{autoAlpha: 0, marginTop: '40px',delay: 0.2});
      //TweenMax.from($('.menu__extra__link'), 0.3,{marginTop: '10px', delay: 1.4},0.2);
      TweenMax.from($('#menu__extra__content--articles'), 0.8, {left: '-100%', delay: 0.7});
      TweenMax.staggerFrom($('.content__posts__menu__list'), 0.6,{autoAlpha: 0, delay: 1.2},0.2);
    }
};