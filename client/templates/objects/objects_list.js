Template.objectsList.helpers({
  objects: function() {
    return Objects.find();
  }
});

Template.objectsList.rendered = function() {
    if(!this._rendered) {
      this._rendered = true;
      function animation(){
        TweenMax.from($('.title-current'), 1,{autoAlpha: 0,marginLeft: '30px'});
        TweenMax.from($('.title-current span'), 0.8,{autoAlpha: 0,marginLeft: '30px', delay: 0.4});
        TweenMax.staggerFrom($('.posts-list'), 0.6,{autoAlpha: 0},0.2);
      }

      function pagination(maxPost){	
	      var nombre = 1;
	      var page = 1;
	      $( ".posts-list" ).each(function( index ) { //Pour chaque article
          if (nombre == 1){
            $( "#pagination" ).append( '<a href="#" class="select-page" data-page="'+page+'">'+page+'</a>'); //Ajoute la nombre de page
          }
	        nombre++;
	        $( this ).addClass( "page-"+page );
	        if (nombre > maxPost){
            nombre = 1; // Reset
	        	page++; // Ajoute une page supplémentaire
	        }
	      });

        endStagger = true;
        function activeStagger(){
          endStagger = true;
          TweenMax.to($('#pagination a'), .5, {autoAlpha: 1, cursor:'pointer'});
        }
        $('.select-page').on('click', function(){
          if (endStagger == true){
            endStagger = false;
            TweenMax.to($('#pagination a'), .5, {autoAlpha: .5, cursor:'default'});
            var page = $(this).data('page');
            TweenMax.staggerTo($('.posts-list'), 0.6,{autoAlpha: 0,display:'none', onComplete: function(){
              TweenMax.set($('.page-'+page), {display:'block'});
              TweenMax.staggerTo($('.page-'+page), 0.6,{autoAlpha: 1,delay:2},0.2);
            }},-0.2);
            setTimeout(activeStagger, 2400)
          }
        })
        // On cache tous les articles
        // On Affiche les classes .page-1 et on leur rajoute une classe active

        // EVENT AU CLIC :
        //Au clic sur un un lien de pagination
        //On retire tous les actives
        //On cache tous les articles
        //Et l'on rajoute le active sur celui qui est cliqué (THIS);
        // Ou on rajoute une animation d'affichage
      }
      animation();
      pagination(8);
    }  
};