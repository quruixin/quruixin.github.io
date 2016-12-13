$(function () {
	'use strict';
	var console = window.console || { log: function () {} },
    $alert = $('.docs-alert'),
    $message = $alert.find('.message'),
    showMessage = function (message, type) {
        $message.text(message);
        if (type) {
        	$message.addClass(type);
        }
        $alert.fadeIn();
        setTimeout(function () {
        	$alert.fadeOut();
        }, 3000);
      };
      (function () {
    	  var $image = $('.img-container > img'),
    	  options = {
    		  checkImageOrigin:false,
    		  guides: false,
    		  background: false,
    		  dragCrop:false,
    		  movable:false,
          resizable:false,
          /*rotatable:false,*/
          aspectRatio: 3.3 / 4,
          preview: '.img-preview',
        };

    	var sex = '';
		var $result = $('#result');
		var $button = $("#button");
		$button.on('click', function () {
			var croppedCanvas;
			var roundedCanvas;
			$(this).parents(".cutimg").hide();
			/*if(!!aspectRatio){
					
			}*/
			// Crop
			croppedCanvas = $image.cropper('getCroppedCanvas', options);

			var roundedCanvas = document.createElement('canvas');
			  var context = roundedCanvas.getContext('2d');
			  var width = croppedCanvas.width;
			  var height = croppedCanvas.height;

			  roundedCanvas.width = width;
			  roundedCanvas.height = height;
			  context.drawImage(croppedCanvas, 0, 0, width, height);
			  /*alert(roundedCanvas.toDataURL());*/
			  /*$result.html('<img src="' + croppedCanvas.toDataURL() + '">');*/
			  $(".uploadshade").show();
			 	//$result.find(">img").attr("src", croppedCanvas.toDataURL());
			  console.log('--->' + sex);
			  if(sex == '1'){
				  $('.photo-con2').html('<img id="load_img2"  class="photo-img" src="' + croppedCanvas.toDataURL() + '"/>');
				  $("#load_img2").src(croppedCanvas.toDataURL());
			  }else {
				  $('.photo-con').html('<img id="load_img" class="photo-img" src="' + croppedCanvas.toDataURL() + '"/>');
				  $("#load_img").src(croppedCanvas.toDataURL())
			  }
			 	$(".hideClass").val(croppedCanvas.toDataURL());
			 	$(".uplod-tiptxt").remove();
//			 	var Orientation = null;
//      var imga = document.getElementById('imgs');
//			    EXIF.getData(imga, function(){
//			    	 alert(11)
//			    		alert(EXIF.pretty(this));
//			        /*EXIF.getAllTags(this);
//			        Orientation =EXIF.getTag(this, 'Orientation');*/
//			   });
     	 });
    $image.on({
      'build.cropper': function (e) {
        console.log(e.type);
      },
      'built.cropper': function (e) {
        console.log(e.type);
      },
      'dragstart.cropper': function (e) {
        console.log(e.type, e.dragType);
      },
      'dragmove.cropper': function (e) {
        console.log(e.type, e.dragType);
      },
      'dragend.cropper': function (e) {
        console.log(e.type, e.dragType);
      },
      'zoomin.cropper': function (e) {
        console.log(e.type);
      },
      'zoomout.cropper': function (e) {
        console.log(e.type);
      }
    }).cropper(options);
    // Import image
    var $inputImage = $('#inputImage'),
    	$inputImage2 = $('#inputImage2'),
        URL = window.URL || window.webkitURL,
        blobURL;
    var arry = [];
    arry.push($inputImage);
    arry.push($inputImage2);
    if (URL) {
    	$.each(arry, function(i,n){
    		n.change(function () {
    	     	/*$inputImage.bind("change",function(){})
    	     	$(document).on("change",$inputImage,function(){})
    	     	$inputImage.on("change",function(){})
    	     	$inputImage.change(function(){})*/
    			sex = i;
    	      	$(".cutimg").show();
    	        var files = this.files,
    	            file;

    	        if (files && files.length) {
    	          file = files[0];

    	          if (/^image\/\w+$/.test(file.type)) {
    	        	  
    	        	  var orientation = null;
    	              //EXIF js 可以读取图片的元信息 https://github.com/exif-js/exif-js
    	              //解决ios图片翻转问题；
    	              EXIF.getData(file,function(){
    	                orientation=EXIF.getTag(this,'Orientation');
    	              });
    	              setTimeout(function(){
    	            	  var reader = new FileReader();
    	                  reader.onload = function(e) {
    	                	  getImgData(this.result, orientation,function(data){
    	                		  //这里可以使用校正后的图片data了
    	                		  $image.one('built.cropper', function () {
    	                			  URL.revokeObjectURL(data); // Revoke when load complete
    	                		  }).cropper('reset', true).cropper('replace', data);
    	                	  });
    	                  }
    	                  reader.readAsDataURL(file);
    	              }, 1000);
    	              
    	              
    	        	  
    	        	  
    	        	  
    	          /**
    	            blobURL = URL.createObjectURL(file);
    	            $image.one('built.cropper', function () {
    	              URL.revokeObjectURL(blobURL); // Revoke when load complete
    	            }).cropper('reset', true).cropper('replace', blobURL);
    	            
    	            **/
    	          } else {
    	            showMessage('Please choose an image file.');
    	          }
    	        }
    	        
    	        
    	        
    	      });
    	})
      
      /*var Orientation = null;*/ 
      
      
    } else {
      $inputImage.parent().remove();
    }
		/*EXIF.getData(document.getElementById('inputImage'), function(){
		  EXIF.getAllTags(this);
		  EXIF.getTag(this, 'Orientation');
		});*/
		
		$(document.body).on('click', '[data-method]', function () {
		  var data = $(this).data(),
		      $target,
		      result;
		
		  if (data.method) {
		    data = $.extend({}, data); // Clone a new one
		
		    if (typeof data.target !== 'undefined') {
		      $target = $(data.target);
		
		      if (typeof data.option === 'undefined') {
		        try {
		          data.option = JSON.parse($target.val());
		        } catch (e) {
		          console.log(e.message);
		        }
		      }
		    }
		
		    result = $image.cropper(data.method, data.option);
		
		    if (data.method === 'getCroppedCanvas') {
		      $('#getCroppedCanvasModal').modal().find('.modal-body').html(result);
		    }
		
		    if ($.isPlainObject(result) && $target) {
		      try {
		        $target.val(JSON.stringify(result));
		      } catch (e) {
		        console.log(e.message);
		      }
		    }
		
		  }
		}).on('keydown', function (e) {
		
		  switch (e.which) {
		    case 37:
		      e.preventDefault();
		      $image.cropper('move', -1, 0);
		      break;
		
		    case 38:
		      e.preventDefault();
		      $image.cropper('move', 0, -1);
		      break;
		
		    case 39:
		      e.preventDefault();
		      $image.cropper('move', 1, 0);
		      break;
		
		    case 40:
		      e.preventDefault();
		      $image.cropper('move', 0, 1);
		      break;
		  }
		
		});

  }());

 

});





//判断图片方向，并且矫正
// @param {string} img 图片的base64
// @param {int} dir exif获取的方向信息
// @param {function} next 回调方法，返回校正方向后的base64
function getImgData(img,dir,next){
  var image=new Image();
  image.onload=function(){
    var degree=0,drawWidth,drawHeight,width,height;
    drawWidth=this.naturalWidth;
    drawHeight=this.naturalHeight;
    //以下改变一下图片大小
    var maxSide = Math.max(drawWidth, drawHeight);
    if (maxSide > 1024) {
      var minSide = Math.min(drawWidth, drawHeight);
      minSide = minSide / maxSide * 1024;
      maxSide = 1024;
      if (drawWidth > drawHeight) {
        drawWidth = maxSide;
        drawHeight = minSide;
      } else {
        drawWidth = minSide;
        drawHeight = maxSide;
      }
    }
    var canvas=document.createElement('canvas');
    canvas.width=width=drawWidth;
    canvas.height=height=drawHeight;
    var context=canvas.getContext('2d');
    //判断图片方向，重置canvas大小，确定旋转角度，iphone默认的是home键在右方的横屏拍摄方式
    switch(dir){
      //iphone横屏拍摄，此时home键在左侧
      case 3:
        degree=180;
        drawWidth=-width;
        drawHeight=-height;
        break;
      //iphone竖屏拍摄，此时home键在下方(正常拿手机的方向)
      case 6:
        canvas.width=height;
        canvas.height=width;
        degree=90;
        drawWidth=width;
        drawHeight=-height;
        break;
      //iphone竖屏拍摄，此时home键在上方
      case 8:
        canvas.width=height;
        canvas.height=width;
        degree=270;
        drawWidth=-width;
        drawHeight=height;
        break;
    }
    //使用canvas旋转校正
    context.rotate(degree*Math.PI/180);
    context.drawImage(this,0,0,drawWidth,drawHeight);
    //返回校正图片
    next(canvas.toDataURL("image/jpeg",.8));
  }
  image.src=decodeURIComponent(img);
}