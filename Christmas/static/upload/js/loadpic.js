
function preventEventPropagation(evt) {
    var e = evt || window.event;
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    return false;
}

var loadImg1 = false,loadImg2 = false;
function cropStart(evt) {
    console.log(1)
    var $upload = $("#uploadInput");
    $upload.on("change", function(evt){
        var file = this.files[0];
        var reader = new FileReader();
        reader.onload = function() {
            // ת������������
            var binary = this.result;
            var binaryData = new BinaryFile(binary);
            // ��ȡexif��Ϣ
            var imgExif = EXIF.readFromBinaryFile(binaryData);

            var fullScreenImg = new Image();
            fullScreenImg.onload = function(){
                //console.log(this.src);
                var $loadImg = $("#load_img");
                $loadImg[0].src = this.src;
                $loadImg.show();
                loadImg1 = true;
                var imgWidth = this.width;
                var imgHeight = this.height;
            }
            $("#photo_frame").attr('src','http://ossweb-img.qq.com/images/roco/act/a20150621daddy/frame_dog.png');
            $("#photo_change1").attr('src','http://ossweb-img.qq.com/images/roco/act/a20150621daddy/change_tip1.png');
            var mpImg = new MegaPixImage(file);
            mpImg.render(fullScreenImg, {maxWidth:960, maxHeight:960, orientation:imgExif.Orientation});
        }
        reader.readAsBinaryString(file);

        return preventEventPropagation(evt);
    });
    $upload.trigger("click");

    return preventEventPropagation(evt);
}

function cropStart2(evt) {
    console.log(2)
    var $upload = $("#uploadInput2");
    $upload.on("change", function(evt){
        var file = this.files[0];
        var reader = new FileReader();
        reader.onload = function() {
            // ת������������
            var binary = this.result;
            var binaryData = new BinaryFile(binary);
            // ��ȡexif��Ϣ
            var imgExif = EXIF.readFromBinaryFile(binaryData);

            var fullScreenImg = new Image();
            fullScreenImg.onload = function(){
                //console.log(this.src);
                var $loadImg = $("#load_img2");
                $loadImg[0].src = this.src;
                $loadImg.show();
                loadImg2 = true;
                var imgWidth = this.width;
                var imgHeight = this.height;
            }
            $("#photo_frame2").attr('src','http://ossweb-img.qq.com/images/roco/act/a20150621daddy/frame_dog.png');
            $("#photo_change2").attr('src','http://ossweb-img.qq.com/images/roco/act/a20150621daddy/change_tip2.png');
            var mpImg = new MegaPixImage(file);
            mpImg.render(fullScreenImg, {maxWidth:960, maxHeight:960, orientation:imgExif.Orientation});
        }
        reader.readAsBinaryString(file);

        return preventEventPropagation(evt);
    });
    $upload.trigger("click");

    return preventEventPropagation(evt);
}


function uploadPageReady() {
    var isSupportTouch = window.supportTouch;
    $("#uploadBtn").on(isSupportTouch ? "touchend" : "click", cropStart);
    $("#uploadBtn2").on(isSupportTouch ? "touchend" : "click", cropStart2);

    // ��������
    function isloadImg(){
        //console.log(!loadImg1.src == null)
        if(loadImg1 && loadImg2){
            /*$(".scan-mask").removeClass("none");
            $(".scan-green").removeClass("none");
            $(".scan-green").addClass("am-scandown");
            $("#test_state").html("DNA����С�");*/
        }
        else{
            /*$("#test_state").html("���ϴ�2����Ƭ");*/
        }
    }

    $("#btn_start").on(isSupportTouch ? "touchend" : "click",isloadImg);

    if (window.isAndroid && window.androidVer <= 2.3) {
        window.alert("请在更高版本的浏览器中打开此页面");
        return;
    }
}

//��������ѡ����Ƭ
/*
function reUploadImg(){
    var $loadImg = $("#load_img");
    $loadImg[0].src = '';
    $loadImg[1].src = '';
    $("#photo_frame").attr('src','http://ossweb-img.qq.com/images/roco/act/a20150621daddy/cartoon_roco.png');
    $("#photo_frame2").attr('src','http://ossweb-img.qq.com/images/roco/act/a20150621daddy/cartoon_maqiu.png');
    $(".scan-mask").addClass("none");
    $(".scan-green").addClass("none");
    $(".scan-green").removeClass("am-scandown");
    $("#test_state").html("");
}
*/
/*  |xGv00|ee71797011a1a36031a8ffc86e782a72 */