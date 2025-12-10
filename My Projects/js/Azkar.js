let data
async function get_Zekr(){
    let response = await fetch(`https://raw.githubusercontent.com/nawafalqari/azkar-api/56df51279ab6eb86dc2f6202c7de26c8948331c1/azkar.json`)
     data = await response.json()
    console.log(data["أذكار المساء"]);
}
get_Zekr()
function display_morning_Zekr(){
    let final_data = data["أذكار الصباح"]
    let cartona =``
    for(let i=0;i<final_data.length;i++){
        if(i==12){
            i=i+1
            if(i==0){
            for(let y=0;y<4;y++){
                cartona+= `<span style="line-height:80px;">${final_data[i][y].content}</span>
                <br />
                <br />
                <button onclick="decrease(this)" class="countBtn btn pb-3 rounded-4  text-center" style="background-color:#E0C986">                <span class="fs-3 text-bl fw-medium"> عدد المرات :  ${final_data[i][y].count}</span>
</button>
                <br />
                <br />`
            }
        }
        else{
            cartona+= `<span style="line-height:80px;">${final_data[i].content}</span>
                <br />
                <br />
                <button onclick="decrease(this)" class="btn pb-3 rounded-4  text-center" style="background-color:#E0C986">                <span class="fs-3 text-bl fw-medium"> عدد المرات :  ${final_data[i].count}</span>
</button>                <br />
                <br />`
        }
        }
        else{
            if(i==0){
            for(let y=0;y<4;y++){
                cartona+= `<span style="line-height:80px;">${final_data[i][y].content}</span>
                <br />
                <br />
                <button onclick="decrease(this)" class="btn pb-3 rounded-4  text-center" style="background-color:#E0C986">                <span class="fs-3 text-bl fw-medium"> عدد المرات :  ${final_data[i][y].count}</span>
</button>
                <br />
                <br />`
            }
        }
        else{
            cartona+= `<span style="line-height:80px;">${final_data[i].content}</span>
                <br />
                <br />
                <button onclick="decrease(this)" class="btn pb-3 rounded-4  text-center" style="background-color:#E0C986">                <span class="fs-3 text-bl fw-medium"> عدد المرات :  ${final_data[i].count}</span>
</button>                <br />
                <br />`
        }
        }
    }
    document.getElementById("morn_zekr").innerHTML = cartona
    document.querySelector(".reading_morn_zekr").classList.remove("d-none")
     if(window.innerWidth<770){
        window.scrollTo({
  top: 200,
  behavior: "smooth"
});

    }
}

function display_evening_Zekr(){
    get_Zekr()
    let final_data = data["أذكار المساء"]
    let cartona =``
    for(let i=0;i<final_data.length;i++){
           cartona+= `<span style="line-height:80px;">${final_data[i].content}</span>
                <br />
                <br />
                <button onclick="decrease(this)" class="btn pb-3 rounded-4  text-center" " style="background-color:#E0C986"><span class="fs-3 text-bl fw-medium"> عدد المرات :  ${parseInt(final_data[i].count)}</span>
                </button>               
                <br />
                <br />`
        }
    document.getElementById("morn_zekr").innerHTML = cartona
     document.querySelector(".reading_morn_zekr").classList.remove("d-none")
      if(window.innerWidth<770){
        window.scrollTo({
  top: 200,
  behavior: "smooth"
});

    }
}

function display_sleep_Zekr(){
    get_Zekr()
    let final_data = data["أذكار النوم"]
    let cartona =``
    for(let i=0;i<final_data.length;i++){
           cartona+= `<span style="line-height:80px;">${final_data[i].content}</span>
                <br />
                <br />
                <button onclick="decrease(this)" class="btn pb-3 rounded-4  text-center" " style="background-color:#E0C986"><span class="fs-3 text-bl fw-medium"> عدد المرات :  ${parseInt(final_data[i].count)}</span>
                </button>               
                <br />
                <br />`
        }
    document.getElementById("morn_zekr").innerHTML = cartona
     document.querySelector(".reading_morn_zekr").classList.remove("d-none")
      if(window.innerWidth<770){
        window.scrollTo({
  top: 200,
  behavior: "smooth"
});

    }
}

function display_weakup_Zekr(){
    get_Zekr()
    let final_data = data["أذكار الاستيقاظ"]
    let cartona =``
    for(let i=0;i<final_data.length;i++){
           cartona+= `<span style="line-height:80px;">${final_data[i].content}</span>
                <br />
                <br />
                <button onclick="decrease(this)" class="btn pb-3 rounded-4  text-center" " style="background-color:#E0C986"><span class="fs-3 text-bl fw-medium"> عدد المرات :  ${parseInt(final_data[i].count)}</span>
                </button>               
                <br />
                <br />`
        }
    document.getElementById("morn_zekr").innerHTML = cartona
     document.querySelector(".reading_morn_zekr").classList.remove("d-none")
      if(window.innerWidth<770){
        window.scrollTo({
  top: 200,
  behavior: "smooth"
});

    }
}


function display_entermasged_Zekr(){
    let cartona =`<span style="line-height:80px;">أعوذ بالله العظيم، وبوجهه الكريم، وسلطانه القديم، من الشيطان الرجيم. اللهم افتح لي أبواب رحمتك</span>
                <br />
                <br />
                <button onclick="decrease(this)" class="btn pb-3 rounded-4  text-center" " style="background-color:#E0C986"><span class="fs-3 text-bl fw-medium"> عدد المرات :  1</span>
                </button>               
                <br />
                <br />`
    document.getElementById("morn_zekr").innerHTML = cartona
     document.querySelector(".reading_morn_zekr").classList.remove("d-none")
      if(window.innerWidth<770){
        window.scrollTo({
  top: 200,
  behavior: "smooth"
});

    }
}

function display_leavemasged_Zekr(){
    let cartona =`<span style="line-height:80px;">اللهم إني أسألك من فضلك</span>
                <br />
                <br />
                <button onclick="decrease(this)" class="btn pb-3 rounded-4  text-center" " style="background-color:#E0C986"><span class="fs-3 text-bl fw-medium"> عدد المرات :  1</span>
                </button>               
                <br />
                <br />`
    document.getElementById("morn_zekr").innerHTML = cartona
     document.querySelector(".reading_morn_zekr").classList.remove("d-none")
      if(window.innerWidth<770){
        window.scrollTo({
  top: 200,
  behavior: "smooth"
});

    }
}

function display_enterhome_Zekr(){
    let cartona =`<span style="line-height:80px;">بسم الله ولجنا، وبسم الله خرجنا، وعلى ربنا توكلنا. اللهم إني أسألك خير المولج وخير المخرج</span>
                <br />
                <br />
                <button onclick="decrease(this)" class="btn pb-3 rounded-4  text-center" " style="background-color:#E0C986"><span class="fs-3 text-bl fw-medium"> عدد المرات :  1</span>
                </button>               
                <br />
                <br />`
    document.getElementById("morn_zekr").innerHTML = cartona
     document.querySelector(".reading_morn_zekr").classList.remove("d-none")
      if(window.innerWidth<770){
        window.scrollTo({
  top: 200,
  behavior: "smooth"
});

    }
}

function display_leavehome_Zekr(){
    let cartona =`<span style="line-height:80px;">بسم الله توكلت على الله، ولا حول ولا قوة إلا بالله</span>
                 <span style="line-height:80px;">اللهم إني أعوذ بك أن أضل أو أُضل، أو أزل أو أُزل، أو أظلم أو أُظلم، أو أجهل أو يُجهل عليّ</span>
                <br />
                <br />
                <button onclick="decrease(this)" class="btn pb-3 rounded-4  text-center" " style="background-color:#E0C986"><span class="fs-3 text-bl fw-medium"> عدد المرات :  1</span>
                </button>               
                <br />
                <br />`
    document.getElementById("morn_zekr").innerHTML = cartona
     document.querySelector(".reading_morn_zekr").classList.remove("d-none")
      if(window.innerWidth<770){
        window.scrollTo({
  top: 200,
  behavior: "smooth"
});

    }
}

function display_beforePray_Zekr(){
    let cartona =`<span style="line-height:80px;">اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُورًا،
وَفِي لِسَانِي نُورًا،
وَفِي سَمْعِي نُورًا،
وَفِي بَصَرِي نُورًا،
وَمِنْ فَوْقِي نُورًا،
وَمِنْ تَحْتِي نُورًا،
وَعَنْ يَمِينِي نُورًا،
وَعَنْ شِمَالِي نُورًا،
وَمِنْ أَمَامِي نُورًا،
وَمِنْ خَلْفِي نُورًا،
وَاجْعَلْ لِي نُورًا.</span>
                <br />
                <br />
                <button onclick="decrease(this)" class="btn pb-3 rounded-4  text-center" " style="background-color:#E0C986"><span class="fs-3 text-bl fw-medium"> عدد المرات :  1</span>
                </button>               
                <br />
                <br />`
    document.getElementById("morn_zekr").innerHTML = cartona
     document.querySelector(".reading_morn_zekr").classList.remove("d-none")
      if(window.innerWidth<770){
        window.scrollTo({
  top: 200,
  behavior: "smooth"
});

    }
}


function display_afterPray_Zekr(){
    get_Zekr()
    let final_data = data["أذكار بعد السلام من الصلاة المفروضة"]
    let cartona =``
    for(let i=0;i<final_data.length;i++){
           cartona+= `<span style="line-height:80px;">${final_data[i].content}</span>
                <br />
                <br />
                <button onclick="decrease(this)" class="btn pb-3 rounded-4  text-center" " style="background-color:#E0C986"><span class="fs-3 text-bl fw-medium"> عدد المرات :  ${parseInt(final_data[i].count)}</span>
                </button>               
                <br />
                <br />`
        }
    document.getElementById("morn_zekr").innerHTML = cartona
     document.querySelector(".reading_morn_zekr").classList.remove("d-none")
}

function decrease(btn){
    let span = btn.querySelector('span')
    let current = parseInt(span.innerText.replace(/\D/g,''));
    if(current==1){
        btn.classList.add("bg-success")
         current= current-1
        span.innerText = `عدد المرات: ${current}`
    }
    else{
        if(current==0){
        return 
    }
    else{
        current= current-1
        span.innerText = `عدد المرات: ${current}`
    }
    }
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
