//OnDocument Load
if (document.readyState === "complete") {
  init();
} else {
  document.addEventListener("DOMContentLoaded", function() {
    init();
  });
}

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

//Load all vote info for all artist
const init = () => {
    const title = getUrlParameter("title");
    document.getElementsByClassName("title")[0].innerHTML = title;
};
