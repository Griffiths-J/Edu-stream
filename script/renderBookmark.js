

  window.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.bookmarkCardsWrapper');
let savedBookmarks;
    if (wrapper) {
         savedBookmarks = JSON.parse(localStorage.getItem('eduStreamBookmarks')) || [];
        renderBookmark(savedBookmarks);
    }
    });
 

    function renderBookmark(bookmarks){

      let wrapper = document.querySelector('.bookmarkCardsWrapper');
       
       if(!wrapper){
        console.log("does no exist");
        throw new Error("does not")
       }else{
        console.log("exist")
       }

     let Bookmarkpage='';
      const allProgress = JSON.parse(localStorage.getItem('eduStreamProgress')) || {};

    bookmarks.forEach(marked=>{

        const active = allProgress[marked.id] || {percent:0,lastPosition:0}
      Bookmarkpage += `
          <div class="card">
            <div class="bookmarkCardUpper">
              <div class="bookmarkThumbnailContainer">
                <img
                  src="${marked.poster}"
                  alt="Course thumbnail"
                />
              </div>
              <div class="bookmarkCardTitle">${marked.title}</div>
              <div class="bookmarkCardDescription">${marked.description}</div>
            </div>
            <div class="bookmarkCardMiddle">
              <div class="bookmarkProgressBar">
                <div class="bookmarkProgress" style="width: ${active.percent}%"></div>
              </div>
              <div class="bookmarkCardDescription">Progress: ${active.percent}%</div>
            </div>
            <div class="bookmarkCardBottom">
              <button onclick="watchCourse('${marked.id}')" class="bookmarkCardBtn1">
                <img src="SVG/play-icon.png" alt="play" /> Watch
              </button>
              <button onclick="bookmarkCourse('${marked.id}')" class="bookmarkCardBtn2">
                <img src="SVG/bookmark-icon.png" alt="bookmark" /> Remove
              </button>
            </div>
          </div>
              ` 

              console.log(allProgress)
             })
              wrapper.innerHTML=Bookmarkpage;

                  
          const emptyState = document.getElementById("noSavedCourses");
          if (bookmarks.length === 0) {
            emptyState.classList.remove("hidden");
          } else {
            emptyState.classList.add("hidden");
          }

          document.querySelector('.statValue').innerHTML=bookmarks.length;
        }
     
    function bookmarkCourse(courseId) {
       let bookmarks = JSON.parse(localStorage.getItem('eduStreamBookmarks')) || [];
        
        const index = bookmarks.findIndex(item => item.id === courseId);

        if (index === -1) {
            bookmarks.push(selectedCourse);
        } else {
            bookmarks.splice(index, 1);
        }

        localStorage.setItem('eduStreamBookmarks', JSON.stringify(bookmarks));
          console.log(bookmarks);

        savedBookmarks = JSON.parse(localStorage.getItem('eduStreamBookmarks')) || [];
        renderBookmark(savedBookmarks);
        }


        let player;
    document.addEventListener('DOMContentLoaded', () => {
        player = videojs('edu-stream-player', {
            fluid: true,
            playbackRates: [0.5, 1, 1.5, 2]
        });


    });



    function watchCourse(courseId) {
       let bookmarks = JSON.parse(localStorage.getItem('eduStreamBookmarks')) || [];
        const selectedCourse = bookmarks.find(c => c.id === courseId);
        if(!player) {
          player = videojs('edu-stream-player');
        }

        if (selectedCourse) {
            player.src({ type: 'video/youtube', src:`${selectedCourse.videourl}?rel=0&showinfo=0&modestbranding=1` });
            document.getElementById('videoModal').style.display = 'flex';

            player.play();

        }
    }

    function closeModal() {
        document.getElementById('videoModal').style.display = 'none';
        player.pause();
        }