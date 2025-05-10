var mode = 0

var keyPressCount

var osc1 = []
var osc2 = []
var osc3 = []

var counter1 = 0
var counter2 = 0
var currentTime1 = 0
var currentTime2 = 0

let beat1
let beat1Env
let vars1 = [500,1000,500]

let beat2
let beat2Env
let vars2 = [250,250,250,250,250,250,250]

let audioStarted = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  splash = new Splash();
  
    for (let i = 0; i <= 5; i++) {
    osc1[i] = new planeX(i);
  }

  for (let i = 0; i <=3; i++){
    osc2[i] = new planeY(i);
  }
  
  for (let i = 0; i <=3; i++){
    osc3[i] = new drone(i);
  }

  beat1 = new p5.Oscillator('sawtooth')
  beat1.amp(0)
  beat1.freq(0)
 
  beat1.start();
  beat1Env = new p5.Envelope (0.01,1,0.1,0.1)
  beat1Env.play(beat1);
  
  beat2 = new p5.Oscillator('triangle')
  beat2.amp(0)
  beat2.freq(0)
  
  beat2.start();
  beat2Env = new p5.Envelope (0.01,1,0.1,0.1)
  beat2Env.play(beat2);
  
  tempoSlider1 = createSlider(0,400)
  tempoSlider1.position(50,50)
  tempoSlider1.hide()
  
  tempoSlider2 = createSlider(0,400)
  tempoSlider2.position(200,50)
  tempoSlider2.hide()
  
  freqSlider2 = createSlider(0,600)
  freqSlider2.position(350,50)
  freqSlider2.hide()
  
  fft1 = new p5.FFT();
  fft1.setInput(beat1)
  
  fft2 = new p5.FFT();
  fft2.setInput(beat2)

  keyPressCount = 128  
  
}

function draw() {
  if (mouseIsPressed == true && splash.update() == true) {
    mode = 1;
  }
  
  if (mode == 1) {
    splash.hide();
    
  tempoSlider1.show()
  tempoSlider2.show()
  freqSlider2.show()

  tempo1 = tempoSlider1.value()
  tempo2 = tempoSlider2.value()
  
    background(keyPressCount);

  if (keyIsPressed == true && key == 'o')
    background(random(16,224), random(16,224),random(16,224))


    let waveform1 = fft1.waveform()
    noFill();
    beginShape();
  
    stroke(255)
    strokeWeight(2)
    for (let i = 0; i < waveform1.length; i = i+16){
      let x = map(i, 0, waveform1.length, 0, width);
      let y = map(waveform1[i], -1, 1, 0, height);
      vertex (x,y)
  }
  endShape()

  
    let waveform2 = fft2.waveform()
    noFill();
    beginShape();
  
    stroke(0)
    strokeWeight(2)
    for (let i = 0; i < waveform2.length; i = i+16){
      let x = map(i, 0, waveform2.length, 0, width);
      let y = map(waveform2[i], -1, 1, 0, height);
      vertex (x,y)
  }
  endShape()

  for (let i = 0; i <= 5; i++) {
    osc1[i].update();
  }

  for (let i = 0; i <=2; i++){
    osc2[i].update();
  }  
  
  frameRate(25)

  
  if (millis() > currentTime1+vars1[counter1]-tempo1){
    currentTime1 = millis()
      counter1++
    if (keyIsPressed == true && key == 'a')
      beat1.freq(110);
    else if (keyIsPressed == true && key == 'b')
      beat1.freq(123.5)
    else if (keyIsPressed == true && key == 'c')
      beat1.freq(131)
    else if (keyIsPressed == true && key == 'd')
      beat1.freq(147)
    else if (keyIsPressed == true && key == 'e')
      beat1.freq(165)
    else if (keyIsPressed == true && key == 'f')
      beat1.freq(174.5)
    else if (keyIsPressed == true && key == 'g')
      beat1.freq(196)
    else if (keyIsPressed == true && key == 'z')
      beat1.freq(0)
 
    beat1Env.play(beat1);
    if(counter1 > 2){
      counter1 = 0
  }
}
  
  if (millis() > currentTime2+vars2[counter2]-tempo2){
    currentTime2 = millis()
      counter2++
    
    beat2.freq(random(55,220)+freqSlider2.value());
    beat2Env.play(beat2);
    if(counter2 > 6){
      counter2 = 0
  }
     
  if (keyIsPressed == true && key == 'n')
    beat2.freq(0)
}
  
  }    

}

function keyPressed(){
  if (key === '1')
    keyPressCount = ("crimson")
  
  if (key === '2')
    keyPressCount = ("forestGreen")

  if (key === '3')
    keyPressCount = ("navy")
  
  if (key === '7')
    keyPressCount = ("yellow")
  
  if (key === '8')
    keyPressCount = ("violet")
  
  if (key === '9')
    keyPressCount = ("aqua")

  if (key === 'r')
    keyPressCount = (128)
}

class planeX{
  constructor(startingFreq){
    this.startingFreq = random(55,220);
    
    this.osc1 = new p5.Oscillator("triangle")
    this.newFreq = (this.startingFreq)*2.5
    this.osc1.freq(this.newFreq)
    this.osc1.phase(random(110,440))
    this.osc1.amp(0.05)
    this.osc1.start()
  }
  
  update(){
    this.osc1.freq(mouseX + this.newFreq)
  }
}

class planeY{
  constructor(){
    this.startingFreq = random(220,880);
    
    this.osc2 = new p5.Oscillator("sawtooth")
    this.newFreq = (this.startingFreq)*2
    this.osc2.freq(this.newFreq)
    this.osc2.phase(random(440,1760))
    this.osc2.amp(0.05)
    this.osc2.start()
  }
  
  update(){
    this.osc2.freq(-mouseY + this.newFreq)
  }
}

class drone {
  constructor(startingFreq){
    this.startingFreq = random(110,440);
    
    this.osc3 = new p5.Oscillator("sine")
    this.newFreq = (this.startingFreq);
    this.osc3.freq(this.newFreq);
    this.osc3.phase(random(55,110))
    this.osc3.amp(0.05)
    this.osc3.start()
  }
}

function mousePressed() { // needed to get it to work in full screen mode
    // Start audio on user gesture
    if (!audioStarted) {
        userStartAudio();
        audioStarted = true;
    }
}