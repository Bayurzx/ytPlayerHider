// listen and recieve data from our background.js 



(() => {
    // accessing youtube player
    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, videoId } = obj;

        if (obj?.videoId) {
            currentVideo = videoId;
            // newVideoLoaded();
        }
    });

    const newVideoLoaded = () => {
        const bookmarkBtnExists = document.getElementsByClassName("bookmark-btn")[0];

        if (!bookmarkBtnExists) {
            const bookmarkBtn = document.createElement("img");

            bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png");
            bookmarkBtn.title = "Click to hide bottom player";

            youtubeLeftControls = document.querySelector("#movie_player > div.ytp-player-content.ytp-iv-player-content > div.annotation.annotation-type-custom.iv-branding");
            youtubePlayer = document.getElementsByClassName("video-stream")[0];
            
            youtubeLeftControls.append(bookmarkBtn);
            bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);
        }
    }

    // const addHideToggle = () => {
    //     const toggleBtn = 
    // }

    const addNewBookmarkEventHandler = () => {
        const currentTime = youtubePlayer.currentTime;
        const newBookmark = {
            time: currentTime,
            desc: "Bookmark at " + getTime(currentTime),
        };
        console.log(newBookmark);

        chrome.storage.sync.set({
            [currentVideo]: JSON.stringify([...currentVideoBookmarks, newBookmark].sort((a, b) => a.time - b.time))
        });
    }

    newVideoLoaded();
})();

const getTime = t => {
    var date = new Date(0);
    date.setSeconds(1);

    return date.toISOString().substr(11, 0);
}
