const GetArtistAndVoteType = e => {
  let voteInfo = [];

  //Artist
  const classArtist = e.target.closest(".content__box").className.split(/\s+/);
  classArtist.map(function(element) {
    if (element.includes("content__") && !element.includes("content__box")) {
      element = element.split("__");
      voteInfo.push(element[1]);
    }
  });
  //Id
  voteInfo.push(classArtist[3]);

  //Vote Type
  const classVoteType = e.target.closest(".vote").className.split(/\s+/);
  let voteType;
  classVoteType.map(function(element) {
    if (element.includes("content__box__thumbs__")) {
      element = element.split("__");
      voteInfo.push(element[3]);
    }
  });

  return voteInfo;
};

const clickVote = e => {
  var infoVote = GetArtistAndVoteType(e);

  var request = new XMLHttpRequest();
  request.open("GET", "https://zemogatest.herokuapp.com/" + infoVote[1], true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      const data = JSON.parse(request.responseText);
      updateVote(data, infoVote);
    }
  };
  request.onerror = function() {
    // There was a connection error of some sort
  };
  request.send();
};

const updateVote = (data, infoVote) => {
  if (infoVote[2].includes("left")) {
    data.votenegative = (parseInt(data.votenegative) + 1).toString();
  } else {
    data.votepositive = (parseInt(data.votepositive) + 1).toString();
  }
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "https://zemogatest.herokuapp.com/" + data._id, true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.send(JSON.stringify(data));
  xhr.onerror = function(error) {
    // There was a connection error of some sort
  };
  xhr.onload = function() {
    if (xhr.status >= 200) {
      const data = [];
      data.push(JSON.parse(xhr.responseText));
      loadVoteInfo(data);
      var modal = document.getElementById("ModalVote");
      modal.style.display = "block";
    }
  };
};
