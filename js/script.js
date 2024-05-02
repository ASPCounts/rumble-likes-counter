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
    for(var i = 0; i <ca.length; i++) {
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


function nl2br (str, is_xhtml) {
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

function YouTubeGetID(url){
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
    if(videourl.value == $(videourl).data('title')) { //prevent submiting title
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


var apiKeys = ["AIzaSyBFnzIRK4IDF1L55-tEWViKPCofNS6NRV0","AIzaSyCjE93AjVFEeZgaqKUX2AiP8GyeWOFDIqM","AIzaSyCpDO4SXBDWGoTc9ttRE-A8iaBKQgI47SQ","AIzaSyDSGKmMuWTkaMAfS4T1wqWUYW73vna32NA","AIzaSyABUYBHkmviF3v7hG8W9AeSVjw5Cz4zMhE","AIzaSyA_lCezx_Pi373S6q1D4CmQjjlAeTfHdbo","AIzaSyDbbGYLdtAUIdmvna3GtfXqaXrK6gsaEdQ","AIzaSyDskafdNketvkkGwEYiU8IpPz1e6k5K4iw","AIzaSyCNKf_QzOK3YmyQvcBKRq2FqbV5IngbiNk","AIzaSyDdL5NKt76iP60RjCgiJK0LuDAKSemoAR0","AIzaSyDXgnhAE8S_2wT8pvvgytGLP63HtiiejlE","AIzaSyDb4WnIWOYQwJOemq2v9cEWB7Oc7149LhI","AIzaSyAJ46YZLzaiGtbRi14fikKGmDcNLOfkLKI","AIzaSyCMj8R_4_1NT9jpHJ2qGFM1OPDfS1lhpVk","AIzaSyDDLFt_-P2DkecD4akKsOAjdbn5Ips1sPI","AIzaSyDRtIUIzkK1rpGxZYp1b2YsFWWYiXqlOjo","AIzaSyAUJSi3kVuSAONOBNRz9vcYvmLYP-EvBc8","AIzaSyDinE7kGAccYnwOooqu85y2Eht9wySTZFA","AIzaSyB4vLjdLgXTAEJgGQYTHkcTJy7SimBBgyM","AIzaSyCFq0dZDYGxYd0NSfhLNvWcLsOOmvJGXOA","AIzaSyAvkhdktXVe5R695zrToiW6ZUkEaU7NUAU","AIzaSyDNDbHN4hhxmWZoh4JFTAGul7zeN31MpVw","AIzaSyAEjIetdx8Hmql52eRmKlWDEPUD-wrKPXk","AIzaSyB_5bn9rgzp67Tb5vRHaNDSlfMTkF7yzbI","AIzaSyC-HwrtQ3c_tvh23rhaiV4-8knYE-fK8HU","AIzaSyADYyzXwJlMyn3QGDO1ai_vtb9brDU_8iM","AIzaSyB43jXrzJY-wFL-B6-6Fh5u8ABe9u0xxSw","AIzaSyBkqmQqBYavQ4_WcJJobCto8vZwfdTezYk","AIzaSyAoJOaXUSpA2ZVITezm_ZteOj0Ofm5URGA","AIzaSyCBswZ-VYVCJSaOGh_am3jHkw6m1XzjXnE","AIzaSyCT3IghHjXDY8TrK7XsFhy2TAg7KaCpU7o","AIzaSyCe0nkux3D4gik9F-R_PzVFEZQkQqWgk7E","AIzaSyC0wkyNSYS8bxge0IQcHJj5XsOREnAiDH0","AIzaSyDrfgPfCkuQQ3UWUkOQ1ihr1T-eq8X1jTU","AIzaSyAYbxv9iW2zdAmkJ_Yr74dnbkvb01_7SAI","AIzaSyDEzk67KPlU8poJufb7kVOL4VmPMPJ7f5k","AIzaSyAej78FUFBCKKBKhUSNs-CnfbbpHxL7cKw","AIzaSyAdrxfhMtBQdGNjMXMu_0c8dLcUddazYUE","AIzaSyCOZbEJps5dwVXlQNsKBWn9r0RnRwo7aec","AIzaSyAHV0_NYjirL3JgnYZmBtDJ8ogrirG_SPQ","AIzaSyAsUE6WF4brJz5Vw-qejkNotmhzM3kpB-U","AIzaSyAgyQjEd0w_VZpKootTvnAP_keLJXHZTOE","AIzaSyDqJSCbAeQQyQ8dI76N3gTmwLOwmNqXAc0","AIzaSyAd3E4XlUx1xS9fEtmuRWxX5ruJBQmCUIw","AIzaSyDDrTTbRwleZbhbjBhk4J7EWSPChvDm6V0","AIzaSyDH-AmwSOGduYt-tDfAzVLMOoC1RXrR9qE","AIzaSyCR48jSAQQDU2oJh9jRtLYU4rOcH0tcQOc","AIzaSyAPpYdxSjEfRHgX0nWJMvrdr8aEbfGnaO8","AIzaSyCcWdqrsYvafX5VCqnp8RqOGQsJOQiZmyE","AIzaSyB0n5mXLcfF8W9ycueQr5mSWiyMfCTQqaE","AIzaSyB_w78ZnTKbhX4-dc8Qb5C1Un1748-WHMc","AIzaSyCW_C8XB5Y8kd9SQIJh-7234TaQ0EFpyfQ","AIzaSyCytBPXzetMtQExCYf9BbXETZLR8OgdYb8","AIzaSyAYM-VgvcT0dYm-5EoybcSL4pWC0h0J6vQ","AIzaSyABLNUyxVmm3wWmQTTnYI4k-l5JhZtVz1M","AIzaSyBsmzI2x1UG4wqxYF2HlAjCXlXF23e9ibU","AIzaSyClsHNnNvEP9eAARNhOpE6zpPFeMtx2tWQ","AIzaSyA5WXw9XNqtpWxTvxQkMikY8h3zas6X_vk","AIzaSyBGrhiqT3x7rTLxM0OZEtwZhYhKnyeKk9s","AIzaSyBSJAL4lc2tbyNzWurTV_cy9R36x0aRil0","AIzaSyBWgeckMfmyH4N2RIlx9prE0Rp70JqFscY","AIzaSyBTMOSuMot_jGE-zMYxXU1h8SoXeszyrV8","AIzaSyCyYTSS0bpKUib35QeoLcwAdCUvwOURz9k","AIzaSyBlRW80PZTIzYU77RdyBZcMp226e-e-fSE","AIzaSyCMig-_giQKWDc9n-r7PNk3-SCOG7ZAjlY","AIzaSyAfEyn3TRvU03co5FhN5xp_y5qViSg2j24","AIzaSyDvhfTFhqolNBcCTDbw4db7QZp73yD7tcA","AIzaSyBuTLrZpFr0mi41SkBuS-AyZEkNopeins8","AIzaSyBCRJV9zQqx-J7RPsZ8tHrG70bq5QeAyNg","AIzaSyBXwxwb8-4Lf3YFiiiUru9dF5DON6hX8L0","AIzaSyAhrHsyxVcn1HT2t-EcKnd-B2J8HEgrfeI","AIzaSyC-HYObfINjSaj0091L8bFMqgk27jPCYlI","AIzaSyDf8ZZ9xklhTE-Ib_Hyn_JpI0YuKbT6YHo","AIzaSyAPYlu_6PfqN8hqdpy_l8NAhKpqVyKf_XM","AIzaSyBX1NqEGu4t6ZhFmHJM_wAf2U275avKZEc","AIzaSyDBB6Y93UJ1YBrdBJKWdeviAqq9dYnjWQk","AIzaSyCnBos9oX01oyK2M9854tlyQz3Qhk1DlNg","AIzaSyBZFcjqx6dmCXxaK2ro0WXj7DFLmkwP9W8","AIzaSyDkItj48PHQ2i5F8iCIUsaHdfG8gvjfSd8","AIzaSyCn0VyVb0nWbc589Y-NJE5xcpLuzKY0i-k","AIzaSyBg_ai96wt4BGuf9kmGN7rZPf8_SsQgNDM","AIzaSyDLsKSQeM5tY9ryxuwaIXnSwXYjZoGx0Vs","AIzaSyDzT9hwMzE8Y1OiVScfzKazZzj98Fc292Y","AIzaSyCvMQPn6AnCnq4zfHaokQrGr-TU12CmLvo","AIzaSyCezfbSEEYwtiYVg7IiwJ_LRc5OrsDMp1M","AIzaSyCFjhzGdg_NWmwoSTDOlcu4VKE3tcBmy_0","AIzaSyD0Tv8f0OxOeGEBOuqA7Z0l6Jx-_uYAOUc","AIzaSyBzMkLn9MNubrO_TwSsQAOMBJ6wOqyy95c","AIzaSyBMGfRSS0nLegc9z5xkKnYWGa-CiKo7epw","AIzaSyCDT-m4tGHS8A5HaUx2wjvwrVa0DHfrZdg","AIzaSyAEtwLTHtWBGsfw1ah02bC19QWS-gIIb9I","AIzaSyDuAM3PhEmtbLxQt-kGiDFoZE5ixhs7DAM","AIzaSyBbq3q1iGRRfWHdqC8c4BwO9w122p_thiI","AIzaSyDrtF_ivKA6ycjvmPQEsI63mnw2Cb6zc2A","AIzaSyAh1dGs0xEHHsuiZDdGROLdAvq3m5hYJ9o","AIzaSyCNHzwWe6iUBc-QjNFPENcvob1FbathPnY","AIzaSyAKz8hoCNcKYuSItm-d4DfBA3VGprpeU9k","AIzaSyCtnXcBbpDVySp6FacvdDkRMIsrgfsV1kc","AIzaSyCUFwwuYnsxlvm8VQR6S1jz8TuF6cHxeHw","AIzaSyA3KvMMHeM9kYkLDfwSP1YWk6q30T9y34E","AIzaSyDzR9tlzIMB5DGQUPWEH1e0iu3kSRVISv0","AIzaSyAdYeMx6afUddn2SW2F2ToLC8vEeElbvHc","AIzaSyC53-IkYmNXcOhsU2Y0bxAk3VSxc6xxPgM","AIzaSyBcWIYlWT_h0gBehrcPCR766meTf7q4nSg","AIzaSyCvhneEJK2xHMacpEyEavNHnVKUbNj85kg","AIzaSyCoyKutQTbdxEy4yxfoSLZfV_sIRWpmARE","AIzaSyAgpSBH4QML3BLLU7gq6uVw5AIHLadkDYA","AIzaSyAnLC7P_1LsZla70HJ61M4Xd3g1LCY6uok","AIzaSyAHijtoCWLa8lML2DJUU4QKB1w0hYV-SUs","AIzaSyBqyhI_BAfxQNwDoekzSuLljo5JS4gKsQ8","AIzaSyBt9ZenT8TIs75fLDhRhcRmYSe1htpHWYY","AIzaSyDSPfqmeh-fyBNPdFJ0VT8dSjZXPdBO4Lk","AIzaSyDnpzZf9yzhzRhTpKa3rO7rS4oiD3qTPg0","AIzaSyDzeIzyP-IVb8z2ecbNAli2Ip8Q0NRdLYg","AIzaSyDH__UCY8var72fcMx4Zq1Hq6T7yTIS1RE","AIzaSyCwy3UuVz8NovRjtWlfK6Vd7jdJeVVSyRk","AIzaSyAHSPns8aC6zJTzJQl0DDGFqgu9lcExCXI","AIzaSyD7raSbbQqbpooaOUzn2RdzftcLYkb6U-w","AIzaSyASTJSUNdpA0T7os-6h3O6CTwuPZ8DzrkM","AIzaSyCawQTCAw3ncAGE4udxO10jZmNPhcTG3zs","AIzaSyA9CFXyBWkpaIpXQOF_Vr474FV7QfoXWWg","AIzaSyAVY5NGGtaeUQ6GmrJWwT_89a1iwtnoqMw","AIzaSyDeu5duaT2BwNnJ27wTNyDpOzMEXxalhnc","AIzaSyDSRmsWBgbk4Y7-nnn0MuRC0jVm804urzQ","AIzaSyBRZN35Xa33m29mZc6qsrAayAlkTCtXerM","AIzaSyAnLGaqletmWzRssBFwvdKxqcKoTSvbDUE","AIzaSyAqBhAvUMkObOk33DMC2QXcOFJk9gv74To","AIzaSyBRCWu6lNRncqWHjcFMIbAvFTPbWKijfss","AIzaSyD2QxZEj1WkB0n-N7tdBJiyJFRfHRDV6NY","AIzaSyDa-GXI_0Jj-1o-cuKLQQpsCpouVKE8esc","AIzaSyDFQh8Trft4F50navQSA3wTt6p7lxt57k8","AIzaSyDakcRH8wuvGEYwHvXIzKKbK6qcN6yH9Xg","AIzaSyAhWdrSB6hiySJgxJywoE5WqXFfg1--hSk","AIzaSyA0Fo_iAS7ASnPFKDAHD0viCOZMjt9juxY","AIzaSyDYBZVMBplCWPsRIC0jaOELQeYV9u62WLQ","AIzaSyCRe97CoXGQm4BdwtpvCz1WuApAGdqGGF8","AIzaSyBSS0gFNOwRnc7onQ2jN0q4CXq7duD_tZs","AIzaSyColoThw7Xkgn0KxycX_pwUSbQfGY7XKDk","AIzaSyBun6DJ2sIoJaT6kuagzespTdR_i6sZuFo","AIzaSyCWdcQqpct-CjthDuu-xjqo0nO_1IlpJmk","AIzaSyAdvN8GLm7kbmczuD2hdicWomBy6-s9X6E","AIzaSyALS3gXxj-S36j8WcLIxq1cnqEY7H5dFYo","AIzaSyBwYmCwND__44yOdUBEkNdhCsU6FfeYjeE","AIzaSyBFOjxT0aNAQ2SVSndggjcU9NAZ0eH6KnM","AIzaSyBVvA3L48qOSdoULFSVNJy50KOXnBBf3Qc","AIzaSyB8KYhJC3MJC9SOCywmusfictlBlyVfxwo","AIzaSyC2kMB1OuSY4O0ljK1sNbT9CtBG3xrFNRw","AIzaSyA8Zw-yrtg1Z1d7d-Ue7P4_ZAJtJgujp40","AIzaSyCaRTO7NwF7p5NEWzHG-TeqRjlw1u1Fwf8","AIzaSyAJLT5922IqO7nNCo8R2-jyqsiWHHfaJ-c","AIzaSyCfQQeFREcG8yFzLj5I9-J_DxGgfh4N4vc","AIzaSyDgg7OxSuuDNwlQKBZgp2CkDo7fa_MG2aQ","AIzaSyAwOz7G30GjHcbfOFQcdRENFhhbItDRw5I","AIzaSyDgDK6ooEOIKtyU-IDGvoTx8omrmJyzedE","AIzaSyAeD8B0uw6LfP9C0IxGA8g2lGflJODASDE","AIzaSyAUhI42YXESUYAUYgrCT0MPcvQ5wKcKXb8","AIzaSyBqKlPmm6TWBP_4qqbn8QTAqNQ6s1WnB_Q","AIzaSyAoDxn9B1gMWcn_mx9yxug7MFOihd0nbXg","AIzaSyBxev1RWFZcTrjtpGb8KcbhdljsmaTC6AY","AIzaSyCcgad1f2vB0DD4y0pmSgU9MFLRzUV2smk","AIzaSyBAuvg8uDXvkwcgY6odYGogzeif1-v0qb0","AIzaSyARmQle7kd_Jdl4OEFmJOCGnUHbMg9vjGo","AIzaSyARHvRaAwLsMFh_rHmqH53pFGX6KvSxkcw","AIzaSyApDGLQjePMxCZLlS4DgjCrsSYXuWGJxQA","AIzaSyCn7TJ10po3jlW9s3c9HEvICiLF-OC4syw","AIzaSyCkytVbeQ5cnTv_kR2Er_7hn1SY1uaavyE","AIzaSyCYJJdaKHV0pnU6z9iUIEm_tn16WkAzU50","AIzaSyALnKMoyO5LmjPEkxetM-I4yqPNPkVLoB0","AIzaSyDkZO9VxXUSZULaKP1trHRET7H0ZvrKaMU","AIzaSyADXs2cTMzkztwAIYGEH4iyMvtpebv0r8I","AIzaSyCx1yNfQ6JagF36u5CoyIMvXuGXF86IrhI","AIzaSyC-SaY0gXcQ-NphV4xeEmyBvEddAcPry1w","IzaSyCoeNbBptrbKDZw9WcfPgbXCgUqohGnxUQ","AIzaSyAMkaQUJB-t1XzQwBpaX_4UYQ_ZDLPon9c","AIzaSyA3pYzqSZmRTTWXD6n7GY15LqssSHqj5d0","AIzaSyC9kDYz9Ia7jf9hEf_ig1JJakEjadYEC_I","AIzaSyAFqn8OHeuOxpiE2XgtgM89ROXzCXL0qX8","AIzaSyBoFvz1GUIDwMJSlt6144a5jLeMPDY3x7E","AIzaSyBOV_S-m4eZnc0mHzspfnm-gwmC1GBiiBs","AIzaSyCeE1fV4u_mhnYlTf-EzokbQtdhXJBlpLQ","AIzaSyCngvJXYExEijUBljNgKrymgyDHjV5J_iU","AIzaSyBk3UwS9_0Mw1LFPUXIO_TjZr8dK9CqPNU","AIzaSyDjmbTXNKd7O9Ssz05NJNKdihGQvrXhy4Q","AIzaSyDReqVRLtAgSHqi53fvm2T0g67aIKttjuI","AIzaSyACOFTL-RmYgAS8HNi0ol3vp-gbFo0nzcs","AIzaSyBwsqnIGevoIu6GAmytF22wMFl2JO2XZo0","IzaSyBZWKljXV4NAmD_breB43aJov7m3vMpcEI","AIzaSyDxUqsaLBTrjdn3Nww9AW6QTv-7ozzD2Pk","AIzaSyBdM91x_afcndR_ToFr4TDC8Fh_QGmgbkA","AIzaSyAL5yH4hHOj9uVsd8C-ZdAaZmtCo6sAKig","AIzaSyA8YyvqBZrFbzlUKLhEHCnZehlQHnrovuQ","AIzaSyAqqFr1ljHrcKqhzoBSGSOaSfEEZhDRaCI","AIzaSyB5eKXwkalXz6vBLo9hjFWTvzOa8zdN960","AIzaSyCV7Y3LSoDVrU87vmiBGMV41YmvNYf858M","AIzaSyCSJuL_pFmVqReyMV2mPAiStIv6u4MA7jY","AIzaSyDQBoHcFW8pIeykL6vFLm-t3h43RkS6utU","AIzaSyDxH3q5LbUUFIXRwrYl--2cLNG-gcngnzw","AIzaSyCRtJ2uhgYe7p3J-QkC6kHsm7KZz0bDIok","AIzaSyCo-PwQAtlrchgSAY0hLnE2HYSRhqdsPXk","AIzaSyC7asPTom1oZVPmZu7UcttGNFvqzRWQiRM","AIzaSyDmUVXdKMQfp1428NsX0GuBHEp3Hh6VnRQ","AIzaSyB0uq8HHarCnpYG4pZxYPwE8wLAtM_gBN0","AIzaSyCgp_Uc2jj1mAd7HW9AzAATt33rGkvttVQ","AIzaSyDUUfmvtaHY3lQ11CbkF8gplSJSXwgLe2g","AIzaSyDzUqDdCGrb5g5YU0fo0pB9QbqurkK3GSc","AIzaSyBgcyeGD9VK-Nu2pnlP5VQaLWqYSIPWZRk","AIzaSyAGry7aVXPytGcqt-GrOb4HkIXVGbuL4As","AIzaSyAiWjUpPAvVy1fLj2VTJitH56Gs-2PBMLY","AIzaSyA2bieaAnufzw9YNibt0R2WI14L8uU9tbw","AIzaSyDpTfaINBOTi_1YgYSmk25DPS8ex-duZsQ","AIzaSyAGFMcByfMdsbQbpK7FE8MfHLZNjMDIWsw","AIzaSyCLuua085lVPXp0Jmqb_AIePC0hG66N_5U","AIzaSyDGu5pdf-_0cNIZdNkcLKtdpn0UNulX7hU","AIzaSyDY8suw3_q3zMX6ZDhdr7IDpPLQ6CbEsoY","AIzaSyCE9cyVSRDrn0nCjO_ajRDSHXUr3yqLnT0","AIzaSyACVbv1wiiFdYQsaMQkthBJAUi-Ek-ZNkc","AIzaSyANLBp5fHf-XEsQnksu_-ygJMHviGQO7TY","AIzaSyCQXeXdjhu5SKnvLJeYz9SgyKbzT8fnQko","AIzaSyBlSrOJ-ajuFM4cRpbPbuBnI1Fn3BPFrbg","AIzaSyC9jt3y7ygY5qTToSUEanHCyMYonkCXz1w","AIzaSyA5dmZA8HwtRCI24FDlf4E0atZ5KjYxzWA","AIzaSyBBjLqNnzhnJ5xqRGwfdCmIVG13YNNNk2w","AIzaSyACZdXbrIijp3kLgAGNIdSCe7uxxIvo9wY","AIzaSyBKDw28djiaVr2rFLUUHEO2gNoa4SBa5Eo","AIzaSyAVsW7FWM1bRFZ2Sovyor649wJB0-frc6s","AIzaSyBqpsmewbPiTDYXnTCDoudNBqNsuIw-mKk","AIzaSyCJc3jP4mUaHK3H3iKP1tAg5Sre_ZXyRZ8","AIzaSyC-eb1wfd4BSRYXumrJHVKSZiZhGwMDOCU","AIzaSyBVvrKtgYwY0_aR6eI-RW9VSNx36DRyMj8","AIzaSyCmqRC4LPcEzH7VLPj43F16WQc62kwsK_w","AIzaSyBLG9IhobeWq4GhV3Tj30ul_RTf5OWV-A0","AIzaSyAx0PuIfN747I7AoH0tqe3ChmmUYwaQ2Hk","AIzaSyBYUX-FaspbUCmIHRku6Nlk8P7KeuBNv0U","AIzaSyBx2pYtSpgwRfZKgyyVKr50tvvatYo-qVk","AIzaSyB8GMc25p2aIAe-c7RprBg-4tWYH1z8Sks","AIzaSyCpxYGkgA84erP8wjh9wogUIscDjk8CWKU","AIzaSyD28RI5o_dYgRrlloUuKwafVsPWFiINW0o","AIzaSyCQ0-h0qSwqYHACIGlftvlHbga1vu6FL68","AIzaSyCffkLkQMyYCv53KZyQrxsv2M9AftBQVbc","AIzaSyA3hbM5bSmkZoxIOPBgMh2i9NO1oidlhg0","AIzaSyBJlU6gE9sWJWlFR3AU-apBEIqUTuBpMMs","AIzaSyDGPy7EpMnWBakmS--6Zo6he17npKi1Scc","AIzaSyAriSzreOo8iwur_xbuAnKOALHQ6CYNkdo","AIzaSyC3NhWVzNbrkKDq5tggtOKWctHQK3jfIeU","AIzaSyArF3ec1ypsO7ofUGw2WjbubgHNC7SNKCo","AIzaSyC8cBG9qURY7sGE-gpDEDFMEgryTToVRpc","AIzaSyBgDrdkGCyNY7NsOsHNijRF0crD2YGwvDg","AIzaSyBPUsOE-_pAInBPUG_A5NMJ9V78_S1cA5c","AIzaSyALUMHI1gzc_W5m89245j7hsT-thbe1qjY","AIzaSyB_iH4g5IpsQJgqd-0eaHZPNLE415-pB_4","AIzaSyASbvrdZO4sOkjs9zfvFX-L5bdDyDEbi08","AIzaSyC-2J15Q5Utd2CgpZsHF1Mbv0jnQlRPRaQ","AIzaSyAtHGrv1TRgjnKgONYNEHj3lDvRockUhNk","AIzaSyCNtFjts20PEQ8GpitQPVJ5OZFbUGgVhMc","AIzaSyBgQPSALZZNNA1tACSFDakTZYSEdaBANc4","AIzaSyAudGmI32QygtkxS80REON501yRkMpPFxc","AIzaSyAYclzmbzChKrUo9RXiWUd3e08WWl04_T0","AIzaSyDXbxJEIW1CeXY7xrQAVQSYDA3mSBzC9iM","AIzaSyC2yHOH_wuAjkgvrUAZo5dhexZsaZJB1KY","AIzaSyCj8wGz_c4h5xW-FugbbYOHH-BtLG1psHk","AIzaSyC31MIJipeK5A9gkRVIKD9cXmh96pwu1l4","AIzaSyDfvgOTG8M2GqrrElnmYGeHorF_OgQhlA8","AIzaSyCLuSMMw3KAXwNJIsrxwxT5ShmSMAsNlro","AIzaSyCxKhvvr8CvmJgeo-GHt3a_iog_kMXDsZc","AIzaSyBx8qy6Wk6Jwdj8ku1D2Aduwjkbt9paaEA","AIzaSyD-A8AygZFreRhsEzxtRGJUdH_JfDHOn8Y","AIzaSyBpIe46IyjC0sdn7ENHC7brTIA5kMd8FnA","AIzaSyAsfUSkfzhz74opMiWzKJ-iXDq0oF29mxQ","AIzaSyARqPa7dgDil9_OL7jw1UdWFcdUoT57O5U","AIzaSyBmrN6VwSBvGjRasOq7LBI0dkzVp-dreOk","AIzaSyA62Z94cavT-ODi6ZzsJSf7MbV3JsRyx4U","AIzaSyB5IsxA_-IjXbnBoZ7zx6fSAAPgpCydIxk","AIzaSyDpzp1OEW-axtoc5O5kyxl0S2-46WfGVJg","AIzaSyDUTMnWBR_DfWz7Obdj_V-YMzPnNgqzKME","AIzaSyAt14oAUc2M5P7ddtF6F2o6hNOZb1F9Gh8","AIzaSyBzj4Hgfmhlrm_bVeSNnpb5U9zUnLBJup8","AIzaSyApJEbF-pgr5sRc9hR0NznPx6UA_CCJPG4","AIzaSyBxeCTQ9eNe5gtkhrVPg_YNZxuOS9kkNN0","AIzaSyAZ1uTYfKguS-o-xru-icR8PM44F4DQhdE","AIzaSyBiMYerXm0u9f5doBdI-YljrSfsqIdyiwI","AIzaSyAXmcBmHfFZfzFPUHnDf55gX-7EESGSUn0","AIzaSyBBTwxet9VGR9jK9le2mE6uSvTfr2XDRJA","AIzaSyA8wEOgIJ7LEY4iDG4Qg_Ad2VgTEWlUIrA","AIzaSyD2aLOfH18P889oz5OUi3Eckb3qGzJ9lvU","AIzaSyDsjY7zKIxE9NG3xluvZepwYHD2vjBt9lo","AIzaSyDHEyizXx6ExuMfrpgqSP_5aTIoqmDhk4g","AIzaSyD87er3n_gedLNfb_uVY6sF-5cbYE-uFHM","AIzaSyATnA8iySFAP1TKtLcdcqHgGyM7G9Zpj7c","AIzaSyCJzUJFzbjfByeeiDL0zjIrABvBZvqwTeY","AIzaSyDT6AVKwNjyWRWtVAdn86Q9I7HXJHG11iI","AIzaSyC3lXNm8-OC5y3uFLUQjPkTCTP6qR7Bv0s","AIzaSyANRopUwcIy9_Gj_gebyYdSkMlRgLjzlWA","AIzaSyDsxIyAMEYNxF5s4KqcP2hA0trTYzi5ZaU","AIzaSyAZw0kviWeCOidthcZAYs5oCZ0k8DsOuUk","AIzaSyBlRMCifkXmDv30ugkOCWMX3OkgtpNseR4","AIzaSyCikVFcqA8qluxKrwMwUGjtliSuByFR8-U","AIzaSyDtmgm9nJRQhWg4j1SetCH-vDMZ3_UZfK0","AIzaSyBkQDWiRWxWKUoavuajUSAs28ld0Pdx8a4","AIzaSyBcVwc05rajri1UMe5y_uWksWzuOKgj1U0","AIzaSyC9A_hUq6r2IMgoMVU15CL4OFRoeTzY9vU","AIzaSyB91k7jLqrzqHOKVxcsbPvTor6aTW1OX2w","AIzaSyB2-i5P7MPuioxONBQOZwgC7vWEeJ4PnIo","AIzaSyALa1cPhbMdOKjwgJEvqkhGfTukLdIKupE","AIzaSyBQgTWNFmBcR-omkycjHQRGiTtL2DUEm60","AIzaSyB6JZxYxR9OpxIQ0wbvZD_DnJcTVt4MihU","AIzaSyC1BT7o1xH2bM-WYaniC3VUfgvELj48850","AIzaSyCRXTR0G_Slvgyjj_Vgfry6KLiw8pIMlHs","AIzaSyDvQuHTDU6PE0q25RSHSAHFkY7YNncSTxs","AIzaSyCwc7GrN9gc3RTEOnXi5RtFCREQm04TrcY","AIzaSyB4Q3icIKTwtGEuxKu09cVaBK30FxT57cs","AIzaSyBOgJtkG7pN1jX4bmppMUXgeYf2vvIzNbE","AIzaSyCYkW3D7NHYpx9TLBzHdh37YXYlUUBt860","AIzaSyA7JyF9XS5cdW4bYKC2df1EjY2kmWQ_T6k","AIzaSyA6vp-xcPCf1-1TtmHc49Sq9kwPv4RTaBA","AIzaSyBVy4EKrR51E1zb1eybglkT0VRotEbQbEo","AIzaSyCLtRzn0-P2_mPfBKlk7SqzTSI-S49CTSs","AIzaSyCsP86MhVPfDaOeHgi9LQA1t1cT3csEpJU","AIzaSyBgx4xHiuPlnjxOz3zckix6wwcym2sfb18","AIzaSyAckH3jasRbe8gTqwAQSVrmidcdrTgsmPk","AIzaSyCfa44pDcLR4w3Wrk2jyiqPRqc8Xr8oxFg","AIzaSyCcjD3FvHlqkmNouICxMnpmkByCI79H-E8","AIzaSyBL6aPKYByygs9oHB5rStYhTBKtklqRkrI","AIzaSyAqum1VKtL_6tCpivQvmYIelSsc0mcnp20","AIzaSyDfhY-tmn7Q4NH-31jMaaWqOCegDG_uRBQ","AIzaSyAzhkrAEax-6glljYL4U1GaEOwjSyydEpk","AIzaSyCLpk_z1gbA423gb9CtUVAW3NmXO65Si2Q","AIzaSyChh0yi4FwvMQtj-Qtx2_5q_0xaGjoR-1M","AIzaSyBwdBJaD7GBrWJ7qMRcid8lGsrXLsBw0RQ","AIzaSyBXAu5ym186De_Z68aG2K7Hz76ZeN88nqw","AIzaSyC4zJwg96JC6YEYr9OQkmveR4ELgnqsZ5A","AIzaSyD_yxaqfo6k7yXLl5tqelE0ZQYay7KoCyo","AIzaSyADN-pQYegmLCi9s5CEkB-pyqZBaFNwunE","AIzaSyD1lRHrPMSkGXjLelY7Rj29hhOpH7eBeUs","AIzaSyBQjpE3RBtPm9PyquAMbhNCMkaYzhHpjbI","AIzaSyCVcswzU30smEz9Mda8AohjOYv0KQC4Wlo","AIzaSyAZ-O1FHzD0qOn0zeLmVGTJhBybVp4yXUA","AIzaSyCKrVC4PbYLa0S0CmIFj97PdjhwvEcALV4","AIzaSyDCiUTAEKc5flQmF_VbcN6rZfCBJcUPlNM","AIzaSyCZzbZYrl0q_DifacgL__oJMcSRLfR8qsY","AIzaSyBcwu1SywcDUTfyRTFVVBtOUmllvVu5lzY","AIzaSyD_GFTv0BYK2UqbuEmFuAb1PkJ1wHSjpaA","AIzaSyBWoA1ZTbfptkRREoNpA9ryhlnQPrWbiqQ","AIzaSyA3INgfTLddMbrJm8f68xpvfPZDAzDqk10","AIzaSyBmEgHy0Fs50bRDv2N-4LJYSy0-MkT-K50","AIzaSyBbTkdQ5Pl_tszqJqdafAqF0mVWWngv9HU","AIzaSyAzYHm1iwMocB9pW2uZrz_6Sqte5t_bXGo","AIzaSyDrVuKpzAesWaxmtPvrh_gvhm-035y2aWc","AIzaSyBnIAqzNEjw_ZJjqsRenVctNQMrIwHtAJw","AIzaSyAbI6T7s1vZtb_DY4pRWnuq-kZIqJNUa6E","AIzaSyCci79-Uk7M-hBXX8TFS8_y8e-8zpAiKlY","AIzaSyBrd7H-rEyn_bxcFnFUPbP8qAa7a-00qXo","AIzaSyBNMdTRxwA1waBGk_qFxUSRadSAw_dg3Bc","AIzaSyCIRFIVkrWdxEmbrjf6J1W2B_OahFHOZ8s","AIzaSyCBkbf66aT6R2tEULE-EFjIM_8i1ZSckWA","AIzaSyDuMSI5Hv5hRdpsDUEmN8q1U2RlOy23RB4","AIzaSyDBpLfYd502eOy7nYj-mVLSbD_XkB0lbFI","AIzaSyBQvKgojQbsIkZzYAZF1OT0UUAdAVMN4NQ","AIzaSyBIUneOnieL9jxdA1MiKuvaMrcibJc8Og0","AIzaSyDOfT_BO81aEZScosfTYMruJobmpjqNeEk","AIzaSyBJsZJqSOL5xkTam9lzE5Au-1gmlaL2t1g","AIzaSyAcs1k_I1W1OcErEOJypzx97vW2Pc7N2rE","AIzaSyC9X_RJzeeCplmrB6mB6qgZuLy_MLoyjEA","AIzaSyBD5UAIh55mTmz9WvafIi91HPuox8IWMA8","AIzaSyAe112w0RobjC1XtoO3Os3YI6cvMZm9oKk","AIzaSyCHwZBtG3Y89NQffIXKCdlRnduFVgWR4JI","AIzaSyBpzdGfqiHJj7VJBlZWKnPaLur8u4FMf3E","AIzaSyD7tj6EM3Y3r8sl1tV2ReMdTqyOg368bfw","AIzaSyC3AolfvPAPlJs-2FgyPJdEEKS6nbPHdSM","AIzaSyC2E6Eq8fOPcRS6_nnJK_n5O2dOSyJqQLU","AIzaSyBzEeJ0VPrk9CkFQEfAy6rkNlcW1Z8ALog","AIzaSyAxQmM8s8XLktIqQ7rnP9PwnwlzbPlKMd4","AIzaSyCU42JPkcy7vrZxa-HB_4axxn8u9qdrFn4","AIzaSyAFUNYmE1gfydRFrlb3Q05gXlPSgQmiY6I","AIzaSyCNQ1slAxWLz8pg6MCPXJDVdeozgQBYxz8","AIzaSyA25ISk8gdpn4md-gCNR2p_GH7z3KzgqKA","AIzaSyDgBp5KPiA5xyQqnGWs-mM7p5YLRm_hmKM","AIzaSyAaC_8-H6aak7eplurGNlJgZXj-6rJt7Y8","AIzaSyB160VdaM-ZZxuHItseLBJNht02Ey5T45E","AIzaSyAhV50luQmfnhbcgUdl5iApAY6bqT8EEVE","AIzaSyCzkspLu20yZKssmrEeH5Cz9cZU8tXYMPY","AIzaSyCSYn85k54O6ZRHhjjVuU3itvxCKuZTha4","AIzaSyA2V7ap54YkNGNz0H23bFBQ2rH-o7_gnRI","AIzaSyDWFJZLgApEib4bZMrXohp-8gLd4Ks4rMY","AIzaSyDZ04ZOZBWfENOzs9cTS9XolD-0tEhxzZo","AIzaSyC1q08sEH1Wo-FQeu08jR27Vy9onJTUjS8","AIzaSyBJQwVRua2_AFjOpzEOeXBvNZRichsG8v8","AIzaSyC7Czwy79W_Xd-ANIIZScJ6aW8dMG13wFQ","AIzaSyCdPQr0OBjSUdLqWoP29Z7oGp2NnBh5gNI","AIzaSyCAW5u0j2pz6RoavNbTYTsbn-VqWFLR0uk","AIzaSyDDEbTiTSAK89PFXon3sOGIX3CsTsBL1oA","AIzaSyCZfHRnq7tigC-COeQRmoa9Cxr0vbrK6xw","AIzaSyC_Uj__ANC72TG-UAknCN2jPakwxwql_kU","AIzaSyAmXIxtv1F8rXZugNXuCw89xiOVaBB0AI8","AIzaSyCSDI9_w8ROa1UoE2CNIUdDQnUhNbp9XR4","AIzaSyDvCl3FAOr9z7Na_oyG8PhdmkF6srQ-HtM","AIzaSyAJ8UVYKjhX9AmrTwBAfJIXnbnVlPaDxRQ","AIzaSyDHgqe2iHORox_6rxmlT19JjDlBuWYlygU","AIzaSyBH2ltO-MFMiW7dftsCCM3w8F86M-kwDHM","AIzaSyCB4Hj3pIiIb6IaqoJvp0BoKDIygkQnT2c","AIzaSyBmtm-NaguLZ3ylUbnEPtR_o4QIXIQVpuQ","AIzaSyDOqZtT01vX5FyWTPzalHIfq-wbOXIju2w","AIzaSyBDRlKTk3MQwjCzuY8O3o4VgexjwtXhY9Q","AIzaSyCN8A47a_r_cz0gW8cy1JXBQAs_nnOOSw0","AIzaSyA0xWbm5Q7SF5aFZQJ8EGmb6fNc8cjQEwg","AIzaSyDp042sWeJnrYxaSPe1NTQdsjGH5HZJYy8","AIzaSyC03yZIC1TYRqDYYjLAxFgg2TcTsBzwSeA","AIzaSyClWK6raBj4KMLWAwnX8KDT-EXU0HgdoRQ","AIzaSyC3YTdLwbWAehAQG_OvTMGVAIwE06F5c2w","AIzaSyA-IT1Xknxt1QrCmtlvAxVN8YRZoYRgKXs","AIzaSyB0Rdzmn2haPKG3YMEqFpPiYI1NrdLllx0","AIzaSyAT3li1KjfLidaL6Vt8T92MRU7n4VOrjYk","AIzaSyAviHxf_y0SzNoAq3iKqvWVE4KQ0yylsnk","AIzaSyCfuWj3r1tZGBB2m5qUBKprIMQhqgsrBkA","AIzaSyA7kmklNrAsCNZJLCIjsFhwc8mRCgB6dmg","AIzaSyDDXIPTpDjtE6f7Hhn_KylMVBHBZ00M2pk","AIzaSyCaoJTO7kL-t0dWhxkTwwO7kg2k7IwImCU","AIzaSyAvdBHlCMEHeirfOfkYlyflVxPxhXEJlU8","AIzaSyB3hw6YJqtiQRs1X5pNsmqWisgoifViVKE","AIzaSyDv9Y68QYWFcJFAYGOx6He7CHLGUiBYZT0","AIzaSyADrrUFFLxuICKBewoVisQO4Ws9Op8xTv0","AIzaSyDUEQDtVZP8x-I_acDvRsNZCa0H3ix7rdA","AIzaSyALz9JCfE7GzZN5-uDjFNrT61tyCeX2l20","AIzaSyDC3Jc6WGTo6r0vf7VlkzVnm25GZPpy5UI","AIzaSyDWaA2OoArAjQTHqmN6r9XrpHYNkpKGyGw","AIzaSyBfwGkn-dQxMy_T612ClTxE0akg4FYRVHI","AIzaSyAXrk1HSRZX2tEPDhKoPGm7gQ49--IKp2k","AIzaSyDWqz2skFHiBBAqv6b7DNDaDjYpS42x6vg","AIzaSyDQa76EpdNPzfeTAoZUut2AnvBA0jkx3FI","AIzaSyAFdgjUKpIcWTHRwXq0T8eI1X48qwoXOcs","AIzaSyCsxk-3l3HMjN4zZFQoOHpMj65lyEA8NW0","AIzaSyAzDG3Codsm7Idl3GG58-UfMVgTaXf3UO0","AIzaSyBaJakjjAHw0wvBtELAtDLPmhq1piGWwqQ","AIzaSyAuecFZ9xJXbGDkQYWBmYrtzOGJD-iDIgI","AIzaSyBDBi-4roGzWJN4du9TuDMLd_jVTcVkKz4","AIzaSyAF9zKXv-fxus9GNqn40SHzTn6F8A7h-Yo","AIzaSyCaKRDUC_i0ssju-9gI8OHdaiib2AgB5vA","AIzaSyDir60_mB1ywFtKxZm8UVVlML3IHo3gDlc","AIzaSyC64i92ZZaZFE4-PyV_XgC2Zg3af5QuMyY","AIzaSyCL9rLbM01CmVdUgYZWFYUIqcYUsso7MDQ","AIzaSyAw_yqlGyDEgYxr1Iwy1nrXxoMGWnbyU48","AIzaSyDXVJsi7H7U7qTJF05Q59UhBCWsHjm5jpQ","AIzaSyD86oVuDKqNJslXIDIvfKOypQyOA1JYqxU","AIzaSyBqFnd9RMee7nkMTaB5obHflnz-IDx3ubs","AIzaSyDoOC41IwRzX5XvP7bNiCJXJfcK14HalM0","AIzaSyDikf229xNW2Rp8WpCky8Ozdh4hb8Q_6qI","AIzaSyCH9jaMnrb-RN1YdfOoK6TV2tSruImGC70","AIzaSyBXZ2Lis8S_OeC18JsIFuo4WoIejkCYW9M","AIzaSyDWo1wA8aAodahRm66f0f3T8SKa7Abekck","AIzaSyDBsbVC_U-YkGkL7qH44FzDIAChJa4d6hg","AIzaSyAvMs3q0kVJouxjk-4rspL4u1X-mSr3Cc8","AIzaSyAiCBcaYLra0GCWcoY6rTWktJWwd0VKQ6A","AIzaSyCcx6V_hKT9RRHINxUib0sxNdGax3_s9-k","AIzaSyD2r3eSn-5E57EEligi8KZ283p03Dvi2pM","AIzaSyAGe_FTMQJMizv6xwYFLtW-beRGMidEzlE","AIzaSyDcOefuvEeAU76AyZ7uIEuXAufmaM5evok","AIzaSyA_DZWWeB3wGRcUARK-YveczXcU1zq6dbU","AIzaSyCZ31XxRuVs421sDbf8uBxVOBNVGj3E2dI","AIzaSyD5DCiCQ8c7fhOpjOVUj7En7RhrxLYaqas","AIzaSyAF-_5PLCt8DwhYc7LBskesUnsm1gFHSP8","AIzaSyBR9R0HWwxFiBHqI4lXjjDhajBe4Idl6wE","AIzaSyA5WEFxIq4Y5pbiifVB3VQVIlAptmMfgTw","AIzaSyBw_a3ya7iLt8cLCv-rAK8n237Ig9zyxi8","AIzaSyBPNmqdABOq45XYfUIeS70P5w7gRqlOq3g","AIzaSyDDxfHuYTdjwAUnFPeFUgqGvJM8qqLpdGc","AIzaSyDpPm2gDksydIr8MqQdPtqnHqfgVsu1Eho","AIzaSyChNx_9wMpfxrQ2s-lS0rpAH-rED-Dlm7c","AIzaSyBd0pAc-1ayarsVv9gW2cj0JVAeiW7Oop0","AIzaSyDGwjYdkHzte3uHqIRmSj-9JpA14Z-IKOk","AIzaSyBIBGFSUjhjqpO4z1J_LGcdT0iZ0SDLJ0k","AIzaSyCeUN1SkTP9Xyk14trr32Rin4jR6b5RRQo","AIzaSyCCHjrrkfRyd7tv94XCsO31Uii0rV9YjUQ","AIzaSyBM28Mpnwfy8kj3KF8QJF24LsnTMvgqR68","AIzaSyAdORXg7UZUo7sePv97JyoDqtQVi3Ll0b8","AIzaSyBguABYRDUZZzJ_NhziNo0ht48QJcEb9fQ","AIzaSyCmfo2f63mY7yWZ1t5buHvcAKNskpc65ck","AIzaSyCPKMoCzd_WwQ6HeQAFWITwVnL1-YDBxgE","AIzaSyA9YIeJMUAUAO5QaCo0wzfbdGlLIbjo1D4","AIzaSyC4omvspccw9HDX2_AIQjLN3hou3yUVDok","AIzaSyBa0GSoND22D8Rht2Op9zB7xjR92JSi0fc","AIzaSyCshGUfuCjvrprMANR6onqIz2J36AdPyWU","AIzaSyDBtwVpRnmyR4QnIWR8eQSt2OL6zptVpI0","AIzaSyAXwusx-FeUx1q-VaxFMjeOhsbXaSgSc6w","AIzaSyDBzHLsxelGxSSfxXASFw46S9WfQB5a8E4","AIzaSyBmKz0IYHWnKb5ztZXPEIYHGLlzxQ9ff-0","AIzaSyDwzkIDLMVTNo2ltklCAoC1jLN2baOxZkw","AIzaSyD_J1ogIrRBJVqRyWqT6unCEPwuWyq9CzY","AIzaSyB42WhSTkS6_0uUPX6EuGakkGz4RHXnlIc","AIzaSyBVvcBJO24xPJqSzavXcFMiO1CRyWr_Onk","AIzaSyBykc_bErt-mcLNSZ4ejKViOu4Prlllvbw","AIzaSyCx7tSe-nVQxMtQogL4ieGW5-Rf7dPKP04","AIzaSyBfWFKkPVwJcR5LrA-g5_tuwMdIBmP_LzU","AIzaSyCCU6hvAvb2kM_ZIKJqv7sXNlRLgoU0Yds","AIzaSyDP4QMWTCj7MHqRcoVBYQT-Is9wO0h9UIM","AIzaSyCtdd_n7FsI6aTV_speDI8RbqE_HSN3Zk4","AIzaSyBcDN4xUDTaEzz3wo5uretcWTc0IZ13mSA","AIzaSyBILLLf7p87lV48-1Z5D0eGeajf9v6KmJw","AIzaSyAgaVcpXSHbqOHSQLz3lZ7l0pK9gt43nhU","AIzaSyBxeXlBzdB4iidQyimAo6YAmib3X9HVB2w","AIzaSyB8L7TT_gIPp08b7Bz6XbdwA5GIgDQ7jSM","AIzaSyAGBMzRyZpDllE8kTDpT4OYu2TpRvqmcfI","AIzaSyAKTkgxYb0AlDUzomEUNM3DIvTbxxWGkZM","AIzaSyAEsCF-auElSFnRko2d3kPDV0EPmqra984","AIzaSyDwM9cJ6n9Nf2TPRfTnKf1N0UWLpNiEaw0","AIzaSyDhPRWtrxW0MwoO0RDyRIetVZWK2CZboBs","AIzaSyATo1gXS3ifvilrcTG8MCBkuIQRJilg9LY","AIzaSyDeW1bA2tkmYrJUa6E6SsdRcchOtQkhhEY","AIzaSyBlcT9jq3bf4gYT433ZuXDnsQs6A9-g3BA","AIzaSyB9OU0C69n5Y5oaM_s_1cLKWVa0sgut9fM","AIzaSyB5_G1mZ2ACxhwrhTpuw7TFkMVcI7dwXUw","AIzaSyCWMKdAmIK0EA5MMd2hdca9m9mrL2ewStI","AIzaSyAPm-CFWzIFi1zKKNEBA0PhKmDiu9gGXa8","AIzaSyDuf_6pIsPUf6L4_6oY3ULw_aMfM_Fw2AU","AIzaSyDwSBqpWJD1p73dIRcFcGYn65RBXBuedzM"];

// apiKeys = ['AIzaSyD4OdRh9by0ry-7kSUkITVHw1sSSLG0q-4','AIzaSyARqPa7dgDil9_OL7jw1UdWFcdUoT57O5U'];

var exampleItems = ['T0ivG4Ew-Lk', 'UCbKxy8dZtU1JcYFYR7RbB-g', 'UC6g5sQONOBrHvji67JSN7hQ']; //can be channelID, videoID; not URL
//    var startItem = getRandom(exampleItems);
var startItem = null;

function getRandomKey() {
    return getRandom(apiKeys);
}

var Video = {};
Video.params = {
    videoid: startItem,
    showtype: 'title',
    intervalVideo: null
};
Video.data = {
    title: null,
    desc: null
}

var Channel = {};
Channel.params = {
    channelID: startItem
};


Channel.getData = function(successCallback, errorCallback) {
    var apiKey = getRandomKey();
    var apiUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId='+Channel.params.channelID+'&eventType=live&type=video&maxResults=1&key='+apiKey; //ONLY BY CHANNELID
//        var apiUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&maxResults=1&q='+Channel.params.channelID+'&key='+apiKey; //BY CHANNELID/NAME
//        var apiUrl = 'http://localhost/likescounter/test.json';

    $.ajax({
        success : function(data, textStatus, xhr) {
            if(data.items.length<1) { //no items
                if(errorCallback) errorCallback(null,null,'noitems');
                return false;
            }
            if(successCallback) successCallback( data, textStatus, xhr );
        },
        error : function (xhr, textStatus, errorThrown) {
            if(xhr.status == 400) {
                errorCallback(null, null, 'nochannel');
                return false; //prevent setting interval
            }
            if(errorCallback) errorCallback(xhr, textStatus, errorThrown);
        },
        url: apiUrl,
        type : 'GET'
    });
};

var snippetIterator = 0;

Video.getData = function(successCallback, errorCallback, parts) {
    if(parts == undefined) {
        parts = 'statistics,liveStreamingDetails';
    }
    if(snippetIterator % 30 == 0) {
        parts = 'snippet,'+parts;
    }

    var apiKey = getRandomKey();
    console.log(apiKey);

    var apiUrl = 'https://www.googleapis.com/youtube/v3/videos?id='+Video.params.videoid+'&part='+parts+'&key=' + apiKey;
//        var apiUrl = 'http://davidos.dz.cr/likescounter/check.php';
    $.ajax({
        success : function(data, textStatus, xhr) {
//                console.log(data);
            if(data.items.length<1) { //no items
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
};



Video.getLikes = function (data) {
    return data.items[0].statistics.likeCount;
};
Video.getDisLikes = function (data) {
    return data.items[0].statistics.dislikeCount;
};

Video.getViewCount = function (data) {
    return data.items[0].statistics.viewCount;
};

Video.getCommentCount = function (data) {
    return data.items[0].statistics.commentCount;
};

Video.getLiveStreamViewers = function (data) {
    if(data.items[0].liveStreamingDetails) {
        return data.items[0].liveStreamingDetails.concurrentViewers;
    } else {
        return false;
    }
};


Video.checkLiveStream = function (data) {
    if(data.items[0].liveStreamingDetails) {
        return true;
    } else {
        return false;
    }
};

Video.getCommentCount = function (data) {
    return data.items[0].statistics.commentCount;
};

Video.getTitle = function (data) {
    if(data.items[0].snippet) {
        Video.data.title = data.items[0].snippet.title;
        return data.items[0].snippet.title;
    } else {
        return Video.data.title;
    }
};

Video.getDescription = function (data) {
    if(data.items[0].snippet) {
        Video.data.desc = data.items[0].snippet.description;
        return data.items[0].snippet.description;
    }
};

var getting = 0;
var loopStarted = 0;
var videoIterator = 0;
Video.init = function() {
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
//                $('.title').text(Video.getTitle(data));
            if(Video.getLiveStreamViewers(data)) $('.ov-livestreamviewers').addClass('live-on');



            /*
             $('.details').html(
             '<p><strong>Tagi: </strong>'+data.items[0].snippet.tags + '</p>'+
             '<p><strong>Opis: </strong>'+nl2br(data.items[0].snippet.description) + '</p>'+
             '<p><strong>KanaÅ‚ID: </strong>'+data.items[0].snippet.channelId + '</p>'+
             '<p><strong>KanaÅ‚: </strong>'+data.items[0].snippet.channelTitle + '</p>'
             );
             */


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
//                    $('.livestreamviewers').parent().hide();
                $('.views-total').parent().hide();
                new Odometer({
                    el: document.querySelector('.views'),
                    value: Video.getViewCount(data),

                    format: '( ddd)'
                });
            }

            if(!Video.checkLiveStream(data)) { //if not livestream
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
                console.log('[VIDEO Interval #'+videoIterator+'] '+new Date()); //just for debug
                if(!getting) {
                    Video.live();
                }
            }, 7000);


            //SAVE NEW REQUEST for analitycs
            var apiUrlSave = 'save-db.php';
            $.ajax({
                success : function(datasave, textStatus, xhr) {
                },
                error : function (xhr, textStatus, errorThrown) {
                    if(xhr.status == 400) {
                        return false; //prevent setting interval
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
//                $('.title').text(Video.getTitle(data));
            document.querySelector('.likes').innerHTML = Video.getLikes(data);
            document.querySelector('.dislikes').innerHTML = Video.getDisLikes(data);
            if(Video.checkLiveStream(data)) { //if live then show views total nad live viewers, else only total video views
                document.querySelector('.views').innerHTML = Video.getLiveStreamViewers(data);
                document.querySelector('.views-total').innerHTML = Video.getViewCount(data);
            } else {
                document.querySelector('.views').innerHTML = Video.getViewCount(data);
            }

            if(!Video.checkLiveStream(data)) document.querySelector('.comments').innerHTML = Video.getCommentCount(data);
        }

        console.log(data);
        console.log('Like: '+Video.getLikes(data));
        console.log('Dislike: '+Video.getDisLikes(data));
        console.log('LiveStream Viewers: '+Video.getLiveStreamViewers(data));
        console.log('Total Views: '+Video.getViewCount(data));
        console.log('Comments: '+Video.getCommentCount(data));
        console.log('---');


        if(typeof data.items[0].liveStreamingDetails !== 'undefined' && typeof data.items[0].liveStreamingDetails.actualEndTime !== 'undefined') {
            var ended = data.items[0].liveStreamingDetails.actualEndTime;
            var date = new Date(ended);
            var curr_date = date.getDate();
            var curr_month = date.getMonth() + 1; //Months are zero based
            var curr_year = date.getFullYear();
            var curr_hour = date.getHours();
            var curr_minutes = date.getMinutes();
            $('.info').show().html(getTrans('live-ended')+': ' + curr_date + "." + curr_month + "." + curr_year + " " + curr_hour + ":" + curr_minutes);
//                clearInterval(Video.params.intervalVideo);
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
            Video.init(); //no loop problem thanks to loopStarted variable :)
            getting = 1;
            //TODO: remove from array wrong api keys
        }
        else {
            $('.info').show().html('Error');
        }

//            clearInterval(intervalVideo); //turn off for infinite loop
        return false;
    });
};

Video.live = function() {
    Video.init();
};

var channelIntervalSet = 0;
var channelIntervalIterator = 0;
Channel.live = function() {
    Channel.getData(function (data) {
        console.log(data);
        Video.params.videoid = data.items[0].id.videoId;
        $('#vidid').data('channelid', Channel.params.channelID);
        $('.info').html('').hide();

        if(channelIntervalSet == 1) {
            clearInterval(intervalChannelID);
        }
        Video.init();
    }, function(xhr, textStatus, errorThrown){
        if(errorThrown == 'noitems') {
            channelIntervalIterator++;
            $('.info').show().html(getTrans('error-no-live')+';) #' + channelIntervalIterator);
        } else if(errorThrown == 'nochannel') {
            $('.info').show().html(getTrans('error-wrong-id-channel')+'!');

            return false;
        } else {
            $('.info').show().html('Error');
        }

        if(channelIntervalSet == 0) {
            intervalChannelID = setInterval(function(){
                console.log('Refreshing - waiting for livestream');
                Channel.live();
            }, 7000);
            channelIntervalSet = 1;
        }
    });
};


var videoID = getParameterByName('vidid');
if(videoID) {
    Video.params.videoid = videoID;
} else {
    videoID = Video.params.videoid;
}

if(videoID != null && videoID.length>12) {
    Channel.params.channelID = videoID;
    Channel.live();
} else if(videoID != null) {
    Video.init();
}

$('input[name=vidid]').val(Video.params.videoid);



var ChannelID = {
    channelInfo: null,

    getChannelID: function(name) {
        var apiKey = getRandomKey();
        var apiUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&maxResults=3&q='+name+'&key='+apiKey; //BY CHANNELID/NAME
        var $this = this;

        $.ajax({
            success : function(data, textStatus, xhr) {
                if(data.items.length<1) { //no items
                    return false;
                }
                console.log(data);

                $this.writeInfo('.channellist', data.items);
            },
            error : function (xhr, textStatus, errorThrown) {
                if(xhr.status == 400) {
                    return false; //prevent setting interval
                }
            },
            url: apiUrl,
            type : 'GET'
        });
    },
    writeInfo: function(idDiv, channelInfo) {
        $(idDiv).empty();

        for (var i = 0, len = channelInfo.length; i < len; i++) {
            var singleChannelInfo = this.formatDetails(channelInfo[i]);

            $(idDiv).append(
                '<li>' +
                '<img class="channelThumb" src="'+singleChannelInfo.channelThumb+'">' +
                '<div class="channelId"><strong>ChannelID: </strong><a href="?vidid='+singleChannelInfo.channelID+'" target="_blank">'+singleChannelInfo.channelID+'</a></div>' +
                '<div class="channelTitle"><strong>Nazwa YT: </strong><a href="https://youtube.com/channel/'+singleChannelInfo.channelID+'" target="_blank">'+singleChannelInfo.channelTitle+'</a></div>' +
                (singleChannelInfo.channelDesc.length>1 ? '<div class="channelDesc"><strong>Opis: </strong>'+singleChannelInfo.channelDesc.substr(0,200)+ '</div>' : '') +
                '</li>');
        }
        var ytHelptxt = getTrans('channelid-wrong');
        $(idDiv).append('<p class="youtube-help">'+ytHelptxt+'</p>');


    },
    formatDetails: function (channelInfo) {
        var channelID = channelInfo.id.channelId;
        var channelTitle = channelInfo.snippet.channelTitle;
        var channelDesc = channelInfo.snippet.description;
        var channelThumb = channelInfo.snippet.thumbnails.high.url;
        var channelObj = {channelID: channelID, channelTitle: channelTitle, channelDesc: channelDesc, channelThumb:channelThumb};

        return channelObj;
    }

}

//TODO: CHECK FOR END OF STREAM
//TODO: EMBED search by name from CHANNELID https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&maxResults=1&q=nick/channelid&key=key

$(document).ready(function(){
    $('#shareurl').val(window.location.href);
    $('[data-toggle="tooltip"]').tooltip();


    if(getCookie('colorselect-tooltipclose') != 1) {
        $('.colorselect .infobox').show();
    }

    $('.colorselect .infobox .closebox').on('click', function(e){
        e.preventDefault();
        if(getCookie('colorselect-tooltipclose') != 1) {
            setCookie('colorselect-tooltipclose',1,60);
            $('.colorselect .infobox').fadeOut();
        }
    });


    $('.lang-select').on('change', function() {
        $(this).submit();
    });

});

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
