# beat-makerino	
Link to web app:
https://beat-makerino.netlify.app/ <br/>
Vannila Javascript  <br/>
For the code look at test2.js, idea is to build a function "start" that will call function "repeat" by creating an interval using setInterval(()=>this.repeat, interval).
Step will be incremented and by document.querySelectorAll() we will be selecting pads and based on the increment. We will give them the sound property by clicking on them (adding this.classList.toggle("active")) so if paad contains that classList it will play some sound
