Template.postsList.helpers({
  posts: function() {
    return Posts.find();
  }
});

Template.postsList.rendered = function() {
    if(!this._rendered) {
      this._rendered = true;
      TweenMax.from($('.title-current'), 1,{autoAlpha: 0,marginLeft: '30px'});
      TweenMax.from($('.title-current span'), 0.8,{autoAlpha: 0,marginLeft: '30px', delay: 0.4});
      TweenMax.staggerFrom($('.posts-list'), 0.6,{autoAlpha: 0},0.2);
      function pagination(maxPost){
      	
	      var nombre = 1;
	      var page = 1;
	      $( ".posts-list" ).each(function( index ) {
	        nombre++;
	        $( this ).addClass( "page-"+page );
	        if (nombre > maxPost){
	        	nombre = 1;
	        	page++;
	        	//Ajout une page append
	        	//$( "" ).append( '<a href="#" class="select-page" data-page="'+page+'">'+page+'</a>'' );

	        }
	      });
      }
      pagination(1);
    }  
};