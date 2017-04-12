(function() {
  var data = [];
  var baseURL = "http://www.mattbowytz.com/simple_api.json";
  var getList = [baseURL.concat("?data=programming"), baseURL.concat("?data=comics"), baseURL.concat("?data=interests")];
  var wordList = [];
  var flexsearchresults = document.getElementById("flexsearch-results");
  var ul = document.createElement('ul');
  flexsearchresults.appendChild(ul);
  flexsearchresults.removeAttribute("id");

  for(var i = 0; i < 3; i++) {
    var req = new XMLHttpRequest();
    req.open('GET', getList[i], true);

    // do parsing and stuff
    req.onreadystatechange = function() {
      if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        try {
          data[i] = JSON.parse(this.responseText);
          for(var key in data[i].data) {
            wordList.push(data[i].data[key]);
          }
        }
        catch (e) {
          alert(e);
        }
      }
    }
    req.send();
  }

  var searchInput = document.querySelector("input.flexsearch-input");
  searchInput.addEventListener('keyup', function(e) {
    var keyPressed = e.which || e.keyCode; // if e.keyCode does not work. also the || operator is weird

    // dynamically apply styles
    if(searchInput.value === "") {
      flexsearchresults.removeAttribute("id");
    }
    else {
      flexsearchresults.id = "flexsearch-results";
    }

    // remove old entries
    while(ul.firstChild) {
      ul.removeChild(ul.firstChild);
    }

    // display results
    for(var i = 0; i < wordList.length; i++) {
      if(searchInput.value !== "") {
        if(searchInput.value.toLowerCase() === wordList[i].toLowerCase().slice(0, searchInput.value.length)) {
          var li = document.createElement('li');
          // console.log(wordList[i]);
          li.appendChild(document.createTextNode(wordList[i]));
          // li.className = 'flexsearch-results-item';
          ul.appendChild(li);
        }
      }
    }

  });


})();
