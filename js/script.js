function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


function nl2br(str, is_xhtml) {
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

function YouTubeGetID(url) {
    var ID = '';
    url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if(url[2] !== undefined) {
        ID = url[2].split(/[^0-9a-z_\-]/i);
        ID = ID[0];
    }
    else {
        ID = url;
    }
    return ID;
}


function getRandom(list) {
    return list[Math.floor(Math.random()*list.length)];
}

$('.ov-share .copy').on('click', function(){
    $('#shareurl').select();
    document.execCommand("copy");
});

$('#vidid').on('click', function(){
    $(this).select();
});

$('#formurl').on('submit',function(e){
    e.preventDefault();
    var videourl = document.getElementById('vidid');
    if(videourl.value == $(videourl).data('title')) { //prevent submitting title
        return false;
    }
    var id = YouTubeGetID(videourl.value);
    videourl.value = id;

    this.submit();
});

$('#formchannelid').on('submit',function(e){
    e.preventDefault();
    var searchName = $(this).find('.searchchannel').val();
    ChannelID.getChannelID(searchName);
});
$('#vidid-type a').on('click', function(){
    var input =  $('#vidid');
    switch($(this).attr('class')) {
        case 'set-title':
            Video.params.showtype = 'title';
            var title = input.data('title');
            input.val(title);
            break;
        case 'set-id':
            var id;
            Video.params.showtype = 'id';
            if(input.data('channelid') != undefined) {
                id = input.data('channelid');
            } else {
                id = input.data('videoid');
            }
            input.val(id);
            break;
    }
});


var apiKeys = ["AIzaSyCZ437m3YvOjGsjf2ZGl9nLWta8r3Kl92Q"];
var startItem = ""; // fill with some value

var Video = {
    params: {
        videoid: startItem,
        showtype: 'title',
        intervalVideo: null
    },
    data: {
        title: null,
        desc: null
    },
    init: function() {
        Video.getData(function(data){
            getting = 0;

            $('.info').hide();
            if(!loopStarted) {
                $('.counter').show();
                $('.info').html('').hide();
                if(data.items[0].snippet) {
                    $('#vidid').val(Video.getTitle(data));
                    $('#vidid').data('title', Video.getTitle(data));

                    Video.params.channelId = data.items[0].snippet.channelId;
                    Video.params.channelTitle = data.items[0].snippet.channelTitle;
                    $('.channel-details .channelid').text(Video.params.channelId);
                    $('.channel-details .channelname').text(Video.params.channelTitle);
                }

                $('#vidid').data('videoid', Video.params.videoid);

                if(Video.getLiveStreamViewers(data)) $('.ov-livestreamviewers').addClass('live-on');

                new Odometer({
                    el: document.querySelector('.likes'),
                    value: Video.getLikes(data),

                    format: '( ddd)'
                });

                new Odometer({
                    el: document.querySelector('.dislikes'),
                    value: Video.getDisLikes(data),

                    format: '( ddd)'
                });

                if(Video.getLiveStreamViewers(data)) {
                    new Odometer({
                        el: document.querySelector('.views'),
                        value: Video.getLiveStreamViewers(data),

                        format: '( ddd)'
                    });

                    $('.views-total').parent().show();
                    new Odometer({
                        el: document.querySelector('.views-total'),
                        value: Video.getViewCount(data),

                        format: '( ddd)'
                    });
                } else {
                    $('.views-total').parent().hide();
                    new Odometer({
                        el: document.querySelector('.views'),
                        value: Video.getViewCount(data),

                        format: '( ddd)'
                    });
                }

                if(!Video.checkLiveStream(data)) { 
                    new Odometer({
                        el: document.querySelector('.comments'),
                        value: Video.getCommentCount(data),

                        format: '( ddd)'
                    });
                } else {
                    $('.comments').parent().hide();
                }

                Video.params.intervalVideo = setInterval(function(){
                    videoIterator++;
                    console.log('[VIDEO Interval #'+videoIterator+'] '+new Date()); 
                    if(!getting) {
                        Video.live();
                    }
                }, 7000);

                var apiUrlSave = 'save-db.php';
                $.ajax({
                    success : function(datasave, textStatus, xhr) {
                    },
                    error : function (xhr, textStatus, errorThrown) {
                        if(xhr.status == 400) {
                            return false; 
                        }
                    },
                    url: apiUrlSave,
                    type : 'POST',
                    data: {
                        'url': Video.params.videoid,
                        'title': Video.getTitle(data),
                        'channelid': Video.params.channelId
                    }
                });

                loopStarted = 1;
            } else {
                if(Video.params.showtype == 'title') {
                    $('#vidid').val(Video.getTitle(data));
                }
                document.querySelector('.likes').innerHTML = Video.getLikes(data);
                document.querySelector('.dislikes').innerHTML = Video.getDisLikes(data);
                if(Video.checkLiveStream(data)) { 
                    document.querySelector('.views').innerHTML = Video.getLiveStreamViewers(data);
                    document.querySelector('.views-total').innerHTML = Video.getViewCount(data);
                } else {
                    document.querySelector('.views').innerHTML = Video.getViewCount(data);
                }

                if(!Video.checkLiveStream(data)) document.querySelector('.comments').innerHTML = Video.getCommentCount(data);
            }

            if(typeof data.items[0].liveStreamingDetails !== 'undefined' && typeof data.items[0].liveStreamingDetails.actualEndTime !== 'undefined') {
                var ended = data.items[0].liveStreamingDetails.actualEndTime;
                var date = new Date(ended);
                var curr_date = date.getDate();
                var curr_month = date.getMonth() + 1; 
                var curr_year = date.getFullYear();
                var curr_hour = date.getHours();
                var curr_minutes = date.getMinutes();
                $('.info').show().html(getTrans('live-ended')+': ' + curr_date + "." + curr_month + "." + curr_year + " " + curr_hour + ":" + curr_minutes);
            }
        }, function (xhr, textStatus, errorThrown) {
            getting = 0;

            var response = xhr.responseText;
            var obj = JSON.parse(response);
            if(errorThrown == 'noitems') {
                $('.info').show().html(getTrans('error-wrong-id')+' :)');
                clearInterval(Video.params.intervalVideo);
                $('.counter').hide();
                console.log('Terminating');
            }
            else if(typeof obj.error.errors[0].domain !== undefined && obj.error.errors[0].domain == 'usageLimits') {
                console.log('#Error with YouTube API - key limits.. Retrying with other key!#');
                Video.init(); 
                getting = 1;
            }
            else {
                $('.info').show().html('Error');
            }
            return false;
        });
    },
    getData: function(successCallback, errorCallback, parts) {
        if(parts == undefined) {
            parts = 'statistics,liveStreamingDetails';
        }
        if(snippetIterator % 30 == 0) {
            parts = 'snippet,'+parts;
        }

        var apiKey = getRandomKey();
        console.log(apiKey);

        var apiUrl = 'https://www.googleapis.com/youtube/v3/videos?id='+Video.params.videoid+'&part='+parts+'&key=' + apiKey;
        $.ajax({
            success : function(data, textStatus, xhr) {
                if(data.items.length<1) { 
                    if(errorCallback) errorCallback(null,null,'noitems');
                    return false;
                }
                snippetIterator++;
                successCallback( data, textStatus, xhr );
            },
            error : function (xhr, textStatus, errorThrown) {
                if(errorCallback) errorCallback(xhr, textStatus, errorThrown);
            },
            url: apiUrl,
            type : 'GET'
        });
    },
    live: function() {
        Video.init();
    },
    getLikes: function (data) {
        return data.items[0].statistics.likeCount;
    },
    getDisLikes: function (data) {
        return data.items[0].statistics.dislikeCount;
    },
    getViewCount: function (data) {
        return data.items[0].statistics.viewCount;
    },
    getCommentCount: function (data) {
        return data.items[0].statistics.commentCount;
    },
    getLiveStreamViewers: function (data) {
        if(data.items[0].liveStreamingDetails) {
            return data.items[0].liveStreamingDetails.concurrentViewers;
        } else {
            return false;
        }
    },
    checkLiveStream: function (data) {
        if(data.items[0].liveStreamingDetails) {
            return true;
        } else {
            return false;
        }
    },
    getTitle: function (data) {
        if(data.items[0].snippet) {
            Video.data.title = data.items[0].snippet.title;
            return data.items[0].snippet.title;
        }
    },
    getDescription: function (data) {
        if(data.items[0].snippet) {
            Video.data.desc = data.items[0].snippet.description;
            return data.items[0].snippet.description;
        }
    }
};

if(Video.params.videoid == 'YbJOTdZBX1g') {
    $.notify({
        message: 'Yesssss, we fixed it ;) It was <strong>finished live</strong>, so It wasn\'t counting.. Test now!'
    },{
        type: 'danger',
        delay: 5000,
        placement: {
            align: 'right'
        }
    });
} else {
    $.notify({
        message: getTrans('notify-problems-refresh')
    },{
        type: 'warning',
        delay: 10000,
        offset: {
            y: 60,
            x: 20
        },
    });
}
