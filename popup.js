// This likely won't work

// const clickHide =  () => {
//     let checkbox = document.getElementById("ytHideCheck");

//     if (checkbox.checked) {
//         document.querySelector("#movie_player > div.ytp-gradient-bottom").style.display = "block";
    
//         document.querySelector("#movie_player > div.ytp-chrome-bottom").style.display = "block";
//     }

//     document.querySelector("#movie_player > div.ytp-gradient-bottom").style.display = "none";

//     document.querySelector("#movie_player > div.ytp-chrome-bottom").style.display = "none";
    
// }
async function getActiveTabURL() {
    const tabs = await chrome.tabs.query({
        currentWindow: true,
        active: true
    });

    return tabs[0];
}

document.addEventListener("DOMContentLoaded", async () => {
    const activeTab = await getActiveTabURL();
    const queryParameters = activeTab.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);

    const currentVideo = urlParameters.get("v");

    if (!(activeTab.url.includes("youtube.com/watch") && currentVideo)) {
        const container = document.getElementsByClassName("container")[0];

        container.innerHTML = '<h2>You are not playing a youtube video yet.</h2>';
    }
});

