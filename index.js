'use strict';

function displayResults(userName, responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('.js-error-message').empty();
  $('.results').empty();

  $('.results').append(`<h2>${userName}'s repositories: </h2>
  <ul class="results-list"></ul>`)
  for (let i = 0; i < responseJson.length; i++){
    // for each repository in the array, add a list item with a link to it
    $('.results-list').append(
      `<li><h3><a href="${responseJson[i].html_url}">${responseJson[i].name}</a></h3>
      </li>`
    )};
  //display the results section  
  $('.results').removeClass('hidden');
};

function getRepos(userName, searchURL) {
  const params = {
    type: 'owner',
    sort: 'full_name',
    direction: 'asc'
  };
  const queryString = Object.keys(params)
  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join('&');
  const url = searchURL + userName + '/repos?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(userName, responseJson))
    .catch(err => {
      $('.js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('.js-form').submit(event => {
    event.preventDefault();
    const searchURL = 'https://api.github.com/users/';
    const userName = $('#js-search-term').val();
    getRepos(userName, searchURL);
  });
}

$(watchForm);