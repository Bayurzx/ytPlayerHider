// listen and recieve data from our background.js 
const hideYtPlayer = () => {
  console.log(4);
  // the function run only if html is not yet injected
  if (document.getElementsByClassName("ytHide")[0] == undefined) {
    console.log(2);

    // Thanks to Chatgpt code
    // Create the div element
    let div = document.createElement("div");

    // Set the div's title attribute
    div.setAttribute("title", "Toggle to hide or show player");

    // Set the div's class attribute
    div.setAttribute("class", "ytHide");

    // Create the label element
    var label = document.createElement("label");

    // Set the label's class attribute
    label.setAttribute("class", "switch");

    // Create the input element
    var input = document.createElement("input");

    // Set the input's id attribute
    input.setAttribute("id", "ytHideCheck");

    // Set the input's type attribute
    input.setAttribute("type", "checkbox");

    // Set the input's checked attribute
    input.setAttribute("checked", "");

    // Create the span element
    var span = document.createElement("span");

    // Set the span's class attribute
    span.setAttribute("class", "slider round");

    // Add the input and span elements to the label element
    label.appendChild(input);
    label.appendChild(span);

    // Add the label element to the div element
    div.appendChild(label);

    // We hate shortcuts and lovve headaches
    //     youtubeScreen.innerHTML += `
    //   <div title="Toggle to hide or show player" class="ytHide">
    //     <label class="switch">
    //       <input id="ytHideCheck" type="checkbox" checked="">
    //       <span class="slider round"></span>
    //     </label>
    //   </div>
    // `;


    // Add the div element to the DOM tree
    let youtubeScreen = document.querySelector("#movie_player > div.ytp-player-content.ytp-iv-player-content");
    youtubeScreen.appendChild(div);

    // Add style
    const ytHiderStyle = document.createElement("style")

    ytHiderStyle.innerHTML = `
        
        .switch {
          position: relative;
          display: inline-block;
          width: 40px;
          height: 24px;
        }
        
        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          -webkit-transition: .4s;
          transition: .4s;
        }
        
        .slider:before {
          position: absolute;
          content: "";
          height: 16px;
          width: 16px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          -webkit-transition: .4s;
          transition: .4s;
        }
        
        input:checked+.slider {
          background-color: #2196F3;
        }
        
        input:focus+.slider {
          box-shadow: 0 0 1px #2196F3;
        }
        
        input:checked+.slider:before {
          -webkit-transform: translateX(16px);
          -ms-transform: translateX(16px);
          transform: translateX(16px);
        }
        
        /* Rounded sliders */
        .slider.round {
          border-radius: 16px;
        }
        
        .slider.round:before {
          border-radius: 50%;
        }
        `

    // Append style to dom head
    document.head.appendChild(ytHiderStyle);

    // Toggle to hide the player
    const checkbox = document.getElementById('ytHideCheck');

    checkbox.addEventListener('change', function (event) {
      if (event.target.checked) {
        document.querySelector("#movie_player > div.ytp-gradient-bottom").style.display = "block";

        document.querySelector("#movie_player > div.ytp-chrome-bottom").style.display = "block";
      } else {
        document.querySelector("#movie_player > div.ytp-gradient-bottom").style.display = "none";

        document.querySelector("#movie_player > div.ytp-chrome-bottom").style.display = "none";
      }
    });
  }
}

// The actual process run by the extension from the contentScript.js file
(() => {

  // The funciton is called 2x deal with some edge cases
  // 1st accessing youtube player when the tab.url changes
  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    console.log(1);
    setTimeout(() => {

      hideYtPlayer();
    }, 5000);
  });


  console.log(3);
  // 2nd for when the page is reloaded
  hideYtPlayer()

})();
