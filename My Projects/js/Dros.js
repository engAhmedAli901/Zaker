const API_KEY = "AIzaSyDdpwhoLf04mVOCyWCnSlOjkKGnOhE0vaw";
let cartona_container = []
let ids = []
if(localStorage.getItem("items")==null){
    cartona_container = []
}
else{
    cartona_container = (JSON.parse((localStorage.getItem('items'))))
    showFavourite()
}
if(JSON.parse(localStorage.getItem("ids"))==null){
    ids = []
}
else{
    ids = JSON.parse(localStorage.getItem("ids"))
}
function number(i){
    console.log(i);
    localStorage.setItem("index",i)
    window.location.href = "./Dros.html"
}
window.onload = ()=>{
    let x = localStorage.getItem("index")
     getAllPlaylists(x)
}
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



const CHANNEL_ID = ['UCch6Y4YgssEzMa4Q5zw4xjw',`UC_FFy2YxiElNMba-t-6VwTA`,`UC87hmYpPnVdgmv4bvs0V-eg`,`UCwLgnvgp32d8bHtQljXqWeQ`,`UCWjCSGhmSGu0VLf2mPFS0Kg`,`UC43bHWI3eZwfxOONWdQBi-w`,`UCah56qawts736uNxZA3inLQ`,`UCASAOTD6fMPEg8jmO4nPblQ`,`UCr4Kz8-cozLWzGYa1WICePw`,`UCYW44APHfIo0GyAO9iosHjQ`,`UCB6m3UVQVt2oh86rmmu87sA`,`UCKsLY1z0nAXS81p_cmYL00g`]
async function getAllPlaylists(i) {
    let playlists = [];
    let nextPageToken = '';
    do {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${CHANNEL_ID[i]}&maxResults=50&pageToken=${nextPageToken}&key=${API_KEY}`);
        const data = await response.json();
        playlists = playlists.concat(data.items);
        nextPageToken = data.nextPageToken || '';
    } while (nextPageToken);
    console.log(playlists);
    displaylists(playlists)
}

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
  <div class=" text-end"><i id="${i}" class="fa-regular fa-heart  fs-2 text-warning" onclick="favourit(this,'${list[i].id}')"></i></div>
    <h5 class="card-title desc text-center py-3" style="color: #E6D69F;">${title}</h5>
    <a onclick="get_videos('${list[i].id}' , '${title}')" href="#" class="btn btn-primary text-black d-flex justify-content-center border-0 fw-bolder fs-5" style="background-color: #E6D69F;">عرض الدروس✍️</a>
  </div>
</div>
                </div> `               
    }
     document.getElementById("lists").innerHTML = cartona

     ids.forEach(savedId => {
    list.forEach((item, index) => {
        if (savedId === item.id) {
            document.getElementById(index).classList.replace("fa-regular","fa-solid");
            document.getElementById(index).classList.add("text-danger");
        }
    });
});
    
}


async function favourit(el,id){
    ids.push(id)
    localStorage.setItem("ids",JSON.stringify(ids))
    el.classList.add("text-danger")
     const url = `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${id}&key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.items);
    
    displayfavourit(data.items);   
}


function displayfavourit(data){
    let cartona = ``
    for(let i=0 ; i<data.length ; i++){
    const title = data[i].snippet.title;
     const thumbs = data[i].snippet.thumbnails;
        const thumb =
              (thumbs.standard && thumbs.standard.url) ||
              (thumbs.high && thumbs.high.url) ||
              (thumbs.medium && thumbs.medium.url)
        cartona += `<div class="col-lg-4 col-md-6  mt-5">
                    <div class="droscard card w-100 rounded-5 border border-1 border-white" style="width: 18rem; background-color: #0A2147; overflow:hidden;">
  <img src="${thumb}" class="card-img-top " alt="...">
  <div class="card-body">
  <div class="text-end"><i class="fa-solid fa-heart text-danger  fs-2 " onclick="remove('${data[i].id}')"></i></div>
    <h5 class="card-title desc text-center py-3" style="color: #E6D69F;">${title}</h5>
    <a onclick="get_fav_videos('${data[i].id}' , '${title}')" href="#" class="btn btn-primary text-black d-flex justify-content-center border-0 fw-bolder fs-5" style="background-color: #E6D69F;">عرض الدروس✍️</a>
  </div>
</div>
                </div> `
             cartona_container.push(cartona)      
    }
    localStorage.setItem('items',JSON.stringify(cartona_container))
     document.getElementById("fav").innerHTML = cartona_container.join(" ")


     ids.forEach(savedId => {
    list.forEach((item, index) => {
        if (savedId === item.id) {
            document.getElementById(index).classList.replace("fa-regular","fa-solid");
            document.getElementById(index).classList.add("text-danger");
        }
        else{
           document.getElementById(index).classList.replace("fa-solid","fa-regular"); 
           document.getElementById(index).classList.add("text-warning");
        }
    });
});
    
}


async function get_fav_videos(PLAYLIST_ID,title) {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${PLAYLIST_ID}&key=${API_KEY}`);
    const data = await response.json();
    console.log(data.items);
    document.getElementById("fav_list_title").innerHTML = title
    document.getElementById("fav_list_title").classList.remove("d-none")
    display_fav_Videos(data.items);

}

function display_fav_Videos(videos){
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
    document.getElementById("fav-list").innerHTML = cartona
                document.getElementById("fav-list").classList.remove("d-none")
                document.getElementById("fav").classList.add("d-none")
                document.getElementById("fav_hidden").classList.remove("d-none")
}

document.getElementById("fav_hidden").addEventListener("click",()=>{
    document.getElementById("fav-list").classList.add("d-none")
     document.getElementById("fav").classList.remove("d-none")
     document.getElementById("fav_hidden").classList.add("d-none")
      document.getElementById("fav_list_title").classList.add("d-none")
})


function showFavourite(){
    document.getElementById("fav").innerHTML = cartona_container.join("");
    document.getElementById("fav").classList.remove("d-none");
}


function remove(id){
    let index = ids.findIndex(item => item === id);

    if (index !== -1) {
        ids.splice(index,1);
        localStorage.setItem("ids", JSON.stringify(ids));

        cartona_container.splice(index,1);
        localStorage.setItem("items", JSON.stringify(cartona_container));
        let heartIcons = document.querySelectorAll(".fa-heart");
        heartIcons.forEach((icon) => {
            // لو ال onclick فيه id مطابق
            if(icon.getAttribute("onclick")?.includes(`'${id}'`)){
                icon.classList.remove("text-danger");
                icon.classList.remove("fa-solid");
            }
        });
        showFavourite();
    }
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

