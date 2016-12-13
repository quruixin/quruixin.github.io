/**
 * [圣诞活动]
 * 
 * @Author: 阿呆
 * @Date: 2016-11-12
 */
(function() {
	uiLoading(true);
	$('.index-top, .index-text-con, .index-btn-con').show();
	var userToken = $(".userToken").val();
	var prevResultImg = $('.shareUrl').val();
	var preOpenid=$('.preOpenid').val();
	var nickname = "";
	    $.ajax({
				data : {account:'15501054989',password:'123456'},
				url : 'http://test01.ers.huohetech.com/ers/common/user/login.do',
				type : 'post',
				datatype : 'json',
				success : function(result) {
					// 移除加载
					uiLoading(false);
					var data = result.data.user;
					//$('.index-top, .index-text-con, .index-btn-con').show();
					if (data) {
						nickname = data.name;
						$('.result-name').text(nickname);
						var  nowOpenId = data.user_id;
						shareImgUrl = $('.shareImgUrl').val();
						
						if (!shareImgUrl) {   //原本为 if (shareImgUrl)
							// 是分享的
							$('.mine-result, .index-btn-con').show();
							$('.mine-result img').attr('src', shareImgUrl);
							
						} else {
							$('.index-top, .index-text-con, .index-btn-con').show();
						}
						var nowUrl = window.location.href;
						userScore = '';
						
					}
				},
				error : function() {
					popupShow('请求错误,请重试');
				}
			});

	/* 如果当前地址中有ownerPhone，并且ownerPhone不等于helperPhone，那么进入助他一臂之力页面 */
	function getQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null)
			return unescape(r[2]);
		return null;
	}

	// http://localhost:63342/test/html/index.html?score=98.2&name=韩渣kaideShare=true
	/* 获取当前地址的参数feed_id的值 */
	/*
	 * var kaideShare = getQueryString("prevOpenid"); console.log(userScore)
	 * if(kaideShare == 'true') { console.log("分享"); $('.index-top').hide();
	 * $('.index-text-con').hide(); $('.mine-result').show(); } else {
	 * console.log("不是分享") }
	 */
	// http://localhost:63342/test/html/index.html
	// var nowUrl = window.location.href;
	// 传递url汉字
	/*
	 * function send(){ var url = window.location.href;//获取url userName2 =
	 * $(".result-name").html(); urlNew = encodeURI(url + "?userName=" +
	 * userName2) console.log(urlNew); } send(); // 获取url汉字 var userName2 =
	 * decodeURI(userName2) console.log(userName2)
	 */

	// 是否微信
	function isWeixin() {
		return /MicroMessenger/i.test(navigator.userAgent);
	}
	console.log('是否为微信打开',isWeixin())

	// 开始游戏点击
	var uploadCon = $('.upload-con')
	$('.index-btn-play').on("click", function() {
		// document.title =nickname;
		$('.index-page').css('z-index', '-2');
		$('.slideBox').addClass('roll');

		setTimeout(function() {
			$('.slick-list').removeClass('draggable');
			uploadCon.show(300);
			popupShow("请上传大头贴哟~")
		}, 500);
	});

	// 给上传的照片添加白色背景图
	$('.btn-con input').change(
			function(e) {
				var $this = $(this);
				$this.parent().find('.camera').hide();
				function removeLoadImg() {
					if ($this.parent().hasClass('upload-girl')) {
						$('#load_img').appendTo($('.slick-active').find('.photo-con'));
					} else {
						$('#load_img2').appendTo($('.slick-active').find('.photo-con2'));
					}
				}
				if ($('.one-buy').hasClass('slick-active')) {
					removeLoadImg();
				} else if ($('.two-korea').hasClass('slick-active')) {
					removeLoadImg();
				} else if ($('.three-fitness').hasClass('slick-active')) {
					removeLoadImg();
				} else if ($('.four-snowman').hasClass('slick-active')) {
					removeLoadImg();
				}
				// $(this).parent().addClass('bg');
			});

	// 上传图片区域
	var btnCon = $('.btn-con'), cameraBtn = $('.btn-con .camera');
	function btnConShow() {
		btnCon.hide();
		// cameraBtn.css('opacity','0')
		setTimeout(function() {
			btnCon.show();
			// cameraBtn.css('opacity','1')
		}, 280);
	}

	// 点击下一张箭头
	$('.slideBox').on(
			"click",
			'.slick-next',
			function() {
				btnConShow();
				// $('#load_img, #load_img2').attr('src', '');
				// $('.btn-con').removeClass('bg');
				if ($('.one-buy').hasClass('slick-active')) {
					$('.container').attr('class', 'container korea');
//					if ($('.one-buy').find('#load_img').length > 0) {
//						$('#load_img').appendTo(
//								$('.two-korea').find('.photo-con'));
//					}
//					if ($('.one-buy').find('#load_img2').length > 0) {
//						$('#load_img2').appendTo(
//								$('.two-korea').find('.photo-con2'));
//					}
//					$('.one-buy').find('.photo-img').remove();
				} else if ($('.two-korea').hasClass('slick-active')) {
					$('.container').attr('class', 'container fitness');
//					if ($('.two-korea').find('#load_img').length > 0) {
//						$('#load_img').appendTo(
//								$('.three-fitness').find('.photo-con'));
//					}
//					if ($('.two-korea').find('#load_img2').length > 0) {
//						$('#load_img2').appendTo(
//								$('.three-fitness').find('.photo-con2'));
//					}
//					$('.two-korea').find('.photo-img').remove();
				} else if ($('.three-fitness').hasClass('slick-active')) {
					$('.container').attr('class', 'container snowman');
//					if ($('.three-fitness').find('#load_img').length > 0) {
//						$('#load_img').appendTo(
//								$('.four-snowman').find('.photo-con'));
//					}
//					if ($('.three-fitness').find('#load_img2').length > 0) {
//						$('#load_img2').appendTo(
//								$('.four-snowman').find('.photo-con2'));
//					}
//					$('.three-fitness').find('.photo-img').remove();
				} else if ($('.four-snowman').hasClass('slick-active')) {
					$('.container').attr('class', 'container buy');
//					if ($('.four-snowman').find('#load_img').length > 0) {
//						$('#load_img').appendTo(
//								$('.one-buy').find('.photo-con'));
//					}
//					if ($('.four-snowman').find('#load_img2').length > 0) {
//						$('#load_img2').appendTo(
//								$('.one-buy').find('.photo-con2'));
//					}
//					$('.four-snowman').find('.photo-img').remove();
				}
			});
	// 点击前一张箭头
	$('.slideBox').on(
			"click",
			'.slick-prev',
			function() {
				btnConShow();
				// $('#load_img, #load_img2').attr('src', '');
				// $('.btn-con').removeClass('bg');
				if ($('.one-buy').hasClass('slick-active')) {
					$('.container').attr('class', 'container snowman');
//					if ($('.one-buy').find('#load_img').length > 0) {
//						$('#load_img').appendTo(
//								$('.four-snowman').find('.photo-con'));
//					}
//					if ($('.one-buy').find('#load_img2').length > 0) {
//						$('#load_img2').appendTo(
//								$('.four-snowman').find('.photo-con2'));
//					}
//					$('.one-buy').find('.photo-img').remove();
				} else if ($('.two-korea').hasClass('slick-active')) {
					$('.container').attr('class', 'container buy');
//					if ($('.two-korea').find('#load_img').length > 0) {
//						$('#load_img').appendTo(
//								$('.one-buy').find('.photo-con'));
//					}
//					if ($('.two-korea').find('#load_img2').length > 0) {
//						$('#load_img2').appendTo(
//								$('.one-buy').find('.photo-con2'));
//					}
//					$('.two-korea').find('.photo-img').remove();
				} else if ($('.three-fitness').hasClass('slick-active')) {
//					$('.container').attr('class', 'container korea');
					$('.container').attr('class', 'container snowman');
//					if ($('.three-fitness').find('#load_img').length > 0) {
//						$('#load_img').appendTo(
//								$('.two-korea').find('.photo-con'));
//					}
//					if ($('.three-fitness').find('#load_img2').length > 0) {
//						$('#load_img2').appendTo(
//								$('.two-korea').find('.photo-con2'));
//					}
//					$('.three-fitness').find('.photo-img').remove();
				} else if ($('.four-snowman').hasClass('slick-active')) {
					$('.container').attr('class', 'container fitness');
//					if ($('.four-snowman').find('#load_img').length > 0) {
//						$('#load_img').appendTo(
//								$('.three-fitness').find('.photo-con'));
//					}
//					if ($('.four-snowman').find('#load_img2').length > 0) {
//						$('#load_img2').appendTo(
//								$('.three-fitness').find('.photo-con2'));
//					}
//					$('.four-snowman').find('.photo-img').remove();
				}
			});

	// 点击揭秘按钮
	// var resultBg = $('.result-con .bg-img');
	var resultCon = $('.result-con');
	$('.scene-btn-con .reveal').click(function() {
						$('.result-con').attr('class','result-con fitness-result');
						$('.result-con-bg').attr('src','/static/images/result-bg3.png');
						// 用attr获取,不要用prop
						if ($('#load_img').attr('src') == '' || $('#load_img2').attr('src') == '') {
							popupShow('请先上传两张照片~');
						}
						// 如果两张图都已上传
						else {
							asertTitle(nickname);
							uiLoading(false);
							$.ajax({
										// url:
										// 'http://www.dailuu.com/s-s/static/upload/value',
										url : 'http://test01.ers.huohetech.com/ers/common/dic/org.do',
										type : 'GET',
										success : function(data) {
											// alert('修改标题');
											console.log(data);
											userScore = data.testVal;
											// 生成不同的结果页
											if ($('.container').hasClass('korea')) {
												$('.result-con').attr('class','result-con korea-result');
												$('.result-con-bg').attr('src','/static/images/result-bg2.png')
											} else if ($('.container').hasClass('fitness')) {
												$('.result-con').attr('class','result-con fitness-result');
												$('.result-con-bg').attr('src','/static/images/result-bg3.png')
											} else if ($('.container').hasClass('snowman')) {
												$('.result-con').attr('class','result-con snowman-result');
												$('.result-con-bg').attr('src','/static/images/result-bg4.png')
											} else {
												$('.result-con').attr('class','result-con');
												$('.result-con-bg').attr('src','/static/images/result-bg1.png')
											}
											$('.result-score span').text(data.testVal);
											$('.result-text').text(data.msg);

											// 把图片src赋值给结果区域里的img
											$('#boy').attr('src',$('#load_img').attr('src'));
											$('#girl').attr('src',$('#load_img2').attr('src'));
											resultCon.show();
											// 生成下载href
											print($('#downLink'));
										},
										error : function() {
											popupShow('请求错误,请重试');
										}
									});
						}
					});
	function asertTitle(nickname) {
		document.title = nickname + '和Ta的亲密指数是99%，快来看看吧';
	}

	// 保留纪念按钮点击
	var resultCodeCon = $('.result-code-con'), resultBtnCon = $('.result-btn-con'), downloadPrompt = $('.download-prompt');
	$('#downloadBtn').on("click", function() {
		// downloadPrompt.show();
		// 保存提示语
		// downloadPrompt.show();
		
		popupShow('请长摁图片，选择--保存到手机');
		// 结果页按钮和二维码
		resultCodeCon.show();
		resultBtnCon.hide();
	});
	// 保存提示语
	downloadPrompt.on("click", function() {
		downloadPrompt.hide();
	});

	// 初始化
	function initial(status) {
		if (status == 'show') {
			// 设置首页
			$('.index-page').css('z-index', '8');

			// 上传照片区域
			uploadCon.hide();
			btnCon.show();
			cameraBtn.show();

			// 结果区域
			resultCon.hide().find('img').attr('src', '');
			$('.result-img').hide();
			// 结果页按钮和二维码
			resultCodeCon.hide();
			resultBtnCon.show();
		} else if (status == 'hide') {

		}

	}

	// 不服再来
	$('.onemore').on("click", function() {
		// var nowUrl = window.location.href;
		// window.location.href =
		// 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa9317bd1469641d1&redirect_uri=http%3A%2F%2Fwww.dailuu.com%2Fs%2Fstatic%2Fupload%2Fhome&response_type=code&scope=snsapi_userinfo&state=456123456#wechat_redirect';
		// window.location.href = 'www.dailuu.com/s/static/upload/home';
		window.location.reload();
	});

	// 保存某个div的图片，并且然后生成一个下载链接，点击下载
	function print(name) {
		html2canvas(
				$('body'),
				{
					onrendered : function(canvas) {
						uiLoading(false);
						// document.body.appendChild(canvas);
						name.attr('href', canvas.toDataURL()); // 转化成base64
						name.attr('download', 'christmas.png'); // 保存图片名
						// name.css('display','inline-block');
						// $('#downloadBtn').hide();
						console.log(name)

						$('.result-img').attr('src', canvas.toDataURL()).show();
						$(
								'.result-con .text-con, .result-con .boy-con, .result-con .girl-con')
								.hide();

						// 隐藏原来的上传区域,并清空
						btnCon.hide();
						cameraBtn.hide();
						$('#load_img, #load_img2').attr('src', '');
						// 上传照片
						addLicence('resultImg');
						// 移除加载
						/* uiLoading(false); */
					}
				});
	}

	var ruleCon = $('.rule-con');
	/* 查看规则点击 */
	$('.index-btn-intro').on("click", function() {
		ruleCon.show();
	});
	/* 规则关闭 */
	$('.rule-close').on("click", function() {
		ruleCon.hide();
	});

	/* 弹窗分享点击 */
	var shareCon = $('.share-arrow');
	var shareBtn = $('.sharebtn');
	/* 分享按钮点击 */
	shareBtn.on("click", function() {
		shareCon.show();
	});
	// share关闭
	shareCon.on("click", function() {
		shareCon.hide();
	});

	var alertMessage = $('.alertMessage');
	// 出现loading
	function uiLoading(status) {
		var uiLoading = $('.ui-loading-block');
		if (status) {
			uiLoading.addClass('show');
		} else {
			uiLoading.removeClass('show');
		}
	}
	/* 提示文字 */
	function popupShow(text) {
		// $('.popup-con').show(300)
		$('.popup-con').css({
			'opacity' : '1',
			'z-index' : '99'
		});
		setTimeout("$('.popup-con').css({'opacity':'0', 'z-index': '-1'});",
				2000);
		alertMessage.text(text);
	}

	// 上传图片
	function addLicence(value) {
		// $('#fileSubmit').submit();
		$.ajax({
			url : "uploadFile",
			type : 'post',
			data : {
				imgStr : $('#resultImg').attr('src')
			},
			dataType : 'text',
			timeout : 60000,
			error : function(e) {},
			success : function(result) {
				shareImgUrl = result;
				$("#img-return").val(result);
                share();
			}
		});
		/*
		 * $.ajaxFileUpload({ url : 'upload', secureuri : false, fileElementId :
		 * 'upload_img', dataType : 'json', success : function(msg) { var obj =
		 * eval(msg); if (obj.status == 'ok') { popupShow("上传成功")
		 * //$('#filterTable').datagrid('reload'); // $.messager.alert('提示',
		 * "上传成功", "info"); } else { popupShow("未知错误，请重新上传") //
		 * $('#filterTable').datagrid('reload'); // $.messager.alert('提示',
		 * obj.message, "info"); } shareImgUrl = obj.url; }, error : function() {
		 * popupShow("sorry 上传失败!") // $.messager.alert('提示', "上传失败!", "info"); },
		 * });
		 */
	}

	/* loading */
	// 定义相关JSON格式文件列表
	function setupManifest() {
		manifest = [ {
			src : "static/images/share-img.jpg",
			id : ""
		}, {
			src : "static/images/loading-img.jpg",
			id : ""
		}, {
			src : "static/images/index-top.png",
			id : ""
		}, {
			src : "static/images/buy.png",
			id : ""
		}, {
			src : "static/images/han.png",
			id : ""
		}, {
			src : "static/images/fitness.png",
			id : ""
		}, {
			src : "static/images/snowman.png",
			id : ""
		}, {
			src : "static/images/cele-share.png",
			id : ""
		}, {
			src : "static/images/reveal1.png",
			id : ""
		}, {
			src : "http://img2.imgtn.bdimg.com/it/u=247223754,3851280044&fm=23&gp=0.jpg",
			id : "w1"
		}, {
			src : "http://s.qdcdn.com/cl/11145303,800,450.jpg",
			id : "w2"
		} , {
			src : "http://img2.imgtn.bdimg.com/it/u=247223754,3851280044&fm=23&gp=0.jpg",
			id : "w3"
		}, {
			src : "http://s.qdcdn.com/cl/11145303,800,450.jpg",
			id : "w4"
		} , {
			src : "http://img2.imgtn.bdimg.com/it/u=247223754,3851280044&fm=23&gp=0.jpg",
			id : "w5"
		}, {
			src : "http://s.qdcdn.com/cl/11145303,800,450.jpg",
			id : "w6"
		} , {
			src : "http://d.hiphotos.bdimg.com/album/whcrop%3D657%2C370%3Bq%3D90/sign=2c994e578a82b9013df895711cfd9441/09fa513d269759eede0805bbb2fb43166d22df62.jpg",
			id : "w7"
		} , {
			src : "http://pic24.nipic.com/20120928/6062547_081856296000_2.jpg",
			id : "w8"
		} , {
			src : "http://pic10.nipic.com/20101103/5063545_000227976000_2.jpg",
			id : "w9"
		} , {
			src : "http://pic41.nipic.com/20140519/18505720_094832590165_2.jpg",
			id : "w10"
		} , {
			src : "http://pic19.nipic.com/20120215/6400281_142640002386_2.jpg",
			id : "w11"
		} , {
			src : "http://pic29.nipic.com/20130515/1391526_115902145000_2.jpg",
			id : "w12"
		} ];
	}

	// 开始预加载
	function startPreload() {
		preload = new createjs.LoadQueue(false);
		// 注意加载音频文件需要调用如下代码行
		preload.installPlugin(createjs.Sound);
		preload.on("fileload", handleFileLoad);
		preload.on("progress", handleFileProgress);
		preload.on("complete", loadComplete);
		preload.on("error", loadError);
		preload.loadManifest(manifest);
	}

	// 处理单个文件加载
	function handleFileLoad(event) {
		if (event.item.id == "w1") {
			console.log("w1");
		}if (event.item.id == "w2") {
			console.log("w3");
		}if (event.item.id == "w3") {
			console.log("w3");
		}if (event.item.id == "w4") {
			console.log("w4");
		}if (event.item.id == "w5") {
			console.log("w5");
		}if (event.item.id == "w6") {
			console.log("w6");
		}if (event.item.id == "w7") {
			console.log("w7");
		}if (event.item.id == "w8") {
			console.log("w8");
		}if (event.item.id == "w9") {
			console.log("w9");
		}if (event.item.id == "w10") {
			console.log("w10");
		}if (event.item.id == "w11") {
			console.log("w11");
		}if (event.item.id == "w12") {
			console.log("w12");
		}
	}

	// 处理加载错误：大家可以修改成错误的文件地址，可在控制台看到此方法调用
	function loadError(evt) {}

	// 已加载完毕进度
	function handleFileProgress(event) {
		percent = document.getElementById("percent");
		percent.innerHTML = (preload.progress * 100 | 0) + " %";
		aa = Number(percent.innerHTML);
		if ((preload.progress * 100 | 0) >= 100) {
			$('.loading-pre').hide();
			// $('.wp-inner, .indicator, .audio_btn').show();
		}
	}

	// 全度资源加载完毕
	function loadComplete(event) {
		console.log("预加载完毕");
	}
	function share(){
		$.ajax({
		url : 'getSignature',
		data : {url : window.location.href.split("#")[0]},
		type : 'GET',
		success : function(data) {
			console.log(JSON.stringify(data));
			//alert(JSON.stringify(data));
			wxconfig(data);
			
			function wxconfig(data) {
				if (data) {
					wx.config({
						debug : false,
						// 必填，公众号的唯一标识
						appId : data.appid,
						// 必填，生成签名的时间戳
						timestamp : data.timestamp,
						// 必填，生成签名的随机串
						nonceStr : data.noncestr,
						// 必填，签名
						signature : data.signature,
						// 必填，需要使用的JS接口列表
						jsApiList : [ 'checkJsApi', 'onMenuShareTimeline',
								'onMenuShareAppMessage' ]
					});
					  wx.ready(function () {
					      console.log(11)
					      wx.checkJsApi({
					          jsApiList: [
					              'onMenuShareTimeline',
					              'onMenuShareAppMessage'
					          ],
					          success: function (res) {
					          	debugger;
					            //console.log(JSON.stringify(res));
					          }
					      });
					      /*var shareData = {
					          title: '%，快来看看吧',
					          desc: '%，快来看看吧',
			                   link:'www.dailuu.com/s/static/upload/home?openId=11111111',
					          // imgUrl: 'http://www.dailuu.com/s/static/images/share-img.jpg',  //分享展示的图片
					          trigger: function (res) {
					              alert('用户点击发送给朋友');
					          },
					          success: function (res) {
					              alert('已分享');
					          },
					          cancel: function (res) {
					              alert('已取消');
					          },
					          fail: function (res) {
					        	  alert(JSON.stringify(res));
					          	debugger;
					          }
					      };*/
					      
					      debugger;
					      wx.onMenuShareAppMessage({
					    	  title: nickname + '和Ta的亲密指数是99%，快来看看吧',
					          desc: nickname + '和Ta的亲密指数是99%，快来看看吧',
			                  link:'www.dailuu.com/s/static/upload/home?shareImgUrl='+shareImgUrl});
					      wx.onMenuShareTimeline({
					    	  title: nickname + '和Ta的亲密指数是99%，快来看看吧',
					          desc: nickname + '和Ta的亲密指数是99%，快来看看吧',
			                  link:'www.dailuu.com/s/static/upload/home?shareImgUrl='+shareImgUrl});
					  }); 
					  wx.error(function (res) {
					     // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
					   // alert('wx.error'+JSON.stringify(res));
					     debugger;
					 }); 
				}
			}
		},
		error : function() {
			alert('分享请求错误,请重试');
		}
	});}
	setupManifest();
	startPreload();
})();
