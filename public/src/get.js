//OnDocument Load
if (document.readyState === "complete") {
  init();
} else {
  document.addEventListener("DOMContentLoaded", function() {
    init();
    modal();
  });
}

//Load all vote info for all artist
const init = () => {
  getVoteInfo();
};

//Ask the server for all votes
const getVoteInfo = () => {
  var request = new XMLHttpRequest();
  request.open("GET", "https://zemogatest.herokuapp.com", true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      const data = JSON.parse(request.responseText);
      //Call function load vote info to show to the html
      loadVoteInfo(data);
    }
  };
  request.onerror = function() {
    // There was a connection error of some sort
  };
  request.send();
};

//Show all the information to the
const loadVoteInfo = data => {
  var content;
  data.forEach(function(element) {
    //Getting total votes
    const total =
      parseInt(element.votepositive) + parseInt(element.votenegative);
    const positive_per = (element.votepositive * 100) / total;
    const negative_per = (element.votenegative * 100) / total;
    var artistname = "content__" + element.name;
    content = document.getElementsByClassName(artistname)[0];
    if (content) {
      content.classList.add(element._id);
      updatePercentaje(content, positive_per, negative_per);
    }
  });
};

//Go to the html and update the values
const updatePercentaje = (content, positive_per, negative_per) => {
  let left = content.getElementsByClassName("content__box__thumbs__left")[0];
  left.addEventListener("click", clickVote, false);
  let  right = content.getElementsByClassName("content__box__thumbs__right")[0];
  right.addEventListener("click", clickVote, false);
  let text_left = left.getElementsByClassName("content__box__thumbs__text")[0];
  let text_right = right.getElementsByClassName("content__box__thumbs__text")[0];

  left.style.width = Math.round(negative_per) + "%";
  right.style.width = Math.round(positive_per) + "%";

  text_left.innerHTML = Math.round(negative_per) + "%";
  text_right.innerHTML = Math.round(positive_per) + "%";

  let headerthumb = content.getElementsByClassName("content__box__thumb")[0];
  let headerimg = content.getElementsByClassName("content__box__thumb__img")[0];
  
  if(positive_per < negative_per){
    headerthumb.classList.remove("content__box__thumb--orange");
    headerthumb.classList.add("content__box__thumb--gray");
    headerimg.classList.add("content__box__thumbs__img--rotate");
  }else{
    headerthumb.classList.remove("content__box__thumb--gray");
    headerthumb.classList.add("content__box__thumb--orange");
    headerimg.classList.remove("content__box__thumbs__img--rotate");
  }
};



const modal = () => {
  // Get the modal
  var modal = document.getElementById("ModalVote");

  // Get the button that opens the modal
  var btn = document.getElementById("myBtn");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
};
