let data
async function get_Doaa(){
    let response = await fetch(`https://raw.githubusercontent.com/nawafalqari/azkar-api/56df51279ab6eb86dc2f6202c7de26c8948331c1/azkar.json`)
     data = await response.json()
    console.log(data["أدعية قرآنية"]);
    display_doaa()
}


function display_doaa(){
    let final_data = data["أدعية قرآنية"]
    let cartona =``
    for(let i=0;i<final_data.length;i++){
        let cleanText = final_data[i].content
    .replace(/\\n/g, '')      
    .replace(/"/g, '')  
    .replace(/,/g, '')  
    .replace(/'/g, '')       
    .trim();  
    
    let cleandisc = final_data[i].reference.replace(/\.\s*\[/, ' [').replace(/\\n/g, '')      
    .replace(/"/g, '')  
    .replace(/,/g, '')  
    .replace(/'/g, '') .trim()

        cartona+=` <div
                id="reading_Doaa"
                class="inner rounded-5 reading_morn_zekr the_zekr py-5 mt-5"
                style="
                  background-color: #0a2147;
                  height: fit-content;
                  overflow-y: auto;
                "
              >
                <div class="d-flex flex-column">
                  <h2 id="Doaa" class="zekr_content text-center mt-5 " style="cursor: pointer; color: #e8d69f; line-height:80px;" >${cleanText.split(".")[0]}</h2>
                  <p class="text-center text-white mt-4 fs-3 fw-bolder">${cleandisc.split(".")[0]}</p>
                </div>
              </div>`
              document.getElementById("Doaa_section").innerHTML = cartona
              display_anbia_doaa()
    }
}


function display_anbia_doaa(){
    let final_data = data["أدعية الأنبياء"]
    let cartona =``
    for(let i=0;i<final_data.length;i++){
        let cleanText = final_data[i].content
    .replace(/\\n/g, '')      
    .replace(/"/g, '')  
    .replace(/,/g, '')  
    .replace(/'/g, '')       
    .trim();  
    
    let cleandisc = final_data[i].description.replace(/\.\s*\[/, ' [').replace(/\\n/g, '')      
    .replace(/"/g, '')  
    .replace(/,/g, '')  
    .replace(/'/g, '') .trim()

        cartona+=` <div
                id="reading_Doaa"
                class="inner rounded-5 reading_morn_zekr the_zekr py-5 mt-5"
                style="
                  background-color: #0a2147;
                  height: fit-content;
                  overflow-y: auto;
                "
              >
                <div class="d-flex flex-column">
                  <h2 id="Doaa" class="zekr_content text-center mt-5 " style="cursor: pointer; color: #e8d69f; line-height:80px;" >${cleanText.split(".")[0]}</h2>
                  <p class="text-center text-white mt-4 fs-3 fw-bolder">${cleandisc.split(".")[0]}</p>
                </div>
              </div>`
              document.getElementById("anbia_section").innerHTML = cartona
    }
}

get_Doaa()










































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