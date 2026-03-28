
async function render(){
    const courseJson = await fetch('./data/courses.json');
    const data = await courseJson.json();

    const webDev = data[0].Webdev;
    const ai = data[1].ai;
    const ui_ux = data[2].ui_ux;
    const cybersecurity = data[3].cybersecurity;
    const tech = data[4].tech;
    const allCourses = [...webDev, ...ai, ...ui_ux, ...cybersecurity,...tech];
 

//homepage 
    const homeWebDev= webDev.slice(2, 7);
    renderCourseCards(homeWebDev, '.webdev-sec');

    const homecyber = cybersecurity.slice(4, 9);
    const reverseHomecyber=homecyber.reverse();
    renderCourseCards(reverseHomecyber, '.cybersecurity-sec');

    const contW = webDev.slice(0,1);
    const contU = ui_ux.slice(2,4);
    const contC = cybersecurity.slice(0,2)
    const contWatching = [...contU,...contW,...contC];
    renderCourseCards(contWatching, '.continue-sec');

    renderCourseCards(tech,'.techadvancement-sec')

    function bigCardWatch(course, container ,index){
      let heroBnt = document.querySelector(container);
      if(!heroBnt)return;
      let hero = course[index].id;
    heroBnt.addEventListener('click',()=>{
      watchCourse(hero);
    })
    };

    bigCardWatch(webDev , '.hero-btn1',12);
    bigCardWatch(webDev,'.trend-watch-button',12);
 

//cybersecurity page    
    renderCourseCards(cybersecurity,'.cybersecurity-course-sec');
//ui_ux page    
    renderCourseCards(ui_ux,'.uiux-course-sec');
//ai page    
    renderCourseCards(ai,'.ai-course-sec');
//webev page    
    renderCourseCards(webDev,'.webdev-course-sec');
//trending page
  const trendWebdev = webDev.slice(2,8);
  const trendUi_ux = ui_ux.slice(2,8); 
  const trendCyber = cybersecurity.slice(2,8);
  const trendAi = ai.slice(2,8);
  renderCourseCards(trendWebdev,'.trend-web-sec');
  renderCourseCards(trendUi_ux,'.trend-ui-sec');
  renderCourseCards(trendCyber,'.trend-cyber-sec');
  renderCourseCards(trendAi,'.trend-ai-sec');



    let player;
    document.addEventListener('DOMContentLoaded', () => {
        player = videojs('edu-stream-player', {
            fluid: true,
            playbackRates: [0.5, 1, 1.5, 2]
        });


    });


    function renderCourseCards(dataArray, containerClass) {
        const target = document.querySelector(containerClass);
        if (!target) return;

        
        const currentBookmarks = JSON.parse(localStorage.getItem('eduStreamBookmarks')) || [];

        let htmlContent = "";

        dataArray.forEach(course => {

            const savedProgress = getSavedProgress(course.id);

            const isBookmarked = currentBookmarks.some(b => b.id === course.id);
            const bookmarkIcon = isBookmarked ? "SVG/bookmark-filled-icon.png" : "SVG/bookmark-outline-icon.png";
            const bookmarkText = isBookmarked ? "Saved" : "Bookmark";

            htmlContent += `
              <div data-course-id="${course.id}" class="card">
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
                    <div onclick="bookmarkCourse('${course.id}',this)" class="cardBtn2">
                      <img src="${bookmarkIcon}" alt="bookmark-icon" />
                      <p>${bookmarkText}</p>
                    </div>
                  </div>
                </div>

                <div class="cardBottom">
                  <div class="progressBar">
                    <div class="progress" style="width: ${savedProgress.percent || 0}%"></div>
                  </div>
                  <div class="progressPercentage">${savedProgress.percent || 0}%</div>
                </div>
              </div>
            `;
        });

        target.innerHTML = htmlContent;
    }


   
    function watchCourse(courseId) {
        const selectedCourse = allCourses.find(c => c.id === courseId);
        if(!player) {
          player = videojs('edu-stream-player');
        }

        player.off('timeupdate');

        if (selectedCourse) {
            player.src({ type: 'video/youtube', src:`${selectedCourse.videourl}?rel=0&showinfo=0&modestbranding=1` });
            document.getElementById('videoModal').style.display = 'flex';

            player.on('loadedmetadata', () => {
              const savedProgress = getSavedProgress(courseId);
              if(savedProgress.lastPosition){
                player.currentTime(savedProgress.lastPosition);
              };
              player.play();
            });

            player.on('timeupdate', () => {
              const currentTime = player.currentTime();
              const duration = player.duration();
              const percent = Math.floor((currentTime / duration) * 100);

              updateProgressBar(percent, courseId);

              if(duration > 0){
              saveProgress(courseId, percent, currentTime);
              }
            });
        }
      };


    function updateProgressBar(percent, courseId){
         const card = document.querySelector(`.card[data-course-id="${courseId}"]`);

         if(card){
          const progressBar = card.querySelector('.progress');
          const progressPercentage = card.querySelector('.progressPercentage');

          if(progressBar && progressPercentage){
            progressBar.style.width = `${percent}%`;
            progressPercentage.textContent = `${percent}%`;
          }
         }
      };


    function saveProgress(courseId,percent,seconds){

     const allProgress = JSON.parse(localStorage.getItem('eduStreamProgress')) || {};

     allProgress[courseId]={
        percent:percent,
        lastPosition:seconds
      }

      localStorage.setItem('eduStreamProgress',JSON.stringify(allProgress));
    };   


    function getSavedProgress(courseId){
      const allProgress = JSON.parse(localStorage.getItem('eduStreamProgress')) || {};
      return allProgress[courseId] || {percent:0, lastPosition:0};
    }


    function bookmarkCourse(courseId,clickedElement) {
        let bookmarks = JSON.parse(localStorage.getItem('eduStreamBookmarks')) || [];
        const selectedCourse = allCourses.find(c => c.id === courseId);
        const index = bookmarks.findIndex(item => item.id === courseId);

        if (index === -1) {
            bookmarks.push(selectedCourse);
            if(clickedElement){
                clickedElement.innerHTML='<img src="SVG/bookmark-filled-icon.png">Saved' 
            }
        } else {
          if(clickedElement){
            
          }
            bookmarks.splice(index, 1);
            clickedElement.innerHTML='<img src="SVG/bookmark-outline-icon.png">Bookmark'
        }

        localStorage.setItem('eduStreamBookmarks', JSON.stringify(bookmarks));
          console.log(bookmarks);

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
