const apiurl='https://mp3quran.net/api/v3';
const endpoint='reciters';
const language='ar';

async function getReciters(){   ///hefz sam
     const ChooseReciter=document.querySelector('#ChooseReciter')
    const res=await fetch(`${apiurl}/reciters?${language}`)/// ///hefz sam
    const data=await res.json()     ///hefz sam
    ChooseReciter.innerHTML+=`<option value="">اختر قارئ</option>`; /// عرض ال api  al qare

    data.reciters.forEach(reciter =>
        ChooseReciter.innerHTML+=`<option value="${reciter.id}">${reciter.name}</option>`); /// عرض ال api  al qare
    ChooseReciter.addEventListener('change',e=> getMoshaf(e.target.value))   /// ba3d ektyar khyar yenkl 3al khyar ely ba3do   
}
getReciters()    ///hefz sam
/////////////////////////////////////////////////////nofs elkalam
async function getMoshaf(reciter){   ////nafs elkalam fok 
    const chooseMoshaf=document.querySelector('#chooseMoshaf')

const res=await fetch(`${apiurl}/reciters?language=${language}&reciter=${reciter}`)/// ///hefz sam
const data=await res.json()     ///hefz sam
const moshafs=data.reciters[0].moshaf
chooseMoshaf.innerHTML =`<option value="" data-server="" data-surahList="">اختر مصحف</option>`

moshafs.forEach(moshaf =>{
    chooseMoshaf.innerHTML +=`<option value="${moshaf.id}" data-server="${moshaf.server}" data-surahList="${moshaf.surah_list}">${moshaf.name}</option>`})
; /// عرض ال api  al qare
chooseMoshaf.addEventListener('change',e=> {
    const selectedMoshaf=chooseMoshaf.options[chooseMoshaf.selectedIndex]
    const surahServer=selectedMoshaf.dataset.server;
    const surahList=selectedMoshaf.dataset.surahlist;


    getSurah(surahServer,surahList)  /// ba3d ektyar khyar yenkl 3al khyar ely ba3do
})
}
////////////////////////////////////////////////////////////////

async function getSurah(surahServer,surahList){   ////nafs elkalam fokm
    const chooseSurah=document.querySelector('#chooseSurah')
    const res= await fetch(`https://mp3quran.net/api/v3/suwar`)/// ///hefz sam
    const data= await res.json()     ///hefz sam
    const surahNames=data.suwar;
    surahList = surahList.split(',')
    chooseSurah.innerHTML =`<option value="">اختر سوره</option>`
    surahList.forEach(surah => {
        const padSurah = surah.padStart(3,'0')
        surahNames.forEach(surahName=>{
            if(surahName.id==surah){
                chooseSurah.innerHTML+=`<option value="${surahServer}${padSurah}.mp3">${surahName.name}</option>`
            }
        })
    })

; /// عرض ال api  al qare
chooseSurah.addEventListener('change',e=> {
    const selectedSurah=chooseSurah.options[chooseSurah.selectedIndex]
    playSurah(selectedSurah.value)
    
})

}
function playSurah(surahMp3){
    const audioplayer=document.querySelector('#audioplayer')
    audioplayer.src=surahMp3
    audioplayer.play()
}



////////////////////live chanal/////////

///    <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script> import to html page in the top
/////
function  playLive (channel) {
    if(Hls.isSupported()) {
        var video = document.getElementById('vvedio');
        var hls = new Hls();
        hls.loadSource(`${channel}`);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED,function() {
          video.play();
      });
     }
    }