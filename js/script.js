
var uploaded = false;
var image4 = new Image();
var photoprofile = true;
window.fbAsyncInit = function () {
    FB.init({
        appId:'425373804271654', 
        xfbml: true,
        version: 'v2.0'
    });

    FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {

            var uid = response.authResponse.userID;
            var accessToken = response.authResponse.accessToken;
            window.authToken = accessToken;
            FB.api('/me', function (response) {
                   
				FB.api('/me/picture?type=large', function(response) { // normal/large/squere 
                    $('#preview1').attr("src",response.data.url);
				});
            });
        } else if (response.status === 'not_authorized') {
            console.log("this user is not authorizied your apps");
            FB.login(function (response) {
            // FB.api('/me/feed', 'post', {message: 'I\'m started using FB API'});
                if (response.authResponse) { // if user login to your apps right after handle an event
                    window.location.reload();
                };
            }, {
                scope: 'user_photos,publish_actions'
            });
        } else {
            console.log("this isn't logged in to Facebook.");
            FB.login(function (response) {
                if (response.authResponse) {
                    window.location.reload();
                } else {
                    //alertify.alert('An Error has Occurs,Please Reload your Pages');
                }
           });
        }
    });


//以下為canvas的程式碼，基本上不需多動，依據comments修改即可
    
    //起始畫面
    var ctx = document.getElementById('canvas').getContext('2d'); //宣告變數找到頁面的canvas標籤的2d內容
    ctx.font='20px "Arial"'; //設定字體與大小
    ctx.fillText("Click here to start fill with Facebook Profile Picture", 40, 270); //設定預設的開始畫面
 /*   var img = new Image(); // 新增圖像1
    img.src = "img/overlay.png"; //圖像路徑（路徑自己設，且自己加入想要的圖層）
    var img2 = new Image(); //新增圖像2
    img2.src = "img/overlayback.png" //圖像路徑*/
    
    var img  = new Image();//新增文字圖層
    img.src = "img/typography.png"//圖像路徑
    var img1 = new Image();//新增frame圖層 
    img1.src = "img/frame_1.png" 
    var img2 = new Image();//新增frame圖層 
    img2.src = "img/frame_2.png"    
    var img3 = new Image();//新增frame圖層 
    img3.src = "img/frame_3.png"
    
    

    //宣告基本變數
    var canvas=document.getElementById("canvas"); //宣告變數找到canvas標籤
    var ctx=canvas.getContext("2d"); //找到2d內容
    var canvasOffset=$("#canvas").offset();//找到offset
    var offsetX=canvasOffset.left;//左方
    var offsetY=canvasOffset.top;//上方
    var canvasWidth=canvas.width;//大小
    var canvasHeight=canvas.height;//高度
    var isDragging=false;//拖拉

    function handleMouseDown(e){//滑鼠按下的函數
      canMouseX=parseInt(e.clientX-offsetX);//抓滑鼠游標X
      canMouseY=parseInt(e.clientY-offsetY);//抓滑鼠游標y
      // set the drag flag
      isDragging=true;//宣告拖拉變數
    }

    function handleMouseUp(e){//滑鼠放掉的函數
      canMouseX=parseInt(e.clientX-offsetX);
      canMouseY=parseInt(e.clientY-offsetY);
      // clear the drag flag
      isDragging=false;
    }

    function handleMouseOut(e){//滑鼠移開的函數
      canMouseX=parseInt(e.clientX-offsetX);
      canMouseY=parseInt(e.clientY-offsetY);
      // user has left the canvas, so clear the drag flag
      isDragging=false;
    }

    function handleMouseMove(e){//滑鼠移動的event
      canMouseX=parseInt(e.clientX-offsetX);
      canMouseY=parseInt(e.clientY-offsetY);
      console.log(canMouseX,canMouseY);
      // if the drag flag is set, clear the canvas and draw the image
      if(isDragging){ //當拖拉為True時
            ctx.clearRect(0,0,canvasWidth,canvasHeight); //移除canvas起始的內容
            
             if(uploaded === true){
                ctx.drawImage(image4, 0 , 0 , image4.width, image4.height);
            }
            else if(document.getElementById("selectid").value === "frame_1"){
                ctx.drawImage(img1, 0 , 0);
            }
            else if(document.getElementById("selectid").value === "frame_2"){
                ctx.drawImage(img2, 0 , 0);
            }
            else if(document.getElementById("selectid").value === "frame_3"){
                ctx.drawImage(img3, 0 , 0);
            }            

            var profileIMG = document.getElementById("preview1");//抓html裡預載入的照片
            profileIMG.crossOrigin = "Anonymous"; // 這務必要做，為了讓Facebook的照片能夠crossdomain傳入到你的頁面，CORS Policy請參考https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image 
            ctx.drawImage(profileIMG,canMouseX-(profileIMG.width/2),canMouseY-(profileIMG.height/2));//從XY軸0，0值開始畫如profileimg

            ctx.drawImage(img,200,400); //劃入img3，並根據你的滑鼠游標移動，你可以自行更換想要移動的圖層，數值會因XY軸向有所不同
            var inputedText = $('#inputed').val();//抓取頁面inputed ID的內容
            ctx.fillStyle = "black"; //字體顏色
            ctx.font='20px "微軟正黑體"'; //字體大小和字形
            ctx.fillText(inputedText, 350,550); //字體也可以依據滑鼠游標移動，所輸入的值可自行調整，若不想移動輸入的字體，可以把它改成（inputedText,0,0)X Y軸 0，0的位置
      }
    }

    //抓取滑鼠移動的event
    $("#canvas").mousedown(function(e){handleMouseDown(e);});
    $("#canvas").mousemove(function(e){handleMouseMove(e);});
    $("#canvas").mouseup(function(e){handleMouseUp(e);});
    $("#canvas").mouseout(function(e){handleMouseOut(e);});


//可以思考這程式要放在init內還是init外?




}; //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<init end

function getMyAlbum(response) {

    $("#albumGET").remove();

    FB.api('/me/albums?fields=id,name', function(response) {
        for (var i = 0; i < response.data.length; i++) {
            var album = response.data[i];
            $("#album").append("<option value="+album.id + ">"+ album.name + "</option>");

        }
    });

    $("#album").change(function(){
        $("#photo").html(" ");
        var e=this.options[this.selectedIndex].value;
        console.log(e)
        var t= e+"/photos";
                console.log(t)

        FB.api(t,function(e){
            console.log(e);
            for(var t=0;t<e.data.length;t++){
                $("#photo").append("<option value="+e.data[t].id+">"+e.data[t].name+"</option>");
                $('#preview1').attr("src",e.data[t].images[0].source);
                console.log("ccc",e.data[t].images[0].source);
            }
        });
    });
};

function change_select () {
    uploaded = false;
}

function render(src){  
        image4 = new Image();  
        image4.onload = function(){  
            var canvas = document.getElementById("canvas");   
            if(image4.height > 540 || image4.width>540) {  
                image4.width = 540 ;  
                image4.height = 540;  
            }  
            var ctx = canvas.getContext("2d");  
            // clear canvas  
            ctx.clearRect(0, 0, canvas.width, canvas.height);                 
            ctx.drawImage(image4, 0, 0, image4.width, image4.height); 
        };  
    image4.src = src;  
}; 

function setImage(files){
    console.log(files[0]);
    console.log(files[0].type);
    uploaded = true;

    if(files[0].type === "image/png"){
        var reader = new FileReader();
        reader.onload = function(e){  
            // use render function  
            render(e.target.result);  
        }; 
        reader.readAsDataURL(files[0]);
    }
    else{
        alert("Wrong file type. \nMust be an 'png' image type.");
    }
}

   




//LOAD FACEBOOK SDK ASYNC，這是基本的東西，應該不用多說了吧
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js"; 
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));





// Post a BASE64 Encoded PNG Image to facebook，以下程式為把照片po到facebook的方法，基本上這樣就可以不用動了，但思考authToken該怎麼拿到，因為這裡我並沒有把使用者登入的token載入到這函數內，所以它是不會得到token的
function PostImageToFacebook(authToken) {
    $('.info').append('<img src="img/loading.gif"/>')//載入loading的img
    var canvas = document.getElementById("canvas");//找canvas
    var imageData = canvas.toDataURL("image/png");//把canvas轉換PNG
    try {
        blob = dataURItoBlob(imageData);//把影像載入轉換函數
    } catch (e) {
        console.log(e);//錯誤訊息的log
    }
    var fd = new FormData();
    fd.append("access_token", authToken);//請思考accesstoken要怎麼傳到這function內
    fd.append("source", blob);//輸入的照片
    fd.append("message", "這是HTML5 canvas和Facebook API結合教學");//輸入的訊息
    try {
        $.ajax({
            url: "https://graph.facebook.com/me/photos?access_token=" + authToken,//GraphAPI Call
            type: "POST",
            data: fd,
            processData: false,
            contentType: false,
            cache: false,
            success: function (data) {
                console.log("success " + data);//成功log + photoID
                  $(".info").html("Posted Canvas Successfully. [<a href='http://www.facebook.com/photo.php?fbid=" + data.id + " '>Go to Profile Picture</a>] "); //成功訊息並顯示連接
                  $(".settingprofile").html("[<a href='http://www.facebook.com/photo.php?fbid=" +data.id + "&type=1&makeprofile=1&makeuserprofile=1'>Set this picture as your Profile Picture</a>] ");
                  $(".settingcover").html("[<a href='http://www.facebook.com/profile.php?preview_cover=" + data.id + "'>Set this picture as your Cover Picture</a>] ");
            },
            error: function (shr, status, data) {
                $(".info").html("error " + data + " Status " + shr.status);//如果錯誤把訊息傳到class info內
            },
            complete: function () {
                $(".info").append("Posted to facebook");//完成後把訊息傳到HTML的div內
            }
        });

    } catch (e) {
        console.log(e);//錯誤訊息的log
    }
}

//comment script
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/zh_TW/sdk.js#xfbml=1&appId=425373804271654&version=v2.0";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

//like button script
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/zh_TW/sdk.js#xfbml=1&appId=425373804271654&version=v2.0";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


// Convert a data URI to blob把影像載入轉換函數
function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {
        type: 'image/png'
    });
}

