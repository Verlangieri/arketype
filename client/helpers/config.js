// Permet de spécifier un nom d'utilisateur au lieu d'un email pour se connecter
Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
});
// Désactive les enregistrements
Accounts.config({
	forbidClientAccountCreation: true
});

// Pour afficher un extrait d'article
Handlebars.registerHelper('splitText', function(text) {
  // var t = text.split('.')[0] + '...'; Affiche la premire phrase
  var t = text.substr(0, 150) + "..."; // Affiche de 0 a 150 caracteres
  return t;
});

Handlebars.registerHelper('splitTextLong', function(text) {
  // var t = text.split('.')[0] + '...'; Affiche la premire phrase
  var t = text.substr(0, 300) + "..."; // Affiche de 0 a 150 caracteres
  return t;
});