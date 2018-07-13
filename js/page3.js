$("body").on("click", ".s2004getlogon", function click1() {
    var phonename = $("#name").val();
    var phone = $("#phone").val();
    $.ajax({
        url: 'http://192.168.4.53/index.php?m=invform&c=phone&a=send_mes',
        type: 'POST',
        data: {
            'name': phonename,
            'phone': phone
        },
        dataType: 'json',
        success: function (msg) {

            if (msg.code == 10005) {
                var time1 = 60;
                $(".s2004getlogon").removeClass;
                $(".s2004getlogon").html("(" + time1 + "秒)");
                setTime = setInterval(
                    function () {
                        if (time1 > 0) {
                            time1--;
                            $(".s2004getlogon").html("(" + time1 + "秒)");
                            $(".s2004getlogon").unbind("click", click1);
                        } else {
                            $(".s2004getlogon").bind("click", click1);
                            $(".s2004getlogon").text("重新获取");
                            $(".s2004getlogon").removeAttr("disabled");
                            clearInterval(setTime);

                        }
                    }, 1000);
                alert(msg.message)
            } else {
                alert(msg.message);
            }
        },
        error: function (msg) {
            return false;
        }
    });
});


$(".s2004nowsubmit").bind("click", function sendMessage() {

    var uid = $('#phone').val();
    var name1 = $('#name').val();
    $.ajax({
        type: "post",
        dataType: "json",
        url: 'http://192.168.4.53/index.php?m=invform&c=phone&a=logon',
        data: {
            "phone": uid,
            "code": name1,
            "form_id": 2
        },
        error: function () {
            return false;
        },
        success: function (msg) {
            if (msg.code == 10009) {
                $(".form").empty();
                $("#newform").addClass("newform1"),
                    $("#newform").append("报名成功")
            }
            alert(msg.message);
        }
    });
});



//记录页面进入的cookie

function setCookie(c_name, value, expiredays) {
    console.log(c_name)
    var exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = c_name + "=" + escape(value) +
        ((expiredays == null) ? "" : "; expires=" + exdate.toGMTString())
}


function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=")
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1
            c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1) c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}

$(document).ready(function () {

    setTimeout(function () {
        token = getCookie("token");

        $.ajax({
            type: 'POST',

            async: false,
            url: 'http://192.168.4.53/index.php?m=invform&c=phone&a=index',
            dataType: "json",
            data: {
                "token": token,
                "form_id": 2
            },
            error: function (msg) {

                return false;
            },
            success: function (msg) {
                console.log("success")
                setCookie("token", msg.token);
                // document.cookie = "token=" + msg.token + "; expire=" + exp.toGMTString();

            }

        });
    }, 5000);
});

// $(".s2004nowsubmit").hover(function () {
//     $(".s2004bottom_big").animate({ left: '250px' });
//     $("s2004bottom_big").animate({
//         "width": "50px",
//     }, "slow", function () {
//         // return false;
//     });
// });
// $(function () {

//     $(".s2004nowsubmit").hover(function () {
//         $(".s2004bottom_big").slideDown(5000, function () {
//             alert("动画执行完毕！");
//         });
//     })


//     $(".s2004nowsubmit").click(function () {
//         slideUp();
//         $(".s2004bottom_big").slideUp();
//         $(".s2004bottom_big").slideUp(2000, function () {
//             alert("动画执行完毕！");
//         });
//     })

//     $(".s2004nowsubmit").click(function () {
//         $(".s2004bottom_big").slideToggle(1000);
//     })
// })
