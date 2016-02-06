Template.layout.events = {
  'click': function (event) {
    //VARIABLES
    var url;
    var modal = $("#modal");
    var innerModal = $("#inner-modal");
    var blurElement = {a:0};
    var link = $(event.target).parent().parent();

    /* OUVERTURE BOITE MODAL */
    if (link.attr('class') == "modal-link"){
      console.log($(event.target));
      $('#inner-modal').empty(); // vide l'intérieur de la div
      var url = link.data('video'); // recupere l'attribut data
      $('#inner-modal').append('<iframe id="loadedFrame" width="560" height="315" src="'+url+'" frameborder="0" allowfullscreen></iframe>') //l'insere dans la div inner modal
      
      document.getElementById('loadedFrame').onload = function() { // Lorsque mon iframe est chargée
        function applyBlur() {
          TweenMax.set($(".wrapper"), {webkitFilter:"blur(" + blurElement.a + "px)",filter:"blur(" + blurElement.a + "px)"});
        };
        TweenMax.set(modal, {display:'block',delay:0.5});
        TweenMax.set(innerModal, {autoAlpha: 0, scale: 0});
        TweenMax.to(blurElement, 0.5, {a:6, onUpdate:applyBlur}); // 0.3s for 6px blur
        TweenMax.to(innerModal, 0.5, {autoAlpha: 1, scale: 1, ease: Power1.easeOut, delay:0.4});
      };
    }
    
    /* FERMETURE BOITE MODAL */
    if(event.target.id == "outer-modal"){
      blurElement = {a:6};

      function removeBlur() {
        TweenMax.set($(".wrapper"), {webkitFilter:"blur(" + blurElement.a + "px)",filter:"blur(" + blurElement.a + "px)"});
      };
      TweenMax.to(innerModal, 0.5, {autoAlpha: 0, ease: Power1.easeOut});
      TweenMax.to(blurElement, 0.5, {a:0, onUpdate:removeBlur, onComplete:function(){
        TweenMax.set(modal, {display:'none'});
        TweenMax.set(innerModal, {scale: 0});
        $('#inner-modal').empty();
      }});
    }



    function menuPostExtraAnimation(){
      //VARIABLES
        var target    = $(event.target);
        var link    = "menu__extra__link";
        var linkPath  = $("."+link)
        var content   = "menu__extra__content";
        var contentPath = $("."+content)
        var data;
        var dataType  = "menu";

        /* SI BOUTON CLICK */
          if(target.attr('class') == link && target.attr('class') != "active"){
          data = target.data(dataType); // recupere l'attribut data

          if(data != "articles"){
              TweenMax.staggerTo($('.content__posts__menu__list'), 0.3,{autoAlpha: 0},-0.2);
          }
          if(data != "holo"){
              TweenMax.staggerTo($('.content__posts__carac li'), 0.2,{autoAlpha: 0,marginTop: '-5px'},-0.1);
          }

          TweenMax.to(contentPath, 0.7, {left: '-100%', ease: Power1.easeOut, delay: 0.7, onComplete:function(){
            // Attribue la bonne hauteur pour chaque bloque
            if(data == "articles"){TweenMax.set($('.content__posts__menu__posts'), {height: '245px'})}
            if(data == "holo"){TweenMax.set($('.content__posts__menu__posts'), {height: '360px'})}
            TweenMax.set($('.content__posts__carac li'), {autoAlpha: 0,marginTop: '-5px'});
          }});
          //Affiche le bloque
          TweenMax.to($("#"+content+"--"+data), 0.8, {left: '0', ease: Power1.easeIn, delay: 2});

          //Affiche un par un
          if(data == "articles"){
              TweenMax.staggerTo($('.content__posts__menu__list'), 0.3,{autoAlpha: 1,delay: 2.4},0.2);
          }
          if(data == "holo"){
              TweenMax.staggerTo($('.content__posts__carac li'), 0.2,{autoAlpha: 1,marginTop: '0',delay: 2.4},0.1);
          }
          /* AJOUTE OU RETIRE LE ACTIVE */
          linkPath.removeClass('active');
          target.addClass('active')
        }
    }
    menuPostExtraAnimation();
    // function backgroundAnimation(){
    //   random = Math.floor((Math.random()*20)+(-10));
    //   TweenMax.to($('#grid-background'), 2,{top: random});
    //   TweenMax.to($('#grid-background'), 2,{left: random});
    //   setTimeout(backgroundAnimation,2000);
    // }
    // backgroundAnimation();
  }
}