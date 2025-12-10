const API_KEY = "AIzaSyDdpwhoLf04mVOCyWCnSlOjkKGnOhE0vaw";
let extra = []
let playlists
async function get_videos(PLAYLIST_ID,title) {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${PLAYLIST_ID}&key=${API_KEY}`);
    const data = await response.json();
    console.log(data.items);
    document.getElementById("playlist_title").innerHTML = title
    document.getElementById("playlist_title").classList.remove("d-none")
    displayVideos(data.items);

}
function displayVideos(videos){
    let cartona = ``
    for(let i=0 ; i<videos.length ; i++){
        const videoId = videos[i].snippet.resourceId.videoId;
    const title = videos[i].snippet.title;
    const thumb =
  videos[i].snippet.thumbnails?.standard?.url ||
  videos[i].snippet.thumbnails?.high?.url ||
  videos[i].snippet.thumbnails?.medium?.url ||
  "./images/listening.jpg";
        cartona += `
        <div class="col-md-4 mt-5  rounded-5  d-flex flex-column justify-content-center align-items-center">
                    <iframe class="rounded-5 border border-3 border-warning" style="width:100%" height="250" 
                  src="https://www.youtube.com/embed/${videoId}" 
                  frameborder="0" allowfullscreen>
                </iframe>   
                <p class="text-white text-center mt-3 video_disc fs-5">${title}</p> 
                </div>
                `
    }
    document.getElementById("video-list").innerHTML = cartona
                document.getElementById("video-list").classList.remove("d-none")
                document.getElementById("lists").classList.add("d-none")
                document.getElementById("hidden").classList.remove("d-none")
}

const extra_id = ['PLp0HPxdzjjMhcFyOYQ6dvn7fkxiFnuQCg',
  'PLhKrJU_9DBveDxTHmTI850V0Hy6qLX-RQ&si=LwwRdch8MFTpq9IV',
  'PLhKrJU_9DBvcpoVFqDuL__WqOBkqHT0aS&si=FUgXsuQQ-v9ohbP8',
  'PLPXi7Vao8IylB-u_yL-S2wWztvRxwiA0H&si=1YbfMZ75G_E2B-6i',
  'PLPXi7Vao8IynChYMWaJIOAlVN4c9MHa-0&si=NIVgwMZTajGqUpSs',
  'PL5nS8TkbDMtL7h6XvntJN4l9kaRBdPG0z&si=ZAu5U-meNxIMo3mc',
  'PLAcSE7tTvU3TZyJkAVdVCIBhqV8o8w327&si=pmtauxXMVpb2_hsY',
  'PLAcSE7tTvU3RyMd34zH677QHTLdrLkYx3&si=YmZ-SnzxFfK_NKwG'
  
]
async function  get_extra() {
  for(let i=0;i<extra_id.length;i++){
      let response = await fetch(`https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${extra_id[i]}&key=${API_KEY}`)
      let data = await response.json()
      console.log(data);
      playlists = playlists.concat(data.items)
  }
}



const CHANNEL_ID = ['UCuIayeub56xP83u7u-_d-SQ',`UCQ2X_YPmdjBOjVq6dLbO0pQ`]
async function getAllPlaylists() {
     playlists = [];
    let nextPageToken = '';
    for(let i=0;i<CHANNEL_ID.length;i++){
        do {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${CHANNEL_ID[i]}&maxResults=50&pageToken=${nextPageToken}&key=${API_KEY}`);
        const data = await response.json();
        playlists = playlists.concat(data.items);
        nextPageToken = data.nextPageToken || '';
    } while (nextPageToken);
    console.log(playlists);
    }
    await get_extra()
    displaylists(playlists)
}

getAllPlaylists()

function displaylists(list){
    let cartona = ``
    for(let i=0 ; i<list.length ; i++){
    const title = list[i].snippet.title;
     const thumbs = list[i].snippet.thumbnails;
        const thumb =
              (thumbs.standard && thumbs.standard.url) ||
              (thumbs.high && thumbs.high.url) ||
              (thumbs.medium && thumbs.medium.url)
        cartona += `<div class="col-lg-4 col-md-6  mt-5">
                    <div class="droscard card w-100 rounded-5 border border-1 border-white" style="width: 18rem; background-color: #0A2147; overflow:hidden;">
  <img src="${thumb}" class="card-img-top " alt="...">
  <div class="card-body">
    <h5 class="card-title desc text-center py-3" style="color: #E6D69F;">${title}</h5>
    <a onclick="get_videos('${list[i].id}' , '${title}')" href="#" class="btn btn-primary text-black d-flex justify-content-center border-0 fw-bolder fs-5" style="background-color: #E6D69F;">🎧 عرض السلسلة</a>
  </div>
</div>
                </div> `               
    }
     document.getElementById("lists").innerHTML = cartona
    
}





document.getElementById("hidden").addEventListener("click",()=>{
    document.getElementById("video-list").classList.add("d-none")
     document.getElementById("lists").classList.remove("d-none")
     document.getElementById("hidden").classList.add("d-none")
      document.getElementById("playlist_title").classList.add("d-none")
})





let navLink = document.querySelector("#firstnavitem a");
let zaker = document.getElementById("zaker");

navLink.addEventListener("click", function (e) {
    e.preventDefault();

    zaker.currentTime = 0;

    zaker.play().then(() => {
        zaker.onended = function () {
            window.location.href = navLink.href;
        };
    }).catch(() => {
        window.location.href = navLink.href;
    });
});