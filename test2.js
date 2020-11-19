class Drumkit{
    constructor(){
        this.pads = document.querySelectorAll(".pad") //oznaci sve padove ali ne po brojevima
        this.kickAudio = document.querySelector(".kick-audio")
        this.snareAudio = document.querySelector(".snare-audio")
        this.hihatAudio = document.querySelector(".hihat-audio")
        this.index = 0;
        this.bpm = 150;
        this.playButton = document.querySelector(".play")
        this.isPlaying = null;
        this.selects = document.querySelectorAll("select")
        this.muteButtons = document.querySelectorAll(".mute")
        this.tempoSlider = document.querySelector(".tempo-slider")
       
    }
    repeat(){
        let step = this.index %8; //step je ogranicen dok index nije, ali cilj je kontrolirat step
        //const activeBars = document.querySelectorAll(`.b${step}`)
        //Loop over the pads
        //console.log(step)
        //console.log(`step${step} and index${this.index}`)
        const activeBars = document.querySelectorAll(`.b${step}`) //selectira trenutno aktivne padove, po brojevima
        //console.log(activeBars)                                //s obzirom kako se pomice step
        //Loop over the pads   
        activeBars.forEach(bar=>{
            bar.style.animation=`playTrack 0.3s alternate ease-in-out 2` //dodavanje animacije svakom
            if(bar.classList.contains("active")){
                if(bar.classList.contains("kick-pad")){
                    this.kickAudio.play();
                    this.kickAudio.currentTime = 0;
                }
                if(bar.classList.contains("snare-pad")){
                    this.snareAudio.play();
                    this.snareAudio.currentTime = 0;
                }
                if(bar.classList.contains("hihat-pad")){
                    this.hihatAudio.play();
                    this.hihatAudio.currentTime = 0;
                }
            }
        })
        

        this.index++;

    }
    /*start(){ //definira se interval u kojem se ponavljanja repeat() metode
        const interval = (60/this.bpm)*1000;
        setInterval(()=>{
            this.repeat();
        }, interval)
        
    }*/
    start(){ //definira se interval u kojem se ponavljanja repeat() metode
        const interval = (60/this.bpm)*1000;
        //Check if it's playing, sada se interval kreira ili cleara
        if(!this.isPlaying){ //dok se je prije odmah samo kreirao
            this.isPlaying = setInterval(()=>{ //stavlja interval za this.repeat();
                this.repeat();                //this.isPlaying nece biti null
            }, interval)
        }else{
            clearInterval(this.isPlaying);
            console.log(this.isPlaying);
            this.isPlaying = null;
        }
        
        
    }
    activePad(){
        this.classList.toggle("active"); //ide toggle, a ne active
    }
    updateButton(){ //ovo se odnosi na playButton samo
        if(!this.isPlaying){
            this.playButton.innerText = "Stop";
            this.playButton.classList.add("active");
        }else{
            this.playButton.innerText = "Play"
            this.playButton.classList.remove("active");
        }
    }
    changeSound(e){
        const selectionName = e.target.name;
        const selectionValue = e.target.value;
        switch(selectionName){
            case "kick-select":
                this.kickAudio.src = selectionValue;
            case "snare-select":
                this.snareAudio.src = selectionValue;
                break;
            case "hihat-select":
                this.hihatAudio.src = selectionValue;
                break;
        }
    }
    
    mute(e){
        const muteIndex = e.target.getAttribute("data-track")
        e.target.classList.toggle("active"); //klikom aktiviramo "active" ili ga micemo
        if(e.target.classList.contains("active")){
            switch(muteIndex){
                case "0":
                    this.kickAudio.volume = 0;
                    break;
                case "1":
                    this.snareAudio.volume = 0;
                    break;      
                case "2":
                    this.hihatAudio.volume = 0;
                    break;
            }
                
        }else{ //odnosno ako nije aktiviran active
            switch(muteIndex){
                case "0":
                    this.kickAudio.volume = 1;
                     break;
                case "1":
                    this.snareAudio.volume = 1;
                    break;
                case "2":
                    this.hihatAudio.volume = 1;
                    break;
            }       
        }
    }
    changeTempo(e){ //mjenjamo vrijednost this.bpm i tempoText.innerText
        const tempoText = document.querySelector(".tempo-number")
        this.bpm = e.target.value;
        tempoText.innerText = e.target.value
    }
    updateTempo(e){ 
        this.bpm = e.target.value
        clearInterval(this.isPlaying);
        this.isPlaying = 0;
        const playButton = document.querySelector(".play");
        if(playButton.classList.contains("active")){ //ako ima active znaci da je updateButton() dodao active
            this.start();                 // pa je start() vec pokrenut i sada ce samo nastavit
        }
    }
    
}



const drumkit1 = new Drumkit(); //repeat,start i activePad se nalaze u prototypu
//console.log(drumkit1); //ode ne invokamo funkciju
//drumkit1.start(); //ode tek invokamo funkciju

drumkit1.pads.forEach(pad=>{
    pad.addEventListener("click", drumkit1.activePad);
    pad.addEventListener("animationend", function(){
        this.style.animation = "";
    })
})

//const playButton = document.querySelector(".play") ovo ne moze ovako
drumkit1.playButton.addEventListener("click",()=>{
    drumkit1.updateButton();
    drumkit1.start();
})

drumkit1.selects.forEach(select => {
    select.addEventListener("change", function(e){
        drumkit1.changeSound(e);
    })
})

drumkit1.muteButtons.forEach(button=>{
    button.addEventListener("click", function(e){
        drumkit1.mute(e)
    })
})

drumkit1.tempoSlider.addEventListener("input", function(e){
    drumkit1.changeTempo(e);
})
drumkit1.tempoSlider.addEventListener("change", function(e){
    drumkit1.updateTempo(e);
})
    