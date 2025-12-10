let MS = document.getElementById("mainsadaka");
let BS = document.getElementById("sadaka");
let MH = document.getElementById("mainhaj");
let BH = document.getElementById("haj");
let MF = document.getElementById("mainfast");
let BF = document.getElementById("fast");
let MP = document.getElementById("mainpray");
let BP = document.getElementById("pray");
let MA = document.getElementById("mainshehada");
let BA = document.getElementById("shehada");
let start_btn = document.getElementById("start_btn")
let quran_voice = document.getElementById("quran_voice")
let final_data;
let tafseer_response;
MS.addEventListener("mouseenter", function () {
  BS.currentTime = 0;
  BS.play();
});
MS.addEventListener("mouseleave", function () {
  BS.pause();
  BS.currentTime = 0;
});

MH.addEventListener("mouseenter", function () {
  BH.currentTime = 0;
  BH.play();
});
MH.addEventListener("mouseleave", function () {
  BH.pause();
  BH.currentTime = 0;
});
MF.addEventListener("mouseenter", function () {
  BF.currentTime = 0;
  BF.play();
});
MF.addEventListener("mouseleave", function () {
  BF.pause();
  BF.currentTime = 0;
});
MP.addEventListener("mouseenter", function () {
  BP.currentTime = 0;
  BP.play();
});
MP.addEventListener("mouseleave", function () {
  BP.pause();
  BP.currentTime = 0;
});
MA.addEventListener("mouseenter", function () {
  BA.currentTime = 0;
  BA.play();
});
MA.addEventListener("mouseleave", function () {
  BA.pause();
  BA.currentTime = 0;
});
firstnavitem.addEventListener("click", function () {
  zaker.currentTime = 0;
  zaker.play();
});
start_btn.addEventListener("click", function () {
  quran_voice.currentTime = 0;
  quran_voice.play();
  setTimeout(() => {
    window.location.href = "./Quran.html";
  }, 7000)
});
async function Random_Aya() {
  let randomsurah = Math.floor(Math.random() * 114 + 1);
  let response = await fetch(
    `https://quranapi.pages.dev/api/${randomsurah}/1.json`
  );
  let data = await response.json();
  let randomaya = Math.floor(Math.random() * data.totalAyah + 1);
  let final_response = await fetch(
    `https://quranapi.pages.dev/api/${randomsurah}/${randomaya}.json`
  );
  final_data = await final_response.json();
  console.log(final_data);
  tafseer(randomsurah, randomaya);
}


async function tafseer(surah, aya) {
  let tafseer = await fetch(
    `https://cdn.jsdelivr.net/gh/spa5k/tafsir_api@main/tafsir/ar-tafseer-al-saddi/${surah}/${aya}.json`
  );
  tafseer_response = await tafseer.json();
  console.log(tafseer_response);
  // احاديث نبوية
  let randomhaditth = Math.floor((Math.random()*6638)+1)
    let hadeth = await fetch(`https://api.hadith.gading.dev/books/bukhari/${randomhaditth}`)
    hadeth_response = await hadeth.json()
    console.log(hadeth_response);

  display();
}
function display() {
  let cartona = `<div
              class="tab-pane fade show active text-center text-white h3"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
              tabindex="0"
            >
            <h1>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</h1>
            ﴾ ${final_data.arabic1} ﴿
            <br />
            [${final_data.surahNameArabicLong}:${final_data.ayahNo}]
            <br />
            <p class="text-white fw-light fs-5">${tafseer_response.text}</p>
            <audio id="aya_audio" src="${final_data.audio[(Math.floor(Math.random()*5)+1)].url}"></audio>
            </div>
            <div
              class="tab-pane fade text-center text-white h3"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
              tabindex="0"
            >
               <h1>قَالَ رَسُولُ اللَّهِ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ</h1>
             ${hadeth_response.data.contents.arab} 
            </div>`;
  document.getElementById("pills-tabContent").innerHTML = cartona;
  let day_aya = document.getElementById("pills-home");
  let aya_audio = document.getElementById("aya_audio");
  day_aya.addEventListener("click", function () {
    aya_audio.currentTime = 0;
    aya_audio.play();
  });
  day_aya.addEventListener("mouseleave", function () {
    aya_audio.pause();
    aya_audio.currentTime = 0;
  });
}
Random_Aya();




// async function get_azkar(){
//   let row_azkar = await fetch(`https://raw.githubusercontent.com/nawafalqari/azkar-api/56df51279ab6eb86dc2f6202c7de26c8948331c1/azkar.json?fbclid=IwY2xjawOK8LhleHRuA2FlbQIxMABicmlkETFjWkIzV2tlVFdhNVB2Nkpjc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHt7DX_mBnUfWNAGCBRjS5HBoO6qCcHf45g2HYRf6Sn-TconccpP9BArrLcNI_aem_BKgh-IP3v1rT18T2NbBr6w`)
//   let azkar = await row_azkar.json()
//   console.log(azkar);
  
// }

// function display_azkar(){}
// get_azkar()
