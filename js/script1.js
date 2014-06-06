// JavaScript Document
window.fbAsyncInit = function () {
	FB.init({
		appId: '425373804271654', //api 2.0 nccu web test
		xfbml: true,
		version: 'v2.0'
	});

	FB.getLoginStatus(function (response) {
		if (response.status === 'connected') {

			var uid = response.authResponse.userID;
			var accessToken = response.authResponse.accessToken;
			window.e = accessToken;
			FB.api('/me', function (response) {
				console.log(response);
				console.log('My links is ' + response.link);
				console.log('My Username is ' + response.name);
				console.log('My ID is ' + response.id);
            });


			FB.api('/me/picture?type=large', function(response) {  // normal/large/squere
				//var str="<img src="+ response.data.url +">";
				$('#preview1').attr("src",response.data.url);
			});

					


		} else if (response.status === 'not_authorized') {
			console.log("this user is not authorizied your apps");
			FB.login(function (response) {
				// FB.api('/me/feed', 'post', {message: 'I\'m started using FB API'});
				if (response.authResponse) { // if user login to your apps right after handle an event
					window.location.reload();
				};
			},{
				scope: 'user_about_me,email,user_location,user_photos,publish_actions,publish_stream,user_birthday,user_likes'
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

	/*--------Canvas Setting----START----------------------------------------------*/
/*	var ctx = document.getElementById('canvas').getContext('2d');
	ctx.font = '20px "Arial"';
	ctx.fillText("Move here to start fill with Facebook Profile Picture", 40, 270);

	var img = new Image(); // load img
    img.src = "img/overlay.png";

    var img2 = new Image();
    img2.src = "img/frame_1.png"
    
    var img3 = new Image();
    img3.src = "img/typography.png"

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var canvasOffset = $("#canvas").offset();
	//console.log(canvasOffset);
    var offsetX = canvasOffset.left;
	console.log(offsetX);

    var offsetY = canvasOffset.top;
	console.log(offsetY);

    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    var isDragging = false;

    function handleMouseDown(e) {
        canMouseX = parseInt(e.clientX - offsetX);
        canMouseY = parseInt(e.clientY - offsetY);
        // set the drag flag
        isDragging = true;
    }

    function handleMouseUp(e) {
        canMouseX = parseInt(e.clientX - offsetX);
        canMouseY = parseInt(e.clientY - offsetY);
        // clear the drag flag
        isDragging = false;
    }

    function handleMouseOut(e) {
        canMouseX = parseInt(e.clientX - offsetX);
        canMouseY = parseInt(e.clientY - offsetY);
        // user has left the canvas, so clear the drag flag
        isDragging=false;
    }

    function handleMouseMove(e) {
        canMouseX = parseInt(e.clientX - offsetX);
        canMouseY = parseInt(e.clientY - offsetY);
		console.log(canMouseX);
        // if the drag flag is set, clear the canvas and draw the image
        if (isDragging) {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);

            var profileIMG = document.getElementById("profile");
            profileIMG.crossOrigin = "Anonymous"; // ��敹����箔�霈acebook��憭rossdomain�喳�唬����ｇ�CORS Policy隢��ttps://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image 
			
            ctx.drawImage(profileIMG , canMouseX-128/2 , canMouseY-120/2 );
            ctx.drawImage(img2, 0 , 0);
            ctx.drawImage(img3, 225 , 400);

            var inputedText = $('#inputed').val();
            ctx.fillStyle = "black";
            ctx.font = '20px "敺株�甇��擃�"';
            ctx.fillText(inputedText, 300 , 445);
        }
    }

    $("#canvas").mousedown(function (e) {
        handleMouseDown(e);
    });
    $("#canvas").mousemove(function (e) {
        handleMouseMove(e);
    });
    $("#canvas").mouseup(function (e) {
        handleMouseUp(e);
    });
    $("#canvas").mouseout(function (e) {
        handleMouseOut(e);
    });
	/*--------Canvas Setting-----END---------------------------------------------------*/
};
*/
/*--------Post-----START---------------------------------------------------*/
/*function PostImageToFacebook(e) {
	$('.info').append('<img src="img/loading.gif"/>')//頛loading�mg
    var canvas = document.getElementById("canvas");//�鞋anvas
    var imageData = canvas.toDataURL("image/png");//�anvas頧�PNG
    try {
        blob = dataURItoBlob(imageData);//�蔣���亥����
    } catch (e) {
        console.log(e);//�航炊閮�og
    }
    var fd = new FormData();
    fd.append("access_token", e);//隢ccesstoken閬獐�喳�unction��
    fd.append("source", blob);//頛詨���
    fd.append("message", "�HTML5 canvas�acebook API蝯��飛");//頛詨����
    try {
        $.ajax({
            url: "https://graph.facebook.com/me/photos?access_token=" + e,//GraphAPI Call
            type: "POST",
            data: fd,
            processData: false,
            contentType: false,
            cache: false,
            success: function (data) {
                console.log("success " + data);//��log + photoID
                  $(".info").html("Posted Canvas Successfully. [<a href='http://www.facebook.com/" + data.id + " '>Go to Profile Picture</a>] "); //��閮銝阡＊蝷粹�
            },
            error: function (shr, status, data) {
                $(".info").html("error " + data + " Status " + shr.status);//憒��航炊���臬�軏lass info��
            },
            complete: function () {
                $(".info").append("Posted to facebook");//摰�敺�閮�喳HTML�iv��
            }
        });

    } catch (e) {
        console.log(e);//�航炊閮�og
    }
}

// Convert a data URI to blob�蔣���亥����
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
}*/
/*--------Post----END---------------------------------------------------*/

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



