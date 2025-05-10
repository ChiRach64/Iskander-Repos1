class Splash {

 constructor() {
   
  this.splashBorder = 100;
  fill(32);
  stroke("limeGreen")
  strokeWeight(3)
  rect(this.splashBorder, this.splashBorder, windowWidth-this.splashBorder*2, windowHeight-this.splashBorder*2);
  // draw a rectangle like this in a 3D enviornment
  // rect(this.splashBorder-(windowWidth/2), this.splashBorder-(windowHeight/2), windowWidth-this.splashBorder*2, windowHeight-this.splashBorder*2);
  fill("limeGreen");
  strokeWeight(5)
   
  line(windowWidth-this.splashBorder-40, this.splashBorder+20,windowWidth-this.splashBorder-20, this.splashBorder+40)
   line(windowWidth-this.splashBorder-20, this.splashBorder+20,windowWidth-this.splashBorder-40, this.splashBorder+40)
   
  this.title = createDiv("MusicTron");
  this.title.style('color:limeGreen');
  this.title.style('font-family: Arial, Helvetica, sans-serif');
  this.title.position(this.splashBorder+20, this.splashBorder+20)
  
  this.name = createDiv("Hayden Iskander");
  this.name.position(this.splashBorder+20, this.splashBorder+60);
  this.name.style('color:limeGreen');
  this.name.style('font-family: Arial, Helvetica, sans-serif');
  
  this.info = createDiv("This is my final project, which I'm calling MusicTron, for lack of a better name. It's essentially an interactive musical instrument, using a combination of sustained oscillators, beat oscillators with envelopes. Both of which can be manipulated either by sliders, or by various key commands. <p> The first beat oscillator can be manipulated with various key presses:'a' 'b' 'c' 'd' 'e' 'f' and 'g' as well as the first slider, and can be stopped with 'z' The second beat oscillator can be manipulated with the second and third sliders, or can be paused by pressing 'n'. Finally, the background can also be altered with key presses '1' '2' '3' '7' '8' '9' and 'o'. <p> <a href=https://editor.p5js.org/bcjacobs/sketches/IhHSvjyZJ>view code</a>");
   this.info.style('font-family: Arial, Helvetica, sans-serif');
   this.info.style('color:limeGreen')
  
  this.info.position(this.splashBorder+20, this.splashBorder+100);
  this.info.size(windowWidth-this.splashBorder*2-50, windowHeight-this.splashBorder*2-50)
   

  
}
  
  update(){
       if(mouseX > windowWidth-this.splashBorder-40 && 
          mouseX < windowWidth-this.splashBorder-20 
          && mouseY < this.splashBorder+40 
          && mouseY > this.splashBorder+20
     ){
     return true
   }
  }
 
  hide(){
    this.title.remove()
    this.name.remove()
    this.info.remove()
  }
}

