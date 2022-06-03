
Webcam.set({
   width:350,
   height:300,
   image_format:'png',
   png_quality:90
});

camera=document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
   Webcam.snap(function(data_uri){
       document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
   });
}

console.log('ml5 version:',ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/uaODDIvkH//model.json',modelLoaded);

function modelLoaded(){
   console.log('model loaded');
}

function speak(){
   var synth=window.speechSynthesis;
   var utterThis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
   synth.speak(utterThis);
}

function check(){
   img=document.getElementById('captured_image');
   classifier.classify(img, gotResult);
}

function gotResult(error,results){
   if(error){
       console.error(error);
   }else{
       console.log(results);
       document.getElementById("result_emotion_name").innerHTML=results[0].label;
       gesture=results[0].label;
       toSpeak="";
       if(gesture=="Amazing"){
           toSpeak="this is looking Amazing";
           document.getElementById('update_emoji').innerHTML="&#128076;";
       }
       else if(gesture=="Best"){
        toSpeak="All the Best";
           document.getElementById('update_emoji').innerHTML="&#128077;";
       }
       else if(gesture=="Victory"){
        toSpeak="that was marvelous victory";
           document.getElementById('update_emoji').innerHTML="&#9996;";
       }
       speak();
   }
}