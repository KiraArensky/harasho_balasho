window.onscroll = function () {
    scrollFunction()
};

function scrollFunction() {
    let MyElement = document.getElementById("myBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        if (MyElement) {
            MyElement.style.display = "block";
        }
    } else {
        if (MyElement) {
            MyElement.style.display = "none";
        }
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
