// helpers.js
const Handlebars = require('handlebars');

// Register the 'formatDate' helper
Handlebars.registerHelper('formatDate', function (date) {
  return new Date(date).toLocaleString();
});

// Define the Handlebars helper
Handlebars.registerHelper('isCurrentUserPostOwner', function(postUserId, loggedInUserId, options) {
  if (postUserId && loggedInUserId && postUserId.toString() === loggedInUserId.toString()) {
    return options.fn(this); // Render the content inside the block
  }
  return ''; // Return an empty string if the condition is not met
});




Handlebars.registerHelper('ifCond', function (v1, v2, options) {
  if (v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

module.exports = { Handlebars };
