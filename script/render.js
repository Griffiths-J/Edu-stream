async function render(){
  const responds = await fetch("./data/data.json");

  const data = await responds.json();

  console.log(data);



  const htm = document.querySelector(".wrap");
let mk='';

  data.map((da, index)=>{

    
    mk+=  `
    <!-- Video.js Player -->
  <video
    id="my-video"
    class="video-js vjs-default-skin"
    controls
    poster="assets/thumbnails/preloader.jpeg"
    preload="auto"
    width="640"
    height="360"
    data-setup='{
      "techOrder": ["youtube"],
      "sources": [{ "type": "video/youtube", "src": "${da.youtubeId}" }]
    }'>
  </video>

   `
   
  }
)
htm.innerHTML=mk
// Initialize the player
    const player = videojs.all('my-video');
}
render();