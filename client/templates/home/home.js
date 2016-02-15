Template.home.rendered = function() {
    if(!this._rendered) {
      this._rendered = true;
      console.log('Template onLoad');
      TweenMax.from($('.title-current'), 1,{autoAlpha: 0,marginLeft: '30px'});
      TweenMax.from($('.title-current span'), 0.8,{autoAlpha: 0,marginLeft: '30px', delay: 0.4});
      TweenMax.from($('.content__module__resume'), 0.8,{autoAlpha: 0, delay: 0.1});
      TweenMax.from($('.content__movie'), 1,{autoAlpha: 0,marginTop: '30px', delay: 0.3});
      TweenMax.staggerFrom($('.content__movie__thumb'), 0.6,{autoAlpha: 0, delay: 0.5},0.2);
      TweenMax.staggerFrom($('.content__module__news'), 1,{autoAlpha: 0,marginTop: '30px', delay: 0.5},0.2);
    }
};