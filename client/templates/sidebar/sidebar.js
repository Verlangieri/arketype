Template.sidebar.helpers({
  hour: function() {
  	date = new Date;
	h = date.getHours();
	m = date.getMinutes();
	//salut = setInterval(afficher,1000);
	return h;
  }
});