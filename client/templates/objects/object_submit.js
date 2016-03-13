Template.objectSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    //Fonction si la date n'est pas renseigné
    var datePost = $(e.target).find('[name=date]').val();
    if (datePost == ""){
      datePost = new Date();
      var options = {year: "numeric", month: "short", day: "numeric"};
      datePost = datePost.toLocaleDateString("fr-FR", options);
    }

    //Si aucune image
    var image1 = $(e.target).find('[name=image1]').val();
    var image2 = $(e.target).find('[name=image2]').val();
    var image3 = $(e.target).find('[name=image3]').val();
    var image4 = $(e.target).find('[name=image4]').val();
  

          //Si aucune image
      // $( ".modal-link" ).each(function() {
      //   if (!$( this ).data('image'))
      //   $( this ).addClass('empty-modal');
      //   TweenMax.to($('.empty-modal'), 0.8, {autoAlpha: .2, delay: 0.7});
      // });

      // function verificateImageOpacityModal(){
      //   $(".modal-link" ).each(function() {
      //     if (!$( this ).data('image')) {
      //       $( this ).addClass('empty-modal');
      //       TweenMax.to($('.empty-modal'), 0.8, {autoAlpha: 0.5, delay: 0.7});
      //       console.log('pas contenu')
      //     } else {
      //       TweenMax.to($('.empty-modal'), 0.8, {autoAlpha: 1, delay: 0.7});
      //       console.log('contenu')
      //     }
      //   });
      // }


   
    var postObject = {
      date: datePost,
      title: $(e.target).find('[name=title]').val(),
      text: $(e.target).find('[name=text]').val(),
      objectUrlName: $(e.target).find('[name=objectUrlName]').val(),
      objectID: $(e.target).find('[name=objectID]').val(),
      name: $(e.target).find('[name=name]').val(),
      height: $(e.target).find('[name=height]').val(),
      width: $(e.target).find('[name=width]').val(),
      weight: $(e.target).find('[name=weight]').val(),
      image1: $(e.target).find('[name=image1]').val(),
      image2: $(e.target).find('[name=image2]').val(),
      image3: $(e.target).find('[name=image3]').val(),
      image4: $(e.target).find('[name=image4]').val()
    };

    postObject._id = Objects.insert(postObject);
    Router.go('objectPage', postObject);
  }
});