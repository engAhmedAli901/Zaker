let finaldata
let country = document.getElementById("country")
let city = document.getElementById("city")
country.addEventListener("input",()=>{
    get_pray_time(country.value,city.value)
})
city.addEventListener("input",()=>{
    get_pray_time(country.value,city.value)
})
async function get_pray_time(country,city){
    if(country=="" || city=="") return;
    let response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=5`)
     let data = await response.json()
     finaldata = data.data
     let day = parseInt(finaldata.date.hijri.day)
     let month = finaldata.date.hijri.month.ar
     let year = finaldata.date.hijri.year
    console.log(finaldata.timings);
    document.querySelectorAll(".date_time").forEach(item=>{
        item.innerHTML = `${day} ${month} ${year} هجريا`
    })
    function timing(thepray){
        let [hours,minutes] = thepray.split(":")
        hours = Number(hours)
        hours= hours-12
        return `${hours}:${minutes}`
    }
    let asr = timing(finaldata.timings.Asr)
    let magreb = timing(finaldata.timings.Maghrib)
    let isha = timing(finaldata.timings.Isha)
    document.getElementById("fajr_time").innerHTML =`${finaldata.timings.Fajr} ص `
    document.getElementById("shrok_time").innerHTML =`${finaldata.timings.Sunrise}   ص `
    document.getElementById("zohr_time").innerHTML =`${finaldata.timings.Dhuhr}  ص `
    document.getElementById("asr_time").innerHTML =`${asr}   م `
    document.getElementById("magreb_time").innerHTML =`${magreb}م  `
    document.getElementById("isha_time").innerHTML =`${isha} م  `
    console.log(finaldata.meta.timezone);
    
}
get_pray_time("egypt","cairo")




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