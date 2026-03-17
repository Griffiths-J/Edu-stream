
async function render(){
    const courseJson = await fetch('./data/courses.json');
    const data = await courseJson.json();

    const webDev = data[0].Webdev;
    const ai = data[1].ai;
    const ui_ux = data[2].ui_ux;
    const cybersecurity = data[3].cybersecurity;

    const allCourses = [...webDev, ...ai, ...ui_ux, ...cybersecurity];

    const homeWebDev= webDev.slice(0, 5);
    const homeAi = ai.slice(0, 5);
    const homeUiUx = ui_ux.slice(0, 5);
    const homeCybersecurity = cybersecurity.slice(0, 5);

    const contW = webDev.slice(0,1);
    const contU = ui_ux.slice(2,4);
    const contC = cybersecurity.slice(0,2)
    const contWatching = [...contU,...contW,...contC];


    renderCourseCards(homeWebDev, '.webdev-sec');
    renderCourseCards(homeAi, '.cybersecurity-sec');
    renderCourseCards(contWatching, '.continue-sec');

    let player;
    document.addEventListener('DOMContentLoaded', () => {
        player = videojs('edu-stream-player', {
            fluid: true,
            playbackRates: [0.5, 1, 1.5, 2]
        });


    });


    function watchCourse(courseId) {
        const selectedCourse = allCourses.find(c => c.id === courseId);
        if(!player) {
          player = videojs('edu-stream-player');
        }

        if (selectedCourse) {
            player.src({ type: 'video/youtube', src:`${selectedCourse.videourl}?rel=0&showinfo=0&modestbranding=1` });
            document.getElementById('videoModal').style.display = 'flex';
            player.play();
        }
    }


    function renderCourseCards(dataArray, containerClass) {
        const target = document.querySelector(containerClass);
        if (!target) return;

        
        const currentBookmarks = JSON.parse(localStorage.getItem('eduStreamBookmarks')) || [];

        let htmlContent = "";

        dataArray.forEach(course => {
            const isBookmarked = currentBookmarks.some(b => b.id === course.id);
            const bookmarkIcon = isBookmarked ? "SVG/bookmark-filled-icon.png" : "SVG/bookmark-outline-icon.png";
            const bookmarkText = isBookmarked ? "Saved" : "Bookmark";

            htmlContent += `
              <div class="card">
                <div class="cardUpper">
                  <div class="thumbnailContainer">
                    <img src="${course.poster}" alt="thumbnail-card" />
                  </div>
                  <div title="${course.title}" class="cardTitle">${course.title}</div>
                </div>

                <div class="cardMiddle">
                  <div class="cardDescription">${course.description}</div>
                  <div class="cardButtons">
                    <div onclick="watchCourse('${course.id}')" class="cardBtn1">
                      <img src="SVG/play-icon.png" alt="play-icon" />
                      <p>Watch</p>
                    </div>
                    <div onclick="bookmarkCourse('${course.id}')" class="cardBtn2">
                      <img src="${bookmarkIcon}" alt="bookmark-icon" />
                      <p>${bookmarkText}</p>
                    </div>
                  </div>
                </div>

                <div class="cardBottom">
                  <div class="progressBar">
                    <div class="progress" style="width: ${course.progress || 20}%"></div>
                  </div>
                  <div class="progressPercentage">${course.progress || '20'}%</div>
                </div>
              </div>
            `;
        });

        target.innerHTML = htmlContent;
    }

    function bookmarkCourse(courseId) {
        let bookmarks = JSON.parse(localStorage.getItem('eduStreamBookmarks')) || [];
        const selectedCourse = allCourses.find(c => c.id === courseId);
        const index = bookmarks.findIndex(item => item.id === courseId);

        if (index === -1) {
            bookmarks.push(selectedCourse);
        } else {
            bookmarks.splice(index, 1);
        }

        localStorage.setItem('eduStreamBookmarks', JSON.stringify(bookmarks));
        
        // Re-render to update the UI 
        renderCourseCards(courses, '.your-accumulation-class');
    }


    function closeModal() {
        document.getElementById('videoModal').style.display = 'none';
        player.pause();
        }
    
    window.closeModal = closeModal;
    window.bookmarkCourse = bookmarkCourse;
    window.watchCourse = watchCourse;
}

render();