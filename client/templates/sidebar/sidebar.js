Template.sidebar.rendered = function() {
    if(!this._rendered) {
      this._rendered = true;
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
}