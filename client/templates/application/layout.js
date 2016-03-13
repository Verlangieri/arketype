Template.layout.events = {
  'click': function (event) {
    //VARIABLES
    var url, img;
    var modal = $("#modal");
    var innerModal = $("#inner-modal");
    var blurElement = {a:0};
    var link = $(event.target)

    /* OUVERTURE BOITE MODAL */
    if (link.attr('class') == "modal-link"){
      if (link.data('image') || link.data('video')){ //Si il y'a du contenu dans le data
      //console.log($(event.target));
      innerModal .empty(); // vide l'intérieur de la div
      var urlVideo = link.data('video'); // recupere l'attribut data
      var urlImage = link.data('image'); // recupere l'attribut data

      function resizeModal(){
        $(window).resize(function() {
            TweenMax.set($("#inner-modal"), {width: $('#loadedFrame').width(), height: $('#loadedFrame').height()});
        });
      }

      if (urlVideo){     
        innerModal.append('<span id="inner-modal-close">Fermer</span><iframe id="loadedFrame" width="560" height="315" src="'+urlVideo+'" frameborder="0" allowfullscreen></iframe>') //l'insere dans la div inner modal
        TweenMax.set(innerModal, {width: $('#loadedFrame').width(), height: $('#loadedFrame').height()});
        resizeModal();
      }
      if (urlImage){
        img = new Image();
        img.src = ''+ urlImage +'';
        img.onload = function() {
          TweenMax.to($("#loaderModal"), 0.5, {autoAlpha:0,delay:0.5});
          TweenMax.set(innerModal, {width: this.width, height: this.height});
          resizeModal();
        }
        innerModal.append('<span id="inner-modal-close">Fermer</span><img id="loadedFrame" src="'+urlImage+'">') //l'insere dans la div inner modal
      }

        // Lorsque mon iframe est chargée
        function applyBlur() {
          TweenMax.set($(".wrapper"), {webkitFilter:"blur(" + blurElement.a + "px)",filter:"blur(" + blurElement.a + "px)"});
        };
        TweenMax.set(modal, {display:'block',delay:0.5});
        TweenMax.set(innerModal, {autoAlpha: 0, scale: 0});
        TweenMax.to(blurElement, 0.5, {a:6, onUpdate:applyBlur}); // 0.3s for 6px blur
        TweenMax.to($("#loaderModal"), 0.5, {autoAlpha:1, delay:0.5});
        document.getElementById('loadedFrame').onload = function() {
          //$("#loaderModal").remove();
          TweenMax.to(innerModal, 0.5, {autoAlpha: 1, scale: 1, ease: Power1.easeOut, delay:1});
          TweenMax.to($("#loaderModal"), 0.5, {autoAlpha:0, delay:0.3});
        };
      }
    }
    
    /* FERMETURE BOITE MODAL */
    if(event.target.id == "outer-modal" || event.target.id == "inner-modal-close"){
      blurElement = {a:6};

      function removeBlur() {
        TweenMax.set($(".wrapper"), {webkitFilter:"blur(" + blurElement.a + "px)",filter:"blur(" + blurElement.a + "px)"});
      };
      TweenMax.set($("#loaderModal"), {autoAlpha:0});
      TweenMax.to(innerModal, 0.5, {autoAlpha: 0, ease: Power1.easeOut});
      TweenMax.to(blurElement, 0.5, {a:0, onUpdate:removeBlur, onComplete:function(){
        TweenMax.set(modal, {display:'none'});
        TweenMax.set(innerModal, {scale: 0});
        $('#inner-modal').empty();
      }});
    }



    function menuPostExtraAnimation(){
        //VARIABLES
        var target      = $(event.target);
        var link        = "menu__extra__link";
        var linkPath    = $("."+link)
        var content     = "menu__extra__content";
        var contentPath = $("."+content)
        var data;
        var dataType    = "menu";
        var daeFileName;

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
            if(data == "holo"){TweenMax.set($('.content__posts__menu__posts'), {height: '325px'})}
            TweenMax.set($('.content__posts__carac li'), {autoAlpha: 0,marginTop: '-5px'});
          }});
          //Affiche le bloque
          TweenMax.to($("#"+content+"--"+data), 0.8, {left: '0', ease: Power1.easeIn, delay: 2});

          //Affiche un par un
          if(data == "articles"){
              TweenMax.staggerTo($('.content__posts__menu__list'), 0.3,{autoAlpha: 1,delay: 2.4},0.2);
          }
          if(data == "holo"){
              $('#holo-webGL').empty();
              daeFileName = $('#holo-webGL').data("holo");
              holoWebGL('holo-webGL');
              TweenMax.staggerTo($('.content__posts__carac li'), 0.2,{autoAlpha: 1,marginTop: '0',delay: 2.4},0.1);
          }
          /* AJOUTE OU RETIRE LE ACTIVE */
          linkPath.removeClass('active');
          target.addClass('active')
        }
    }
    menuPostExtraAnimation();

    //content__posts__holo__viewer
    function holoWebGL(parent){
      /*----Initialisation
      ----------------------------------------------*/
      /* Variables globales */
      var renderer, scene, camera, stats, dae, clock, collada, dae;
      var lunchAnimation = false;
      var container = document.getElementById(parent);
      var jContainer = $('#'+parent)
      /* Lancement des fonctions */
      initSetup(); // Execute les parametres de Three.js
      initLights(); // Execute les lumieres
      initObjects(); // Execute les differents objets de la scene
      render();

      /*----initSetup
      ---------------------------------*/
      function initSetup(){

        /* Three */
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize( jContainer.width(), jContainer.height());
        container.appendChild( renderer.domElement );
        
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera( 45, jContainer.width() / jContainer.height(), 0.1, 1000 );
        camera.position.z = 5; // Distance du centre de la scene

        controls = new THREE.OrbitControls(camera,renderer.domElement);
        
      }

      function initLights(){
        var ambientLight = new THREE.AmbientLight(0x2f2f2f);
        scene.add(ambientLight);

        var pointLight = new THREE.PointLight(0xffffff,1);
        pointLight.position.set(100, 600, 300);
        scene.add(pointLight);

        var pointLight2 = new THREE.PointLight(0xffffff,0.5);
        pointLight2.position.set(100, -600, 300);
        scene.add(pointLight2);
      }

      var cube
      function initObjects(){
        function initCube(){
          var geometry = new THREE.CubeGeometry( 1, 1, 1 );
          var material = new THREE.MeshPhongMaterial( {color: 0x00ff00} );
          cube = new THREE.Mesh( geometry, material );
          scene.add( cube );
        }
        initDAE();
        function initDAE(){
          var loader = new THREE.ColladaLoader();
          loader.options.convertUpAxis = true;
          loader.load('objectsModel/boule.DAE', function ( collada ) {
              collada.scene.castShadow = true;
              collada.scene.receiveShadow = true;
              dae = collada.scene;
              dae.updateMatrix();
              scene.add( dae );
          })
        }
      }
      
      /*----Animations
      ---------------------------------*/
      function animate(){
        //cube.rotation.y += 0.01;
      }
      /*----Tools
      ---------------------------------*/
      /* Resize le render au redimensionnement de la fenetre*/
      function onWindowResize(){
          camera.aspect = jContainer.width() / jContainer.height();
          camera.updateProjectionMatrix();
          renderer.setSize( jContainer.width(), jContainer.height() );
      }
      window.addEventListener( 'resize', onWindowResize, false );

      /*----Render
      ---------------------------------*/
      function render() {
        animate();
        requestAnimationFrame( render );
        renderer.render( scene, camera );
      }
    }
  }
}

Template.layout.rendered = function() {
    if(!this._rendered) {
      this._rendered = true;

          function loadingAnimation(){
            var compteur = 70;       
            var compteurInterval = function(){

            if (compteur < 101){
              $('#message-compteur').empty().append(compteur+"%");
                compteur++;
              } else {
                clearInterval(compteurInterval);
              }
            }
            Meteor.setInterval(compteurInterval,100);

          TweenMax.set($('.wrapper'), {autoAlpha: 1});
          TweenMax.set($('.header'), {scale: 1.3});
          TweenMax.from($("#loading-message"), 0.8, {autoAlpha:0, ease: Power1.easeIn, delay: 0.5});
          TweenMax.from($("#loading-header"), 1.3, {width: '0','padding-left': '190px', ease: Power1.easeIn, delay: 0.5});
          TweenMax.to($(".container__logo-subtitle-middle"), 2.3, {width: '230px', ease: Power3.easeIn, delay: 1.4,});
          TweenMax.from($(".logo-title"), 1, {marginTop: '50px',autoAlpha: 0, ease: Power1.easeOut, delay: 2});
          TweenMax.from($(".logo-subtitle"), 1, {autoAlpha: 0, ease: Power1.easeOut, delay: 2.5});
          TweenMax.to($("#loading-message"), 0.5, {autoAlpha:0, marginTop: '25px', delay: 3.5});
          TweenMax.to($(".header"), 1, {autoAlpha: 0, ease: Power1.easeOut, delay: 4, onComplete:function(){
            $('#loading-header').removeAttr('id');
            TweenMax.set($('.header'), {autoAlpha: 1,width: '100%',scale: 1});
            TweenMax.from($(".header"), 1, {autoAlpha: 0,top: '-25px',ease: Power1.easeOut, delay: 0.3});
            TweenMax.set($(".container__logo-subtitle-middle"),{width: '30px'});
          }});
          TweenMax.to($("#loading-page"), 0.5, {autoAlpha: 0, ease: Power1.easeIn, delay: 5});
          TweenMax.from($(".wrapper-responsive"), 0.5, {autoAlpha: 0, ease: Power1.easeIn, delay: 5});
        }
        loadingAnimation();
    }
};