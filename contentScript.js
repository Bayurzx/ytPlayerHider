// listen and recieve data from our background.js 

(() => {
    let youtubeScreen;
    // accessing youtube player
    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        
        
        if (obj?.type === "NEW") {
            hideYtPlayer();
        }
    });
    
    const hideYtPlayer = () => {

        youtubeScreen = document.querySelector("#movie_player > div.ytp-player-content.ytp-iv-player-content");

        youtubeScreen.innerHTML += `
      <div title="Toggle to hide or show player" class="ytHide">
        <label class="switch">
          <input id="ytHideCheck" type="checkbox" checked="">
          <span class="slider round"></span>
        </label>
      </div>
    `;

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

        document.head.appendChild(ytHiderStyle);


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

    hideYtPlayer()
})();
