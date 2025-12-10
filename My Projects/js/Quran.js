let data
let num
let reading_data
let listing_data
let FhresInput = document.getElementById("fhres")
let KareInput = document.getElementById("kare")
let fhresitems
let finaldata
let kare_name
let kare_server
let mainaudio
let surah_name
let kare_alter_server
let numofaya
let currentTime = document.getElementById("start_time")
async function get_surah(){
    let response = await fetch(`https://api.alquran.cloud/v1/surah`)
    data = await response.json()
    console.log(data);
    display_surah()
}

function display_surah(){
    let cartona =``
    for(let i=0;i<=113;i++){
        cartona+=`<div class="fhresitems inner d-flex justify-content-between pt-3">
                        <i class="fa-solid fa-play text-warning ms-3 mt-1 iconopen"  style="cursor: pointer" onclick="reading(${data.data[i].number})"></i>
                        <div class="d-flex justify-content-end ">
                    <p class="text-white fw-bolder">${data.data[i].name}</p>
                    <span class="fw-bolder ps-3" style="color: #e8d69f;">-${data.data[i].number}</span>
                </div>
                    </div>`
    }
    document.getElementById("fhres_display").innerHTML = cartona;
    fhresitems = document.querySelectorAll(".fhresitems")
}

async function get_kare(){
    let response = await fetch(`https://mp3quran.net/api/v3/reciters`)
    finaldata = await response.json()
    console.log(finaldata);
    display_kare()
}

function display_kare(){
    let cartona =``
    for(let i=0;i<=232;i++){
        cartona+=`<div class="kareitems inner d-flex justify-content-between pt-3">
                        <a><i class="fa-solid fa-play text-warning ms-3 mt-1 iconopen"  style="cursor: pointer" onclick="get_quranvoice('${finaldata.reciters[i].name}', '${finaldata.reciters[i].moshaf[0]?.server || ""}','${finaldata.reciters[i].moshaf[1]?.server || ""}');  next_quranvoice('${finaldata.reciters[i].name}', '${finaldata.reciters[i].moshaf[0]?.server || ""}','${finaldata.reciters[i].moshaf[1]?.server || ""}') "></i></a>
                        <div class="d-flex justify-content-end ">
                    <p class="text-white fw-bolder">${finaldata.reciters[i].name}</p>
                    <span class="fw-bolder ps-3" style="color: #e8d69f;">-${i+1}</span>
                </div>
                    </div>`
    }
    document.getElementById("kare_display").innerHTML = cartona;
    kareitems = document.querySelectorAll(".kareitems")
}
get_kare()

get_surah()


async function reading(number){
    num = number
    let response = await fetch(`https://api.alquran.cloud/v1/surah/${number}`)
    reading_data = await response.json()
    surah_name = reading_data.data.name
    display_reading()
    tafseer_surah(number)
    if(window.innerWidth<770){
        window.scrollTo({
  top: 200,
  behavior: "smooth"
});

    }
    return num
     document.getElementById("voicestopicon").classList.add("d-none")
    document.getElementById("voiceplayicon").classList.remove("d-none")
}


function display_reading(){
    let cartona =``
    reading_data.data.ayahs[0].text = reading_data.data.ayahs[0].text.split(" ").slice(4,).join(" ")
    for(let i=0; i<reading_data.data.numberOfAyahs; i++){
        cartona+= `<span id="aya_voice_display" onclick="ayasound(${reading_data.data.ayahs[i].numberInSurah})">${reading_data.data.ayahs[i].text}(${reading_data.data.ayahs[i].numberInSurah})</span>`
    }
    document.getElementById("Alayat").innerHTML = cartona;
    document.getElementById("reading_ayat").classList.remove("d-none")
}


async function get_quranvoice(kare_name,kare_server,kare_alter_server){
    let finalNum = num.toString().padStart(3, "0")
    let primarylisting_data = `${kare_server}${finalNum}.mp3`
    let secondarylisting_data = `${kare_alter_server}${finalNum}.mp3`
    let validurl = await checkURL(primarylisting_data)
    if(validurl){
        listing_data = primarylisting_data
    }
    else{
        listing_data = secondarylisting_data
    }
    console.log(listing_data);
    listing_quranvoice(kare_name,listing_data)
   document.getElementById("audiosec").classList.remove("d-none") 
    window.scrollTo({
  top: document.body.scrollHeight,
  behavior: "smooth"})
  document.getElementById("voicestopicon").classList.add("d-none")
    document.getElementById("voiceplayicon").classList.remove("d-none")
}
async function checkURL(url) {
    try {
        let res = await fetch(url, { method: "HEAD" });
        return res.ok;
    } catch (e) {
        return false;
    }
}

function listing_quranvoice(kareName,listing_data){
    timing(listing_data)
    let cartona = `<p class="fw-medium pe-2">يتم الاستماع إلي</p>
                        <h1>${surah_name}</h1>
                        <h5 class="pt-3 fw-medium" style="color: #e8d69f;">بصوت الشيخ ${kareName}</h5>
                        <audio id="mainaudio" src="${listing_data}"></audio>
                        `
       document.getElementById("openvoice").innerHTML = cartona  
        mainaudio = document.getElementById("mainaudio")  


let audioSlider = document.getElementById("progress-bar");
mainaudio.addEventListener("timeupdate", function() {
    let progress = (mainaudio.currentTime / mainaudio.duration) * 100;
    audioSlider.value = progress;
     currentTime.textContent = formatTime(mainaudio.currentTime)
});

audioSlider.addEventListener("input", function() {
    let seekTime = (audioSlider.value / 100) * mainaudio.duration;
    mainaudio.currentTime = seekTime;
    currentTime.textContent = formatTime(seekTime)
});

mainaudio.addEventListener("ended",()=>{
    document.getElementById("voicestopicon").classList.add("d-none")
    document.getElementById("voiceplayicon").classList.remove("d-none")
    
})  


}


function timing(listing_data){
    let tempAudio = new Audio(listing_data);

    tempAudio.addEventListener("loadedmetadata", () => {
        console.log("Duration:", (tempAudio.duration)/60); 
        let hours = Math.floor((tempAudio.duration)/3600)
        let minutes = Math.floor((tempAudio.duration %3600)/60)
        let seconds = Math.floor((tempAudio.duration %60))
        if(hours<10) hours= "0" + hours
        if(minutes<10) minutes= "0" + minutes
        if(seconds<10) seconds= "0" + seconds
        document.getElementById("end_time").innerHTML = `${hours}:${minutes}:${seconds}`
    });
}

document.getElementById("voiceplayicon").addEventListener("click",function(){
    this.classList.add("d-none")
    document.getElementById("voicestopicon").classList.remove("d-none")
    mainaudio.play();
})

document.getElementById("voicestopicon").addEventListener("click",function(){
    document.getElementById("voicestopicon").classList.add("d-none")
    document.getElementById("voiceplayicon").classList.remove("d-none")
    mainaudio.pause();
})
 function removeTashkeel(text) {
    return text.normalize("NFD").replace(/[\u064B-\u065F\u0610-\u061A\u06D6-\u06ED]/g, "");
}
FhresInput.addEventListener("input",()=>{
    for(let i=0;i<=113;i++){
        if(((removeTashkeel(data.data[i].name)).toLowerCase()).includes((removeTashkeel(FhresInput.value).toLowerCase()))){
            fhresitems[i].classList.remove("d-none")
        }
        else{
            fhresitems[i].classList.add("d-none")
        }
    }
})

KareInput.addEventListener("input",()=>{
    for(let i=0;i<=232;i++){
        if(((finaldata.reciters[i].name).toLowerCase()).includes(((KareInput.value).toLowerCase()))){
            kareitems[i].classList.remove("d-none")
        }
        else{
            kareitems[i].classList.add("d-none")
        }
    }
})

async function tafseer_surah(surah_number){
    let tafseer = await fetch(
    `https://quranenc.com/api/v1/translation/sura/arabic_moyassar/${surah_number}`
  );
  tafseer_response = await tafseer.json();
  console.log(tafseer_response);
  display_tafseer()
}


function display_tafseer(){
    let cartona =``
    for(let i=0; i<tafseer_response.result.length; i++){
        cartona+= `${tafseer_response.result[i].translation}(${tafseer_response.result[i].aya})`
    }
    document.getElementById("Altafseer").innerHTML = cartona;
    document.getElementById("tafseer_ayat").classList.remove("d-none")
}


function next_quranvoice(kare_name,kare_server,kare_alter_server){
    let next = document.getElementById("voicenexticon")
    let prev = document.getElementById("voiceprevicon")
    next.addEventListener("click",()=>{
     reading((num+1)%114)
    get_quranvoice(kare_name,kare_server,kare_alter_server)
    })
    prev.addEventListener("click",()=>{
     num = (num <= 1) ? 114 : num - 1
     reading(num)
    get_quranvoice(kare_name,kare_server,kare_alter_server)
    })
}



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

async function ayasound(numofaya){
    let response = await fetch(
    `https://quranapi.pages.dev/api/${num}/${numofaya}.json`)
    let data = await response.json()
    display_ayasound(data.audio[1].url)
}

function display_ayasound(input){
    let cartona = `<audio id="shekh_aya_audio" src="${input}"></audio>`
    document.getElementById("ayaaudio").innerHTML = cartona
    document.getElementById("shekh_aya_audio").currentTime = 0;
    document.getElementById("shekh_aya_audio").play();
}
