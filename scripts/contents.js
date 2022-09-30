//jshint esversion : 6


/////////////// * ---- GLOBAL VARIABLES ---- * /////////////////
var url = "";
const todoresp = {todo: "showPageAction"};

///////////// * GLOBAL VARIABLES ENDS HERES * /////////////////


//invoked main driver function
chrome.runtime.sendMessage(todoresp);
main();




function main() {


    var sliderInnerHTMLString = "\
    <!-- HEADER IS HERE -->\
    <!-- THE BODY CONTAINER IS HERE -->\
    <div id='sbodycontainer'>\
    <br/>\
    <h2 id='heading' >linkedin Education Extractor</h2>\
    <br/>\
    <h3 id='Name'></h3>\
    <br/>\
    <textarea cols= '100' id='educationText'></textarea>\
    <br/>\
    <div class='internal_button' id='education_extract_button'>Extract</div>\
    <br/>\
    <div class='internal_button' id='copy'>copy Text</div>\
    </div>\
    \
    \
    ";



    sliderGen(sliderInnerHTMLString);


    chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
      if(msg.todo == "toggle") {
        slider();
      }
    });



    //Added this as a temporary solution
    //Issue: The page doesn't fully load and content script
    //       runs only once
    //Resolution: Added trigger through window.onscroll
    //            function to register extraction everytime
    //            a user scrolls on the webpage.




  //deploying listeners for `manual extraction` buttons feature

  document.getElementById('education_extract_button').addEventListener("click", extractEducation);
  document.getElementById('copy').addEventListener("click", copyText);
  document.getElementById('education_extract_button').addEventListener("click", name);

  name();
  extractEducation();


}


//*=======================================================*//



function sliderGen(sliderInnerHTMLString) {
    var slider = document.createElement("div");
    slider.id = "slider";
    var sliderDivInnerHTML = sliderInnerHTMLString;

    slider.innerHTML += sliderDivInnerHTML;

    document.body.prepend(slider);
}

//slider function to toggle the slider frame
function slider() {
    var slider = document.getElementById("slider");

    var styler = slider.style;
    //alert("slider" + slider);

    //toggle slider
    if(styler.width == "0px") {
        styler.width = "430px";
    } else {
        styler.width = "0px";
    }

    if(styler.height == "0px") {
        styler.height = "535px";
    } else {
        styler.height = "0px";
    }
  }







//fucntion to extract education details
function extractEducation() {


  var anchor1 = document.getElementById("education");

  var list = null;
  var education = [];
  var elem = null;

  list = anchor1.nextElementSibling.nextElementSibling.firstElementChild.children;

  for(i=0;i<list.length;i++){

    elem = list[i].innerText;
    elem = elem.split("\n");
    elem  = elem.slice(1,-1);
    elem  = [...new Set(elem)];
    console.log(elem);
    education.push(
    {
      'id': i,
      'title': elem
    });
  }
    var objtemp = {
      'name': 'education',
      'data': education
    };



  document.getElementById('educationText').innerHTML = JSON.stringify(objtemp);
}

function copyText(){
  var copyText = document.getElementById("educationText");
  navigator.clipboard.writeText(copyText.value);
}

function name(){
  var Name = document.querySelector("h1").innerText;
  document.getElementById('Name').innerHTML = Name;

}
