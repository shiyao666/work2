
$(document).ready(function () {
    var boolean1 = true;
    $(window).scroll(function () {
        var topd = $(window).scrollTop();

        if (topd > 250 && boolean1) {
            $(".s2002top_left").fadeIn(500);
            $(".s2002top_right").fadeIn(500);
        }
        if (topd > 300 && boolean1) {
            $(".s2002top_center").fadeIn(500);
        }

    })
})







window.onload = function () {
    //需求1：缓动滚动条当页面被卷去的顶部大于1000px；显示img；否则隐藏；
    //需求2：点击img，页面缓动到最顶端；

    var img = $(".img")[0];
    //需求1：缓动滚动条当页面被卷去的顶部大于500px；显示img；否则隐藏；
    window.onscroll = function () {
        //只要屏幕滚动就判断
        if (scroll().top > 1000) {
            img.style.display = "block";
        } else {
            img.style.display = "none";
        }

        //页面的纵坐标，刚好是页面被卷去的顶部；页面每滑动一次，我们就给leader赋值一次；
        leader = scroll().top;
    }

    //需求2：点击img，页面缓动到最顶端；
    //新技术：window.scrollTo(x,y);   页面加载的时候，左上角的坐标值为0,0;
    //页面内部的值都是正值；
    var timer = null;
    var leader = 0;

    img.addEventListener("click", function () {

        clearInterval(timer);
        timer = setInterval(function () {
            var step = (0 - leader) / 2;

            step = step > 0 ? Math.ceil(step) : Math.floor(step);

            leader += step;
            window.scrollTo(0, leader);

            if (leader === 0) {
                clearInterval(timer);
            }
        }, 30);
    });
}

function scroll() {
    return {
        top: window.pageYOffset || document.documentElement.scrollTop,
        left: window.pageXOffset || document.documentElement.scrollLeft
    };
}
