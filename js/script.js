// Function to get query parameter value by name from URL
function getParameterByName(name, url) {
    // If URL is not provided, use current window location
    if (!url) url = window.location.href;
    // Replace special characters in name for regex matching
    name = name.replace(/[\[\]]/g, "\\$&");
    // Construct regex pattern to match query parameter
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        // Execute regex on URL
        results = regex.exec(url);
    // If no match found, return null
    if (!results) return null;
    // If query parameter has no value, return an empty string
    if (!results[2]) return '';
    // Decode URI component and replace '+' with space in the parameter value, then return
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Function to set a cookie
function setCookie(cname, cvalue, exdays) {
    // Create a new Date object
    var d = new Date();
    // Set the expiration time in milliseconds
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    // Construct the expires string
    var expires = "expires=" + d.toUTCString();
    // Set the cookie with name, value, and expiration date, and specify the path
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Function to get the value of a cookie by name
function getCookie(cname) {
    // Construct the name string for the cookie
    var name = cname + "=";
    // Decode the cookie string
    var decodedCookie = decodeURIComponent(document.cookie);
    // Split the decoded cookie string into an array using ';'
    var ca = decodedCookie.split(';');
    // Loop through the array elements
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        // Trim leading whitespace from each array element
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        // If the array element starts with the cookie name, return the cookie value
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    // If no cookie with the provided name is found, return an empty string
    return "";
}

// Function to replace newline characters with HTML line breaks
function nl2br(str, is_xhtml) {
    // Define the HTML break tag based on whether XHTML is enabled
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    // Use a regular expression to replace newline characters with HTML line breaks
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

// Function to extract Rumble video ID from URL
function RumbleGetID(url) {
    // Initialize ID variable
    var ID = '';
    // Check if the URL starts with "https://rumble.com/"
    if (url.startsWith("https://rumble.com/")) {
        // Split the URL by "/"
        var parts = url.split("/");
        // The last part should be the videoId
        ID = parts[parts.length - 1];
    }
    // Return the extracted ID
    return ID;
}

// Function to get a random element from an array
function getRandom(list) {
    // Generate a random index and return the corresponding element from the list
    return list[Math.floor(Math.random() * list.length)];
}

// Event handler for clicking on '.ov-share .copy' element
$(document).on('click', '.ov-share .copy', function() {
    // Select the element with id 'shareurl'
    $('#shareurl').select();
    // Execute copy command
    document.execCommand("copy");
});

// Event handler for clicking on '#vidid' element
$(document).on('click', '#vidid', function() {
    // Select the element with id 'vidid'
    $(this).select();
});

// Event handler for form submission with id '#formurl'
$(document).on('submit', '#formurl', function(e) {
    // Prevent the default form submission behavior
    e.preventDefault();
    // Get the video URL element
    var videourl = document.getElementById('vidid');
    // If the value of videourl matches its data-title attribute, return false to prevent submission
    if (videourl.value == $(videourl).data('title')) {
        return false;
    }
    // Extract the Rumble video ID from the video URL
    var id = RumbleGetID(videourl.value);
    // Set the value of videourl to the extracted video ID
    videourl.value = id;
    // Submit the form
    this.submit();
});

// Event handler for form submission with id '#formchannelid'
$(document).on('submit', '#formchannelid', function(e) {
    // Prevent the default form submission behavior
    e.preventDefault();
    // Get the value of the input field with class '.searchchannel'
    var searchName = $(this).find('.searchchannel').val();
    // Call a function to get the channel ID based on the search name
    ChannelID.getChannelID(searchName);
});

// Event handler for clicking on elements with id '#vidid-type a'
$(document).on('click', '#vidid-type a', function() {
    // Get the input element with id 'vidid'
    var input = $('#vidid');
    // Switch based on the class attribute of the clicked element
    switch ($(this).attr('class')) {
        case 'set-title':
            // Set the showtype parameter to 'title'
            Video.params.showtype = 'title';
            // Get the title from input data and set the input value to the title
            var title = input.data('title');
            input.val(title);
            break;
        case 'set-id':
            var id;
            // Set the showtype parameter to 'id'
            Video.params.showtype = 'id';
            // Check if the input has data for channel ID, if yes, set id accordingly, otherwise set to video ID
            if (input.data('channelid') != undefined) {
                id = input.data('channelid');
            } else {
                id = input.data('videoid');
            }
            // Set the input value to the determined id
            input.val(id);
            break;
    }
});

// Array of Rumble API keys
var apiKeys = ["AIzaSyCZ437m3YvOjGsjf2ZGl9nLWta8r3Kl92Q"];

// Initialize startItem variable to null
var startItem = null;

// Function to get a random API key from apiKeys array
function getRandomKey() {
    return getRandom(apiKeys);
}

// Object to hold video-related parameters and data
var Video = {};
// Parameters related to video
Video.params = {
    videoid: startItem,
    showtype: 'title',
    intervalVideo: null
};
// Data related to video
Video.data = {
    title: null,
    desc: null
};

// Object to hold channel-related parameters
var Channel = {};
// Parameters related to channel
Channel.params = {
    channelID: startItem
};

// Function to get data for a channel
Channel.getData = function(successCallback, errorCallback) {
    // Get a random API key
    var apiKey = getRandomKey();
    // Construct API URL for channel search
    var apiUrl = 'https://corsproxy.io/?https://wn0.rumble.com/service.php?api=1&name=video_collection.videos&limit=1&id=' + Channel.params.channelID; //ONLY BY CHANNELID
    // Perform AJAX request
    $.ajax({
        success: function(data, textStatus, xhr) {
            // If no items found, invoke errorCallback with 'noitems' parameter
            if (data.data.length < 1) {
                if (errorCallback) errorCallback(null, null, 'noitems');
                return false;
            }
            // If success, invoke successCallback with data
            if (successCallback) successCallback(data, textStatus, xhr);
        },
        error: function(xhr, textStatus, errorThrown) {
            // If error status is 400, invoke errorCallback with 'nochannel' parameter
            if (xhr.status == 400) {
                errorCallback(null, null, 'nochannel');
                return false; //prevent setting interval
            }
            // If other error, invoke errorCallback with error details
            if (errorCallback) errorCallback(xhr, textStatus, errorThrown);
        },
        url: apiUrl,
        type: 'GET'
    });
};

// Initialize snippetIterator variable to 0
var snippetIterator = 0;

// Function to get data for a video
Video.getData = function(successCallback, errorCallback, parts) {
    // If snippetIterator is multiple of 30, include 'snippet' in parts
    if (snippetIterator % 30 == 0) {
        parts = 'snippet,' + parts;
    }

    // Get a random API key
    var apiKey = getRandomKey();
    // Construct API URL for video search
    var apiUrl = 'https://corsproxy.io/?https://wn0.rumble.com/service.php?api=3&name=media.details&url=/' + Video.params.videoid;
    // Perform AJAX request
    $.ajax({
        success: function(data, textStatus, xhr) {
            // If no items found, invoke errorCallback with 'noitems' parameter
            if (data.items.length < 1) {
                if (errorCallback) errorCallback(null, null, 'noitems');
                return false;
            }
            // Increment snippetIterator
            snippetIterator++;
            // Invoke successCallback with data
            successCallback(data, textStatus, xhr);
        },
        error: function(xhr, textStatus, errorThrown) {
            // Invoke errorCallback with error details
            if (errorCallback) errorCallback(xhr, textStatus, errorThrown);
        },
        url: apiUrl,
        type: 'GET'
    });
};

// Function to get likes count from video data
Video.getLikes = function(data) {
    return data.rumble_votes.num_votes_up;
};

// Function to get dislikes count from video data
Video.getDisLikes = function(data) {
    return data.rumble_votes.num_votes_down;
};

// Function to get view count from video data
Video.getViewCount = function(data) {
    return data.views;
};

// Function to get comment count from video data
Video.getCommentCount = function(data) {
    return data.comments.count;
};

// Function to get live stream viewers count from video data
Video.getLiveStreamViewers = function(data) {
    if (data.live == true) {
        return data.data.watching_now;
    } else {
        return false;
    }
};

// Function to check if video is a live stream based on video data
Video.checkLiveStream = function(data) {
    if (data.live == true) {
        return true;
    } else {
        return false;
    }
};

// Function to get video title from video data
Video.getTitle = function(data) {
    if (data.data) {
        Video.data.title = data.data.title;
        return data.data.title;
    } else {
        return Video.data.title;
    }
};

// Function to get video description from video data
Video.getDescription = function(data) {
    if (data.data) {
        Video.data.desc = data.data.title;
        return data.data.title;
    }
};

// Initialize getting, loopStarted, and videoIterator variables to 0
var getting = 0;
var loopStarted = 0;
var videoIterator = 0;

// Function to initialize video data retrieval
Video.init = function() {
    // Get data for the video
    Video.getData(function(data) {
        // Reset getting variable
        getting = 0;
        // Hide the '.info' element
        $('.info').hide();
        // If loop has not started yet
        if (!loopStarted) {
            // Show '.counter' element
            $('.counter').show();
            // Clear HTML content and hide '.info' element
            $('.info').html('').hide();
            // If snippet data exists, update elements accordingly
            if (data.data) {
                $('#vidid').val(Video.getTitle(data));
                $('#vidid').data('title', Video.getTitle(data));

                Video.params.channelId = data.data.by.id;
                Video.params.channelTitle = data.data.by.title;
                $('.channel-details .channelid').text(Video.params.channelId);
                $('.channel-details .channelname').text(Video.params.channelTitle);
            }
            $('#vidid').data('videoid', Video.params.videoid);

            // Create Odometer instances for like and dislike counts
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

            // If live stream viewers count exists, show it and update total views
            if (Video.getLiveStreamViewers(data)) {
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

            // If not a live stream, show comment count
            if (!Video.checkLiveStream(data)) {
                new Odometer({
                    el: document.querySelector('.comments'),
                    value: Video.getCommentCount(data),


                    format: '( ddd)'
                });
            } else {
                $('.comments').parent().hide();
            }

            // Set interval for video data retrieval
            Video.params.intervalVideo = setInterval(function() {
                videoIterator++;
                console.log('[VIDEO Interval #' + videoIterator + '] ' + new Date());
                if (!getting) {
                    Video.live();
                }
            }, 7000);

            // Save new request for analytics
            var apiUrlSave = 'save-db.php';
            $.ajax({
                success: function(datasave, textStatus, xhr) {},
                error: function(xhr, textStatus, errorThrown) {
                    if (xhr.status == 400) {
                        return false; //prevent setting interval
                    }
                },
                url: apiUrlSave,
                type: 'POST',
                data: {
                    'url': Video.params.videoid,
                    'title': Video.getTitle(data),
                    'channelid': Video.params.channelId
                }
            });

            // Set loopStarted to true
            loopStarted = 1;
        } else {
            // If showtype is 'title', update '#vidid' value with video title
            if (Video.params.showtype == 'title') {
                $('#vidid').val(Video.getTitle(data));
            }
            document.querySelector('.likes').innerHTML = Video.getLikes(data);
            document.querySelector('.dislikes').innerHTML = Video.getDisLikes(data);
            // If live stream, update views with live stream viewers count and total views
            if (Video.checkLiveStream(data)) {
                document.querySelector('.views').innerHTML = Video.getLiveStreamViewers(data);
                document.querySelector('.views-total').innerHTML = Video.getViewCount(data);
            } else {
                document.querySelector('.views').innerHTML = Video.getViewCount(data);
            }
            // If not live stream, update comment count
            if (!Video.checkLiveStream(data)) document.querySelector('.comments').innerHTML = Video.getCommentCount(data);
        }
    }, function(xhr, textStatus, errorThrown) {
        // If error, handle error and show appropriate message
        getting = 0;
        var response = xhr.responseText;
        var obj = JSON.parse(response);
        if (errorThrown == 'noitems') {
            $('.info').show().html(getTrans('error-wrong-id') + ' :)');
            clearInterval(Video.params.intervalVideo);
            $('.counter').hide();
            console.log('Terminating');
        } else if (typeof obj.error.errors[0].domain !== undefined && obj.error.errors[0].domain == 'usageLimits') {
            console.log('#Error with Rumble API - key limits.. Retrying with other key!#');
            Video.init(); //no loop problem thanks to loopStarted variable :)
            getting = 1;
            //TODO: remove from array wrong api keys
        } else {
            $('.info').show().html('Error');
        }
        return false;
    });
};

// Function to retrieve live stream data
Video.live = function() {
    Video.init();
};

// Initialize channelIntervalSet and channelIntervalIterator variables to 0
var channelIntervalSet = 0;
var channelIntervalIterator = 0;

// Function to retrieve channel data
Channel.live = function() {
    // Get channel data
    Channel.getData(function(data) {
        console.log(data);
        // Update videoid with live stream video id
        Video.params.videoid = data.items[0].id.videoId;
        $('#vidid').data('channelid', Channel.params.channelID);
        $('.info').html('').hide();
        // If channelIntervalSet is 1, clear intervalChannelID
        if (channelIntervalSet == 1) {
            clearInterval(intervalChannelID);
        }
        // Initialize video retrieval
        Video.init();
    }, function(xhr, textStatus, errorThrown) {
        // If no live stream found, show appropriate message and retry
        if (errorThrown == 'noitems') {
            channelIntervalIterator++;
            $('.info').show().html(getTrans('error-no-live') + ';) #' + channelIntervalIterator);
        } else if (errorThrown == 'nochannel') {
            $('.info').show().html(getTrans('error-wrong-id-channel') + '!');
            return false;
        } else {
            $('.info').show().html('Error');
        }
        // If channelIntervalSet is 0, set intervalChannelID to retry
        if (channelIntervalSet == 0) {
            intervalChannelID = setInterval(function() {
                console.log('Refreshing - waiting for livestream');
                Channel.live();
            }, 7000);
            channelIntervalSet = 1;
        }
    });
};

// Get videoID from URL parameter
var videoID = getParameterByName('vidid');
// If videoID exists
if (videoID) {
    // Set videoid in Video params
    Video.params.videoid = videoID;
} else {
    videoID = Video.params.videoid;
}

// If videoID is valid and its length is greater than 12, assume it's a channelID and retrieve channel data
if (videoID != null && videoID.length > 12) {
    Channel.params.channelID = videoID;
    Channel.live();
} else if (videoID != null) {
    // Otherwise, initialize video data retrieval
    Video.init();
}

// Set value for input with name 'vidid'
$('input[name=vidid]').val(Video.params.videoid);

// Object to handle channel ID retrieval
var ChannelID = {
    channelInfo: null,

    // Function to get channel ID based on name
    getChannelID: function(name) {
        var apiKey = getRandomKey();
        // Construct API URL for channel search by name
        var apiUrl = 'https://www.googleapis.com/Rumble/v3/search?part=snippet&type=channel&maxResults=3&q=' + name + '&key=' + apiKey; //BY CHANNELID/NAME
        var $this = this;

        // Perform AJAX request
        $.ajax({
            success: function(data, textStatus, xhr) {
                // If no items found, return false
                if (data.items.length < 1) {
                    return false;
                }
                console.log(data);

                // Write channel info to specified div
                $this.writeInfo('.channellist', data.items);
            },
            error: function(xhr, textStatus, errorThrown) {
                // If error status is 400, return false
                if (xhr.status == 400) {
                    return false; //prevent setting interval
                }
            },
            url: apiUrl,
            type: 'GET'
        });
    },

    // Function to write channel info to specified div
    writeInfo: function(id, items) {
        // Empty the specified div
        $(id).empty();
        var channelId = items[0].id.channelId;
        var channelTitle = items[0].snippet.channelTitle;
        // Append each item's channel info to the specified div
        for (var i = 0; i < items.length; i++) {
            $(id).append('<div class="item"><a href="javascript:;" class="chooseChannel" data-id="' + items.data.id + '">' + items.data.title + '</a></div>');
        }
        // Show the specified div
        $(id).show();
        // Add click event handler for '.chooseChannel' elements
        $('.chooseChannel').on

('click', function() {
            // Get the channel ID from the 'data-id' attribute
            var channelID = $(this).data('id');
            // Set the channel ID in the input field with class '.searchchannel'
            $('.searchchannel').val(channelID);
            // Hide the specified div
            $(id).hide();
            // Submit the form with id '#formchannelid'
            $('#formchannelid').submit();
        });
    }
};

// Event handler for clicking on '.chooseChannel' elements
$(document).on('click', '.chooseChannel', function() {
    // Get the channel ID from the 'data-id' attribute
    var channelID = $(this).data('id');
    // Set the channel ID in the input field with class '.searchchannel'
    $('.searchchannel').val(channelID);
    // Hide the specified div
    $('.channellist').hide();
    // Submit the form with id '#formchannelid'
    $('#formchannelid').submit();
});

// Function to show the input field with id 'shareurl'
function showEmbedUrl() {
    $('#shareurl').show();
}

// Function to hide the input field with id 'shareurl'
function hideEmbedUrl() {
    $('#shareurl').hide();
}

// Function to open the share dialog
function shareDialog() {
    // If the share dialog is hidden, show it
    if ($('#overlay').is(':hidden')) {
        $('#overlay').show();
    }
}

// Function to close the share dialog
function closeShareDialog() {
    // If the share dialog is visible, hide it
    if ($('#overlay').is(':visible')) {
        $('#overlay').hide();
    }
}

// Function to open the share dialog
function openEmbedDialog() {
    // Show the embed URL input field
    showEmbedUrl();
    // Open the share dialog
    shareDialog();
}

// Function to close the share dialog
function closeEmbedDialog() {
    // Hide the embed URL input field
    hideEmbedUrl();
    // Close the share dialog
    closeShareDialog();
}

// Event handler for clicking on '.share' element
$(document).on('click', '.share', function() {
    // Open the share dialog
    shareDialog();
});

// Event handler for clicking on '.close' element
$(document).on('click', '.close', function() {
    // Close the share dialog
    closeShareDialog();
});

// Event handler for clicking on '.embed' element
$(document).on('click', '.embed', function() {
    // Open the embed dialog
    openEmbedDialog();
});

// Event handler for clicking on '.close' element within the overlay
$(document).on('click', '#overlay .close', function() {
    // Close the embed dialog
    closeEmbedDialog();
});

// Event handler for clicking on the overlay background
$(document).on('click', '#overlay', function(e) {
    // If the click target is the overlay itself (not a child element), close the embed dialog
    if (e.target === this) {
        closeEmbedDialog();
    }
});

// Event handler for clicking on '.share' element within the overlay
$(document).on('click', '#overlay .share', function() {
    // Close the embed dialog
    closeEmbedDialog();
});

// Event handler for clicking on '.embed' element within the overlay
$(document).on('click', '#overlay .embed', function() {
    // Close the embed dialog
    closeEmbedDialog();
});
```
