
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
                    FB.api('/me', function (response) {
                        //console.log(response);
                        $("#preview1").append(response.id);
                    /*    $("body").append('My links is' + response.link);
                         $("body").append('My Username is' + response.username); document.getElementsByTagName('body').innerHTML = ""
                         $("body").append('My ID is' + response.id);
                    */});

                    /*
                    FB.ui({
                        method: 'share',
                        href: 'https://kangw3n.github.io/facebook/',
                    }, function (response) {});
					
					


                    FB.ui({
                        method: 'send',
                        link: 'http://www.nytimes.com/2011/06/15/arts/people-argue-just-to-win-scholars-assert.html',
                    });
                */
				/*	FB.api('/me/likes', function (response) {
						console.log(response)
                        for (var i = 0; i < response.data.length; i++){
							console.log(response.data[i].name);
							}
                    });
					*/
					FB.api('/me/picture?type=normal', function(response) { // normal/large/squere 
						var str="<img src="+ response.data.url +">";
						$('body').append(str);
					});
					
					
					
					FB.api('/me/photos', 'post', {
						name:"test",
						message: 'this is parse photo',
						url: "http://140.119.169.167/facebook_temp/facebookdemo/img/facebook.jpg"//如果要init運行只能用絕對絕對路徑
					}, function (response) {
						if (!response || response.error) {
							alert('Error occured:' + response);
							console.log(response);
						} else {
							alert('Post ID: ' + response.id);
						}
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
}; //<<<<<<<<<<<<<<<init end

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
