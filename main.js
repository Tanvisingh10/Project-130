song1 = "";
song2 = "";
score_leftWrist = 0;
score_rightWrist = 0;
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
status_song1 = "";
status_song2 = "";

function preload(){
    song1 = loadSound("believer.mp3");
    song2 = loadSound("dance_monkey.mp3");
}
function setup(){
    canvas = createCanvas(570,500);
    canvas.position(430,185);
    video = createCapture(VIDEO);
    video.hide();

poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses);
}
function draw(){
    image(video, 0,0, 570,500);
    fill('#FC0303');
    stroke('#FC0303');
    status_song1 = song1.isPlaying();
    status_song2 = song2.isPlaying();
    if(score_leftWrist > 0.2){
        circle(leftWristX - 60,leftWristY,20);
      
   
        if(status_song1 == "false"){
            song2.stop();
            song1.play();
          }
          else{
            document.getElementById("songname").innerHTML = "Playing : Believer";
            song2.stop();
            song1.play();
          }
        }
          if(score_rightWrist > 0.2){
            circle(rightWristX - 30,rightWristY,20);
           
       
            if(status_song2 == "false"){
                song1.stop();
                song2.play();
              }
              else{
                document.getElementById("songname").innerHTML = "Playing : Dance Monkey";
                   song1.stop();
                song2.play();  
            } 
            }
}
function modelLoaded(){
console.log('PoseNet is initialized');
}
function gotPoses(results){
if(results.length > 0){
    console.log(results);
    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);

    score_leftWrist = results[0].pose.keypoints[9].score;
    score_rightWrist = results[0].pose.keypoints[10].score;
}
}
