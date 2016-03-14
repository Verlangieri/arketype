Template.sidebar.rendered = function() {
    if(!this._rendered) {
      this._rendered = true;

      //horloge
      function timer(){
        var compteurInterval = function(){
          var date = new Date();
          var h = date.getHours();
          var m = date.getMinutes();
          var rotate = m * 3;

          $('#clock-hour-text').empty();
          $('#clock-hour-text').append(h);
          TweenMax.to($("#clock-minute"), 1, {rotation:rotate, transformOrigin:"50% 50%",ease:Linear.easeNone});
        }
        Meteor.setInterval(compteurInterval,1000);
      }
      timer();

      //Pollution
      function indicePollution(){
        var selector = '.indicePollution';
        function getRandomIntInclusive(min, max) {
          return Math.floor(Math.random() * (max - min +1)) + min;
        }
        var compteurInterval = function(){
          $( selector).empty();
          $( selector+":eq(0)" ).append(getRandomIntInclusive(10, 15));
          $( selector+":eq(1)" ).append(getRandomIntInclusive(345, 370));
          $( selector+":eq(2)" ).append(getRandomIntInclusive(3, 5));
          $( selector+":eq(3)" ).append(getRandomIntInclusive(5, 25));
        }
        Meteor.setInterval(compteurInterval,5000); 
      }
      indicePollution();

      function linksAnimation(){

        $('.sidebar__blog').on('mouseenter', function(){
          TweenMax.to($('.sidebar__blog span'), 0.5, {autoAlpha: 0, right: '-20px'});
          TweenMax.set($('.sidebar__blog span'), {right: '-90px',delay: .51});
          TweenMax.to($('.sidebar__blog span'), 0.5, {autoAlpha: 1, right: '-55px', delay: .55});
        });

        /*$('.sidebar__geo').on('mouseenter', function(){
          TweenMax.to($('.sidebar__geo__link__geo'), 0.5, {autoAlpha: 0});
          TweenMax.set($('.sidebar__geo__link__geo'), {top: 20,delay: .51});
          TweenMax.to($('.sidebar__geo__link__geo'), 0.5, {autoAlpha: 1,top: 0,delay: .70});

          TweenMax.to($('.sidebar__geo__link__subtitle'), 0.5, {autoAlpha: 0,delay: .20});
          TweenMax.set($('.sidebar__geo__link__subtitle'), {right: 0,delay: .56});
          TweenMax.to($('.sidebar__geo__link__subtitle'), 0.5, {autoAlpha: 1,right: 15,delay: .80});

        });*/
      }
      linksAnimation();
    }
}