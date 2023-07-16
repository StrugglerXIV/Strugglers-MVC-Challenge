// helpers.js
const Handlebars = require('handlebars');

// Register the 'formatDate' helper
Handlebars.registerHelper('formatDate', function (date) {
  return new Date(date).toLocaleString();
});

// Define the Handlebars helper
Handlebars.registerHelper('isCurrentUserPost', function(loggedInUser, postUser, options) {
  if (loggedInUser && postUser && loggedInUser.id === postUser.id) {
    return options.fn(this); // Render the content inside the block
  } else {
    return options.inverse(this); // Render the content inside the {{else}} block
  }
});



Handlebars.registerHelper('ifCond', function(v1, v2, options) {
  if (v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});




module.exports = { Handlebars };
