// helene fischer | 5 | functions.js

// ------------ scroll to 0 ------------ /
window.scrollTo(0,0);
// window.onbeforeunload = function(){ window.scrollTo(0,0); };
var startTime, loadingTimer;

function doCtrl() {
	// hi ;)
}

function onPageReady() {
	doLog("onPageReady");
	getConf();
    initHeader();
	initEffects();
    initCarousels();
	doTruncate('.text_truncate', 7);
	initSvg();
	if (main == "index") {
        startTime = new Date().getTime();
        loadingTimer = setInterval(checkLoadingAnim, 250);
		initNav();
	}
	if (document.getElementById("posts")) {
		initMasonry();
	}
	sInit();
    // checkLinks();
	onResize();
	initResize();
	sRefresh();
}

function checkLoadingAnim() {
    var timeDifference = new Date().getTime() - startTime;
    if (timeDifference >= 1500) {
        clearInterval(loadingTimer);
        hidePreloader();
    }
}

function onPageLoaded() {
	doLog("onPageLoaded");
	if (document.getElementById("music")) {
		initMusicplayer();
	}
	if (main === "index") {
        setTimeout(function() { initYouTube(); }, 5000);
        initFancybox();
	}
    try { $(".carousel").flickity('resize'); } catch (e) { }
	sRefresh();
    setTimeout(function() {
        sRefresh(); // includes: initCopyButtons();
    }, 3000);
    initNewsletter();
}

function hidePreloader() {
	$('#loading-animation').removeClass("fadeIn");
	$('#loading-animation').addClass("animated_manual_animation fadeOut");
	$('#preloader').delay(850).fadeOut(800);
	
	setTimeout(function() {
        $("#teaser .title").addClass("on");
	}, 1000);

	setTimeout(function() {
		$('.header_norm .social .animated_manual').each( function() {
			var elem = $(this);
			if ( !elem.hasClass('visible') ) {
				var animationDelay = elem.data('animation-delay');
				var animation = elem.data('animation');
				if ( animationDelay ) {
					setTimeout(function(){
						elem.addClass( animation + " animated_manual_animation visible" );
					}, animationDelay);
				} else {
					elem.addClass( animation + " animated_manual_animation visible" );
				}
			}
		});
	}, 2000);
    
	$('#teaser .animated_manual').each( function() {
		var elem = $(this);
		if ( !elem.hasClass('visible') ) {
			var animationDelay = elem.data('animation-delay');
			var animation = elem.data('animation');
			if ( animationDelay ) {
				setTimeout(function(){
					elem.addClass( animation + " animated_manual_animation visible" );
				}, animationDelay);
			} else {
				elem.addClass( animation + " animated_manual_animation visible" );
			}
		}
	});
}

function skipIntro() {
	doScroll('#video');
	volume_bg_video(0);
}

function onResize() {
	sRefresh();
}

// ------------ effects ------------ //

function initEffects() {
    initAnims();  
    if ($(window).width() > 751) {
        $(".stick_in_parent").stick_in_parent({
            inner_scrolling: !1,
            bottoming: !0,
            offset_top: 60
        });
    }  
}
    
function initAnims() {
	$.appear('.animated', { force_process:true });
	$('.animated').on('appear', function() {
		var elem = $(this);
		var animation = elem.data('animation');
		if (!elem.hasClass('visible')) {
			var animationDelay = elem.data('animation-delay');
			if (animationDelay) {
				setTimeout(function() {
					elem.addClass(animation + " visible");
				}, animationDelay);
			} else {
				elem.addClass(animation + " visible");
			}
		}
	});
	$('.animated').on('disappear', function() {
		var elem = $(this);
		var animation = elem.data('animation');
		if (elem.hasClass('visible')) {
			elem.removeClass(animation + " visible");
		}
	});
	$(window).on("load", function() {
		$('.onstart').each(function() {
			var elem = $(this);
			if (!elem.hasClass('visible')) {
				var animationDelay = elem.data('animation-delay');
				var animation = elem.data('animation');
				if (animationDelay) {
					setTimeout(function() {
						elem.addClass(animation + " visible");
					}, animationDelay);
				} else {
					elem.addClass(animation + " visible");
				}
			}
		});
	});
}

function initAnimsManual(target) {
	$(target).appear();
	$(target).on('appear', function() {
		var elem = $(this);
		var animation = elem.data('animation');
		if (!elem.hasClass('visible')) {
			var animationDelay = elem.data('animation-delay');
			if (animationDelay) {
				setTimeout(function(){
					elem.addClass(animation + " visible");
				}, animationDelay);
			} else {
				elem.addClass(animation + " visible");
			}
		}
	});
}

function doAnim(elem, effect, remove) {
	if (remove === false) { 
		$(elem).addClass("animated_manual_animation " + effect).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {});
	} else {
		$(elem).addClass("animated_manual_animation " + effect).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
			$(elem).removeClass("animated_manual_animation");
			$(elem).removeClass(effect);
		});
		$(elem).removeClass('animated_manual');
	}
}


// ------------ inits ------------ /
// https://stackoverflow.com/questions/9038625/#answer-9039885, https://stackoverflow.com/questions/7944460/
var isiOS = ['iPad Simulator','iPhone Simulator','iPod Simulator','iPad','iPhone','iPod'].includes(navigator.platform)||(navigator.userAgent.includes("Mac")&&"ontouchend"in document);
var isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 && navigator.userAgent && navigator.userAgent.indexOf('CriOS') == -1 && navigator.userAgent.indexOf('FxiOS') == -1;
var isSafariMac = false;

function getConf() {
	if (device == "") {
		// http://stackoverflow.com/questions/3514784/
		var ua = navigator.userAgent.toLowerCase(); doLog("ua: " + ua);
        var vendor = navigator.vendor; doLog("vendor: " + vendor);
		if (ua.match(/webos/i)) { device = "webos"; }
		if (ua.match(/opera mini/i)) { device = "opera mini"; }		
		if (ua.match(/mobile/i)) { device = "mobile"; }
		if (ua.match(/ipad/i)) { device = "ipad"; }
		if (ua.match(/ipod|iphone/i)) { device = "iphone"; }
		if (ua.match(/blackberry/i)) { device = "blackberry"; }
		if (ua.match(/android/i)) { device = "android"; }
		if (ua.match(/kindle/i)) { device = "kindle"; }
		if (ua.match(/windows phone/i)) { device = "windows phone"; }
		if (ua.match(/iemobile/i)) { device = "iemobile"; }
		if (ua.match(/tablet/i)) { device = "tablet"; }
    }
    if (isSafari && isiOS) {
        isSafariMac = false; doLog("safari on ios");
    } else {
        if (isSafari) { isSafariMac = true; doLog("safari on mac"); }
    }
	doLog("getConf() -> device: " + device);
	if (device === "ipad" || device === "tablet") { $("#viewport_id").attr("content", "width=device-width, initial-scale=1"); } // set viewport
	if (device !== "") {
		$("#body_id").removeClass("desktop").addClass("device"); // set body-class, default: desktop
	}
	if (isiOS) {
		$("#body_id").addClass("iOS");
	}
}

function sInit() {
	if (device === "" && main == "index") { s = skrollr.init({ forceHeight:false }); } 
}

function sRefresh() {
	if (device === "" && main == "index") { window.setTimeout(function() { s.refresh(); } , 1000); }
	Waypoint.refreshAll();
	initCopyButtons();
}

// ------------ load section-content ------------ //
function getItems(section,type,subtype) {
	doLog("getItems('" + section + "," + type + "," + subtype + "')");
	saveHistory(section,type,subtype,"");
	$.ajax({
		url: "/" + base + "/section_" + section + "_get_items.php",
		data: "section=" + section + "&type=" + type + "&subtype=" + subtype + "&lang=" + lang + "&device=" + device + "&country=" + country,
		method: "GET",
		dataType: "html",
		cache: false,
		beforeSend: function() {
			$("#" + section + " ul.sub_nav li").removeClass("on");
			$("#" + section + "_items ul.itemlist").empty();
			$("#" + section + "_items .more").html('<div class="loading"><div class="icon icon-spin5 animate-spin"></div></div>');
		},
		success: function(data) {
			$("#" + section + " ul.sub_nav li.type" + type).addClass("on");
			$("#" + section + "_items ul.itemlist").append(data);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			// alert("Error:" + errorThrown + "(" + XMLHttpRequest.status + ")");
		},
		complete: function() {
			sRefresh();
		}
	});
}

function getMoreItems(section,start,limit,type,subtype,id,modus) {
	doLog("getMoreItems('" + section + "," + start + "," + limit + "," + type + "," + subtype + "," + id + "," + modus + "')");
	if (start < 0) { start = 0; }
	$.ajax({
		url: "/" + base + "/section_" + section + "_get_items.php",
		data: "section=" + section + "&start=" + start + "&limit=" + limit + "&type=" + type + "&subtype=" + subtype + "&id=" + id + "&lang=" + lang + "&device=" + device + "&country=" + country,
		method: "GET",
		dataType: "html",
		cache: false,
		beforeSend: function() {
			$("#" + section + "_items .more").html('<div class="loading"><div class="icon icon-spin5 animate-spin"></div></div>');
		},
		success: function(data) {
			if (modus === "clear") {
				$("#" + section + "_items ul.itemlist").empty().append(data);
			} else {
				$("#" + section + "_items ul.itemlist").append(data);
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			// alert("Error:" + errorThrown + "(" + XMLHttpRequest.status + ")");
		},
		complete: function() {
			sRefresh();
		}
	});
}

function getItem(section,type,subtype,id,autoplay) {
	doLog("getItem(" + section + "," + type + "," + subtype + "," + id + "," + autoplay + ")");
	saveHistory(section,type,subtype,id);
	var ausdruck = /^(\d*)?$/;   // \d = digit, \w = word, ? = egal wievielmal vorher (zb. egal wieviel buchstaben)
	if (ausdruck.exec(id)) {
		// alert("valid request ->\n id:" + RegExp.$1);
		var id = RegExp.$1;
		var feedback_id = "#" + section + "_container";
		$.ajax({
			url: "/" + base + "/section_" + section + "_get_item.php",
			data: "type=" + type + "&subtype=" + subtype + "&id=" + id + "&autoplay=" + autoplay + "&lang=" + lang + "&device=" + device + "&country=" + country,
			method: "GET",
			dataType: "html",
			cache: false,
			beforeSend: function() {
				$("#" + section + " ul.sub_nav li").removeClass("on");
                $("#" + section + "_holder").removeClass(function (index, className) {
                    return (className.match(/(^|\s)type-\S+/g) || []).join(' ');
                });
                $("#" + section + "_holder").addClass("type-" + type);
				$("#" + section + "_holder").slideDown(1000);
				$("#" + section + "_title").empty().append("Loading...");
				$(feedback_id).html('<div class="loading"><div class="icon icon-spin5 animate-spin"></div></div>');
			},
			success: function(data) {
				$("#" + section + " ul.sub_nav li.type" + type).addClass("on");
				$(feedback_id).empty().append(data);
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				// alert("Error:" + errorThrown + "(" + XMLHttpRequest.status + ")");
			},
			complete: function() {
				sRefresh();
			}
		});
	} else {
		alert("invalid request");
	}
}

function setItem(section, id, txt) {
	// doLog("setItem(" + section + "," + id + "," + txt + ")");
	if (section === "video") {
		ytFirstStart = false;
		$("#video_title").empty().append(urldecode(txt));
	}
	$("." + section + "_items ul li").removeClass("on");
	$("." + section + "_items ul li.item" + id).addClass("on");
	sRefresh();
}

// ------------------------ history ------------------------ //
function getContent(itemLang,itemSection,itemName,itemType,itemSubtype,itemId,itemStart) {
	// alert("getContent(" + itemLang + "," + itemSection + "," + itemName + "," + itemType + "," + itemSubtype + "," + itemId + "," + itemStart + ")");
	doStop();
	var data = {lang:itemLang,section:itemSection,type:itemType,subtype:itemSubtype,id:itemId,start:itemStart};
	var theTitle = itemLang + "|" + itemSection + "|" + itemType + "|" + itemSubtype + "|" + itemId + "|" + itemStart;	
	var theUrl = "/" + itemSection + "/" + itemName + "-" + itemType + "-" + itemSubtype + "-" + itemId + "-" + itemStart + ".html";
	// base + "/" + // + itemLang + "/"
	// var theUrl = "/" + itemSection + "/" + itemName + "-" + itemType + "-" + itemSubtype + "-" + itemId + "-" + itemStart + ".html"; // special: itemLang always "en"
	if (itemName == "" && itemType == "" && itemSubtype == "" && itemId == "" && itemStart == "") {
		theUrl = "/" + itemSection + "/"; // base + "/" + itemLang + "/" 
	}
    updateContent(data);
    if (window.history && window.history.pushState) {		
		history.pushState(data, theTitle, theUrl); // add an item to the history log // http://stackoverflow.com/questions/11932869/ 
	}
	// tracking: var tmp_virtualpage = "/" + base + "/" + itemLang + "/" + itemSection + "/" + itemName + "-" + itemType + "-" + itemSubtype + "-" + itemId + "/"; var tmp_title = itemSection + ": " + itemName.replace(/-/g, " "); doTrackPage(tmp_virtualpage,tmp_title);
}

function setHistory(itemLang,itemSection,itemName,itemType,itemSubtype,itemId,itemStart) {
	console.log("setHistory(" + itemLang + "," + itemSection + "," + itemName + "," + itemType + "," + itemSubtype + "," + itemId + "," + itemStart + ")");
	var data = {lang:itemLang,section:itemSection,type:itemType,subtype:itemSubtype,id:itemId,start:itemStart};
	var theTitle = itemLang + "|" + itemSection + "|" + itemType + "|" + itemSubtype + "|" + itemId + "|" + itemStart;	
	var theUrl = "/" + itemSection + "/" + itemName + "-" + itemType + "-" + itemSubtype + "-" + itemId + "-" + itemStart + ".html";
	// base + "/" + // + itemLang + "/" 
	// var theUrl = "/" + itemSection + "/" + itemName + "-" + itemType + "-" + itemSubtype + "-" + itemId + "-" + itemStart + ".html"; // special: itemLang always "en"
	if (itemName == "" && itemType == "" && itemSubtype == "" && itemId == "" && itemStart == "") {
		theUrl = "/" + itemSection + "/"; // base + "/" + // + itemLang + "/" 
	}
    if (window.history && window.history.pushState) {		
		history.pushState(data, theTitle, theUrl); // add an item to the history log // http://stackoverflow.com/questions/11932869/ 
	}
}

if (window.history && window.history.pushState) {		
	// revert to a previously saved state
	window.addEventListener('popstate', function(event) {
		// console.log('popstate fired!');
		updateContent(event.state);
	});	
}

function updateContent(data) {
    if (data == null) { return; }
	doShow(data.section,data.type,data.subtype,data.id,1);	
}
				
function doShow(section,type,subtype,id,autoplay) {
	doLog("doShow(" + section + "," + type + "," + subtype + "," + id + "," + autoplay + ")");
	/* type = parseInt(type);subtype = parseInt(subtype);id = parseInt(id);autoplay = parseInt(autoplay); */
	var ausdruck = /^(\w*)?$/;   // \d = digit, \w = word, ? = egal wievielmal vorher (zb. egal wieviel buchstaben)
	var yOffset = -1 * $(".header_norm").height();
	if (ausdruck.exec(id) && id != "" && id != 0 && id != undefined && id != null) {
		// prio 1: id
		var tmp_id = RegExp.$1;
		doLog("id detected: " + tmp_id);
		var tmp_type = "";
		if (ausdruck.exec(type) && type != "" && type != 0 && type != undefined && type != null) {
			var tmp_type = RegExp.$1;
			doLog("type detected: " + tmp_type);
		}
		// if onepager:
		if (section != "dates" && section != "posts") {
			if (hist[section]["type"] != tmp_type) {
				getItems(section,tmp_type,subtype); // only reload items if type changes
			}
			getItem(section,tmp_type,subtype,tmp_id,autoplay);
		}
        // hf-special: masonry > animate item
        if (section == "posts") {
			section = "posts-item-" + tmp_id; // scrollpoint
            setTimeout(function() {
                doAnim("#" + section, "flash");
                doLog("doAnim(#" + section);
            }, 1500);
		} else {
            section = section + "_scroll"; // scrollpoint
        }	
		yOffset -= 20;
	} else {
		if (ausdruck.exec(subtype) && subtype != "" && subtype != 0 && subtype != undefined && subtype != null) {
			// prio 2: subtype
			var tmp_subtype = RegExp.$1;
			doLog("subtype detected: " + tmp_subtype);
			if (hist[section]["type"] != type) {
				getItems(section,type,tmp_subtype); // only reload items if type changes
			}
			getItem(section,type,tmp_subtype,id,autoplay);
			section = section + "_scroll"; // scrollpoint
			yOffset -= 20;
		} else {
			// prio 3: type
			if (ausdruck.exec(type) && type != "" && type != 0 && type != undefined && type != null) {
				var tmp_type = RegExp.$1;
				doLog("type detected: " + tmp_type);
				$("#" + section + "_holder").slideUp("fast");
				$("#" + section + "_holder ." + section + "_container").empty();
				getItems(section,tmp_type,subtype);
			} else {
				// prio 4: no type, no subtype, no id -> clear section_holder
				if (type == "" && subtype == "" && id == "") {
					doLog("clear of section detected. vars: " + section + "," + type + "," + subtype + "," + id);
					$("#" + section + "_holder").slideUp("slow", function() {
						$("#" + section + "_holder ." + section + "_container").empty();
						$("#" + section + " .itemlist_header").slideUp("fast");
						getItems(section,"","");
					});
				}
			}
		}
	}
	$.scrollTo("#" + section, 1250, {
		axis: "y",
		offset: yOffset,
		onAfter: function () {
		}
	});
}

// keep tracking of sections content
var hist = new Array();
hist["video"] = new Object(); hist["video"]["type"] = ""; hist["video"]["subtype"] = ""; hist["video"]["id"] = ""; hist["video"]["start"] = "";
hist["photos"] = new Object(); hist["photos"]["type"] = ""; hist["photos"]["subtype"] = ""; hist["photos"]["id"] = ""; hist["photos"]["start"] = "";
hist["music"] = new Object(); hist["music"]["type"] = ""; hist["music"]["subtype"] = ""; hist["music"]["id"] = ""; hist["music"]["start"] = "";
hist["news"] = new Object(); hist["news"]["type"] = ""; hist["news"]["subtype"] = ""; hist["news"]["id"] = ""; hist["news"]["start"] = "";
hist["bio"] = new Object(); hist["bio"]["type"] = ""; hist["bio"]["subtype"] = ""; hist["bio"]["id"] = ""; hist["bio"]["start"] = "";
hist["products"] = new Object(); hist["products"]["type"] = ""; hist["products"]["subtype"] = ""; hist["products"]["id"] = ""; hist["products"]["start"] = "";
hist["tracks"] = new Object(); hist["tracks"]["type"] = ""; hist["tracks"]["subtype"] = ""; hist["tracks"]["id"] = ""; hist["tracks"]["start"] = "";
hist["specials"] = new Object(); hist["specials"]["type"] = ""; hist["specials"]["subtype"] = ""; hist["specials"]["id"] = ""; hist["specials"]["start"] = "";
hist["remixes"] = new Object(); hist["remixes"]["type"] = ""; hist["remixes"]["subtype"] = ""; hist["remixes"]["id"] = ""; hist["remixes"]["start"] = "";
hist["bestof"] = new Object(); hist["bestof"]["type"] = ""; hist["bestof"]["subtype"] = ""; hist["bestof"]["id"] = ""; hist["bestof"]["start"] = "";
hist["posts"] = new Object(); hist["posts"]["type"] = ""; hist["posts"]["subtype"] = ""; hist["posts"]["id"] = ""; hist["posts"]["start"] = "";

function saveHistory(section,type,subtype,id) {
	hist[section]["type"] = type; hist[section]["subtype"] = subtype; hist[section]["id"] = id; hist[section]["start"] = "";
}

// ------------ teaser / carousels ------------ //
function initCarousels() {
    $('.carousel-holder-size-auto-autoplay .carousel').flickity({ cellAlign:'left', contain:true, cellSelector:'.carousel-cell', setGallerySize:true, autoPlay:teaserTimeout });
	$('.carousel-holder-size-auto .carousel').flickity({ cellAlign:'left', contain:true, cellSelector:'.carousel-cell', setGallerySize:true, adaptiveHeight:true });
	$('.carousel-holder-size-css .carousel').flickity({ cellAlign:'left', contain:true, cellSelector:'.carousel-cell', setGallerySize:false }); // autoPlay: 5000, 
    /*
    $('.carousel').each( function() {
		var elem = $(this);
		elem.on('select.flickity', function() {
			var flkty = elem.data('flickity');
			elem.find(".carousel-zoom").data("index", flkty.selectedIndex);
		});
	});
	$('.carousel-zoom').click(function(e) {
		var sources = urldecode($(this).data("sources"));
		var index = $(this).data("index");
		eval("$.fancybox.open([" + sources + "], { }, " + index + ")");
		return false;
    });
    $("#teaser-carousel").flickity('playPlayer');
    */
    
    $("#products-carousel").on('change.flickity', function(event, index) {
        doLog('products-carousel > slide changed to ' + index);
        $("#products .sub_nav li").removeClass("on");
        $("#products .sub_nav li.thumb" + (index + 1)).addClass("on");       
        id = $("#products .item-" + (index + 1)).data("id");
        nr = $("#products .item-" + (index + 1)).data("nr");
        var name = $("#products .item-" + (index + 1)).data("name");
        setHistory(lang,'products',name,'','',id,'');
    });
    
    $("#tracks-carousel").on('change.flickity', function(event, index) {
        doLog('tracks-carousel > slide changed to ' + index);
        $("#tracks .sub_nav li").removeClass("on");
        $("#tracks .sub_nav li.thumb" + (index + 1)).addClass("on");       
        id = $("#tracks .item-" + (index + 1)).data("id");
        nr = $("#tracks .item-" + (index + 1)).data("nr");
        var name = $("#tracks .item-" + (index + 1)).data("name");
        setHistory(lang,'tracks',name,'','',id,'');
    });

    $("#specials-carousel").on('change.flickity', function(event, index) {
        doLog('specials-carousel > slide changed to ' + index);
        $("#specials .sub_nav li").removeClass("on");
        $("#specials .sub_nav li.thumb" + (index + 1)).addClass("on");       
        id = $("#specials .item-" + (index + 1)).data("id");
        nr = $("#specials .item-" + (index + 1)).data("nr");
        var name = $("#specials .item-" + (index + 1)).data("name");
        setHistory(lang,'specials',name,'','',id,'');
    });
    
    $("#remixes-carousel").on('change.flickity', function(event, index) {
        doLog('remixes-carousel > slide changed to ' + index);
        $("#remixes .sub_nav li").removeClass("on");
        $("#remixes .sub_nav li.thumb" + (index + 1)).addClass("on");       
        id = $("#remixes .item-" + (index + 1)).data("id");
        nr = $("#remixes .item-" + (index + 1)).data("nr");
        var name = $("#remixes .item-" + (index + 1)).data("name");
        setHistory(lang,'remixes',name,'','',id,'');
    });
    
    $("#bestof-carousel").on('change.flickity', function(event, index) {
        doLog('bestof-carousel > slide changed to ' + index);
        $("#bestof .sub_nav li").removeClass("on");
        $("#bestof .sub_nav li.thumb" + (index + 1)).addClass("on");       
        id = $("#bestof .item-" + (index + 1)).data("id");
        nr = $("#bestof .item-" + (index + 1)).data("nr");
        var name = $("#bestof .item-" + (index + 1)).data("name");
        setHistory(lang,'bestof',name,'','',id,'');
    });
    
	$('#video-carousel').on('change.flickity', function(event, index) {
        doLog('video-carousel > slide changed to ' + index);
        $("#video .sub_nav li").removeClass("on");
        $("#video .sub_nav li.thumb" + (index + 1)).addClass("on");       
        id = $("#video .item-" + (index + 1)).data("id");
        nr = $("#video .item-" + (index + 1)).data("nr");
        var name = $("#video .item-" + (index + 1)).data("name");
        setHistory(lang,'video',name,'','',id,'');
        // video special
        $("#video-carousel .carousel-cell").removeClass("video-on");
        $("#video-carousel .video-player").removeClass("on");
        setTimeout(function() {
            $("#video-carousel .video-player").html("");
        }, 1000);
    });
}

function setCarouselCell(section,id) {
    doLog("setCarouselCell(" + section + "," + id + ")");
	nr = $("#" + section + id).data("nr");
    $("#" + section + "-carousel").flickity('selectCell', (nr - 1));
}

function getCarouselVideo(section,feedback_id,id) {
	// alert("getCarouselVideo(" + section + "," + feedback_id + ","+ id + ")");
	$.ajax({
		url: "/" + base + "/section_get_carousel_video.php",
		data: "section=" + section + "&id=" + id + "&country=" + country + "&device=" + device,
		method: "GET",
		dataType: "html",
		cache: false,
		beforeSend: function() {
			$(feedback_id).html('<div class="loading"><div class="icon icon-spin5 animate-spin"></div></div>');
		},
		success: function(data) {
			$(feedback_id).empty().append(data);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			// alert("Error:" + errorThrown + "(" + XMLHttpRequest.status + ")");
		},
		complete: function() {
			sRefresh(); // alert("complete");
		}
	});
}


// ------------------------ posts ------------------------ //
var $grid;

var masonryOptions = {
    itemSelector: '.grid-item',
    // columnWidth: 80,
    gutter: 0
};

function initMasonry() {
	$grid = $('.grid').masonry(masonryOptions);
}

function destroyMasonry() {
	$grid.masonry('destroy');
}

// ------------------------ youtube ------------------------ //
function initYouTube() {
	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}
var ytApiKey = "AIzaSyBiYOXVYHnSaIHec43Ixj-GaIrF84UR9bQ";
function onYTPlayerRendered(iframe_id) {
	if (typeof(YT) != "undefined") {
		doLog("video: yt-api ready");
		if (iframe_id == "undefined" || iframe_id == ""|| iframe_id == null) {
			iframe_id = "videoiframe";
		}
		if (document.getElementById(iframe_id)) {
			doLog("video: rendered");
			var tmp_player = new YT.Player(iframe_id, { events: { 'onReady': onYTPlayerReady, 'onStateChange': onYTPlayerStateChange } });
		}
	} else {
		doLog("video: yt-api not ready");
	}
}
function onYTPlayerReady(event) {
	var tmp_id = "";
	var obj = event.target;	
	for (var key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) { // http://stackoverflow.com/questions/7306669/
			var val = obj[key];
			if (val.nodeName === "IFRAME") {
				tmp_id = urldecode(val.id); // eg.: "video_playlist_PLpEG-NdxDo_uucxo-LKxaXbuZfCScOSlX";
				doLog("video: ready, id: " + tmp_id);
				if (tmp_id.indexOf("playlist") !== -1) {
					var reg = /video_playlist_(.*)/;
					var res = reg.exec(tmp_id);
					if (Array.isArray(res)) {
						var ytPlaylist = res[1];
						doLog("video: playlist detected: " + ytPlaylist); 
						getYTPlaylist(ytPlaylist,tmp_id);
					}
				}
				break;
			}
		}
	}
}
var ytFirstStart = false;
function onYTPlayerStateChange(event) {
	var tmp_id = "";
	var tmp_title = "";
	var obj = event.target;
	for (var key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			var val = obj[key];
			if (val.nodeName === "IFRAME") {
				tmp_id = urldecode(val.id);
				var tmp_obj = YT.get(tmp_id);
				if (typeof tmp_obj.getVideoData === "function") {
					tmp_title = tmp_obj.getVideoData().title;
				} else {
					var tmp_url = tmp_obj.getVideoUrl();
					var tmp_match = tmp_url.match(/[?&]v=([^&]+)/);
					tmp_title = tmp_match[1]; // videoID
				}
				// doLog("onYTPlayerStateChange, " + tmp_id + ", " + tmp_title);
				switch (event.data) {
					case -1:
						doLog("video: unstarted (" + tmp_title + ")");
						if (tmp_id.indexOf("playlist") !== -1) {
							updateYTVideoNav(tmp_id);
						}
						break;
					case 0:
						doLog('Video','VideoFinish',tmp_title);
						break;
					case 1:
						if (ytFirstStart == false) {
							ytFirstStart = true;
							doLog('Video','VideoStart',tmp_title);
						} else {
							doLog('Video','VideoResume',tmp_title);
						}
						break;
					case 2:
						doLog('Video','VideoPause',tmp_title);
						break;
					case 3:
						doLog("video: buffering (" + tmp_title + ")");
						break;			
					case 5:
						doLog("video: cued (" + tmp_title + ")");
						break;
					default:
						break;
				}
				break;
			}
		}
	}
}
var ytPlaylistIDs, ytPlaylistTitles, ytPlaylistPos, ytPlaylistSize;
function getYTPlaylist(list,iframe_id) {
	var playListURL = "https://www.googleapis.com/youtube/v3/playlistItems?maxResults=30&part=snippet&playlistId=" + list + "&key=" + ytApiKey;
	ytPlaylistIDs = new Array();	
	ytPlaylistTitles = new Array();	
	ytPlaylistPos = 0;
	ytPlaylistSize = 0;	
	$.get(playListURL,function(data) {
		ytPlaylistSize = data.items.length;
		$.each(data.items, function(i, item) {
			ytPlaylistIDs.push(item.snippet.resourceId.videoId);
			ytPlaylistTitles.push(item.snippet.title);
		});
		// console.log(ytPlaylistIDs); // console.log(ytPlaylistTitles);
		updateYTVideoNav(iframe_id);
		if (ytPlaylistIDs.length > 1) {
			$("#video .video_nav_holder").slideDown("slow",function() { sRefresh(); });
		}
	});
}
function updateYTVideoNav(iframe_id) {
	ytPlaylistPos = YT.get(iframe_id).getPlaylistIndex();
	// doLog("updateYTVideoNav(" + iframe_id + ") -> ytPlaylistPos: " + ytPlaylistPos);
	$("#video .video_nav_prev a").attr("onClick","previousYTVideo('" + iframe_id + "')");
	$("#video .video_nav_next a").attr("onClick","nextYTVideo('" + iframe_id + "')");
	$("#video .video_title").html(ytPlaylistTitles[ytPlaylistPos]);
	var ytPlaylistPosDisplay = ytPlaylistPos + 1;
	if (ytPlaylistPosDisplay < 10) { ytPlaylistPosDisplay = "0" + ytPlaylistPosDisplay; }
	var ytPlaylistSizeDisplay = ytPlaylistSize;
	if (ytPlaylistSizeDisplay < 10) { ytPlaylistSizeDisplay = "0" + ytPlaylistSizeDisplay; }
	$("#video .video_nav .video_nav_counter").html(ytPlaylistPosDisplay + " / " + ytPlaylistSizeDisplay);
}
function playYTVideo(iframe_id) {
	YT.get(iframe_id).playVideo();
}	
function pauseYTVideo(iframe_id) {
	YT.get(iframe_id).pauseVideo();
}	
function stopYTVideo(iframe_id) {
	YT.get(iframe_id).stopVideo();
}
function previousYTVideo(iframe_id) {
	YT.get(iframe_id).previousVideo();	
}
function nextYTVideo(iframe_id) {
	YT.get(iframe_id).nextVideo();	
}

function youtubeGetID(url) {
    url = url.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return undefined !== url[2]?url[2].split(/[^0-9a-z_\-]/i)[0]:url[0];
}

function playYouTubeVideo(id, url) {
    doLog("playVideo(" + id + "," + url + ")");
    var youtubeID = youtubeGetID(urldecode(url));
    if (youtubeID != undefined) {
        $("#video-carousel .carousel-cell").removeClass("video-on");
        $("#" + id).closest(".carousel-cell").addClass("video-on");
        var embed = "<iframe id='" + id + "-iframe' src='//www.youtube.com/embed/" + youtubeID + "?showinfo=0&autohide=1&rel=0&autoplay=1&mute=1' frameborder='0' allowfullscreen></iframe>";
        $("#" + id).html(embed);
        $("#" + id).addClass("on");
    } else {
        doMsg("Fehler: Ungültige YouTube-Url.");   
    }
}

// ------------------------ products ------------------------ //

function toggleAlbumplayer(section, id) {
	if ($("." + section + "s #albumplayer" + id).css("display") === "none") {
		// close other players
		$("." + section + "s .albumplayer").empty();
		$("." + section + "s .albumplayer").css("display","none");
		$("." + section + "s .item li.albumplayer_trigger .title_off").css("display","block");
		$("." + section + "s .item li.albumplayer_trigger .title_on").css("display","none");
		$("." + section + "s .item .imageborder_holder").css("opacity", 1);
		// load specific player
		var txt = $("#" + section + "s #albumplayer" + id).data("embedcode");
		$("." + section + "s #albumplayer" + id).html(urldecode(txt));
		$("." + section + "s #albumplayer" + id).css("display","block");
		$("#" + section + id + " li.albumplayer_trigger .title_off").css("display","none");
		$("#" + section + id + " li.albumplayer_trigger .title_on").css("display","block");
		$("#" + section + id + " .imageborder_holder").css("opacity", 0);
		doLog("hide: " + "#" + section + id + " .imageborder_holder");
		doScroll("#" + section + "s #albumplayer" + id);
	} else {
		$("." + section + "s #albumplayer" + id).empty();
		$("." + section + "s #albumplayer" + id).css("display","none");
		$("#" + section + id + " li.albumplayer_trigger .title_off").css("display","block");
		$("#" + section + id + " li.albumplayer_trigger .title_on").css("display","none");
		$("#" + section + id + " .imageborder_holder").css("opacity", 1);
	}
}

// ------------------------ dates ------------------------ //

function setDates(id) {
    $("#dates .sub_nav .thumb").removeClass("on");
    $("#dates .sub_nav .thumb" + id).addClass("on");    
    
    $("#dates .dates_block").removeClass("on");
    $("#dates .dates_block" + id).addClass("on");
    
    // recalc sticky images
    try { $(document.body).trigger("sticky_kit:recalc"); } catch (e) { } 
    
    $.scrollTo("#dates .sub_nav", 1000, {
        axis: "y",
        offset: -60,
        onAfter: function () { }
    });
}

function toggleDates(id) {
	var new_h, row_display;
	// get modus (compact, large) usually triggered via @media screen and (max-width:640px) { }
	if ($("#dates_block" + id + " .dateslist li").first().css("display") === "table") {
		row_display = "table";
	} else {
		row_display = "block";
	}
	if ($("#dates_block" + id + " .dateslist li.row-more").css("display") === "none") {
		// show more rows
		new_h = $("#dates_block" + id + " .dateslist").innerHeight();
		$("#dates_block" + id + " .dateslist_holder").css("height", new_h + "px");
		$("#dates_block" + id + " .dateslist li.row-more").css("display",row_display);
		new_h = $("#dates_block" + id + " .dateslist").innerHeight();
		$("#dates_block" + id + " .dateslist_holder").animate({ height: new_h }, "slow", function() {
			$("#dates_block" + id + " .dateslist_holder").css("height", "auto");
			$("#dates_block" + id + " .more_dates a.icon-down-open").css("display","none");
			$("#dates_block" + id + " .more_dates a.icon-up-open").css("display","inline-block");
			sRefresh();
  		});	
	} else {
		// show less rows
		$("#dates_block" + id + " .dateslist li.row-more").css("display","none");
		new_h = $("#dates_block" + id + " .dateslist").innerHeight();
		$("#dates_block" + id + " .dateslist li.row-more").css("display",row_display);
		$("#dates_block" + id + " .dateslist_holder").animate({ height: new_h }, "slow", function() {
			$("#dates_block" + id + " .dateslist li.row-more").css("display","none");
			$("#dates_block" + id + " .dateslist_holder").css("height", "auto");
			$("#dates_block" + id + " .more_dates a.icon-down-open").css("display","inline-block");
			$("#dates_block" + id + " .more_dates a.icon-up-open").css("display","none");
			$.scrollTo("#dates_block" + id + " .more_dates", 1000, {
				axis: "y",
				offset: -220,
				onAfter: function () {
				}
			});
			sRefresh();
  		});
	}
}

function toggleCalendar(id) {
	if ($(".calendar_links" + id).css("display") === "none") {
		$(".calendar_toggle" + id).text("-");
		$(".calendar_links" + id).fadeIn("fast", function() { });
        setTimeout(function(){
            $(document).click(function(e) {
                if (!$(e.target).closest(".calendar_links" + id).length) {
                    // doLog('click outside!');
                    $(".calendar_toggle" + id).text("+");	
                    $(".calendar_links" + id).fadeOut("fast", function() { });
                    $(document).unbind("click");
                }
            });
        }, 200);
	} else {
		$(".calendar_toggle" + id).text("+");	
		$(".calendar_links" + id).fadeOut("fast", function() { });
        $(document).unbind("click");
	}
}

// ------------------------ audio ------------------------ //

var playlist;
var playlist_pos = -1;
var play_modus = "manual";
var oldTrack = null;
var audioFirstStart = false;

function initMusicplayer() {
	$("#musicplayer").attr("oncanplay", "canPlay();");
	$("#musicplayer").attr("onended", "playNext();");
}

function playTrack(id) {
	// alert("playTrack(" + id + "), oldTrack: " + oldTrack);
	var audio = document.getElementById("musicplayer");
	id = parseInt(id);
	playlist_pos = $.inArray(id, playlist);
	doLog("playTrack(" + id + "), my playlist_pos:" + playlist_pos);
	if (oldTrack == id) {
		if (audio.paused) {
			doPlay();
		} else {
			doPause();
		}	
	} else {
		audio.addEventListener("timeupdate", progressBar, true);
		var trackname = $("#track"+ id).data("trackname");
		$(".track").removeClass("track_on");
		$(".track .playback_icon").html("<div class='icon icon-play'></div>");
		$(".track .track_progress").css("width","0%");
		$("#track"+ id).addClass("track_on");
		$("#track"+ id + " .playback_icon").html("<div class='icon icon-spin5 animate-spin'></div>");
		oldTrack = id;
		audioFirstStart = false;
		audio.src = $("#track"+ id).data("src");
		audio.load();
	}	
}

function canPlay() {
    if (play_modus == "auto" || play_modus == "manual") {
        doPlay();
    } else {
		doPause();
	}
}

function doPlay() {
	var audio = document.getElementById("musicplayer");
    audio.play();
	$("#track"+ oldTrack + " .playback_icon").html("<div class='icon icon-pause'></div>");
	if (audioFirstStart == false) {
		audioFirstStart = true;
		doTrack('Audio','Play',$("#track"+ oldTrack).data("trackname"));
	} else {
		doTrack('Audio','Resume',$("#track"+ oldTrack).data("trackname"));
	}
}

function doPause() {
	var audio = document.getElementById("musicplayer");
	if (!audio.ended) {
		doTrack('Audio','Pause',$("#track"+ oldTrack).data("trackname"));
	}
	if (audio.ended) {
		$("#track"+ oldTrack + " .track_progress").css("width", "0%");
		doTrack('Audio','Complete',$("#track"+ oldTrack).data("trackname"));
	}
    audio.pause();
	$("#track"+ oldTrack + " .playback_icon").html("<div class='icon icon-play'></div>");
}

function doStop() {
	doLog("doStop()");
	var audio = document.getElementById("musicplayer");
 	if (audio) {
		audio.pause();
		if (oldTrack) {
			doTrack('Audio','Stop',$("#track"+ oldTrack).data("trackname"));
		}
		$("#track"+ oldTrack + " .track_progress").css("width", "0%");
		$("#track"+ oldTrack + " .playback_icon").html("<div class='icon icon-play'></div>");
		oldTrack = null;
		playlist_pos = -1;
 	}
}

function playPause() {
	var audio = document.getElementById("musicplayer");
    if (audio.paused) {
        doPlay();
    } else {
        doPause();
    }
}

function playNext() {
	if (typeof(playlist) != "undefined") {
		doLog("playNext(), playlist.length:" + playlist.length + ", playlist_pos:" + playlist_pos)
		if (play_modus == "auto") {
			playlist_pos++;
			if (playlist_pos < playlist.length) {
				var next_id = playlist[playlist_pos];
				doLog("next_id: " + next_id + ", playlist_pos:" + playlist_pos);
				doLog('Audio','AudioGotoNextTrack',$("#track"+ next_id).data("trackname"));
				playTrack(next_id);
			} else {
				playlist_pos = -1;
				doLog("playlist end");
				doPause();	
			}
		} else {
			doPause();	
		}
	}
}

function progressBar() { 
	var oAudio = document.getElementById("musicplayer");	
	var elapsedTime = Math.round(oAudio.currentTime); // get current time in seconds
	var w = (elapsedTime / oAudio.duration) * 100; // update the progress bar
	if (w >= 0 && w <= 100) {
		// doLog("audio-progress: " + w);
		$("#track"+ oldTrack + " .track_progress").css("width", w + "%");
	}
}


// ------------ bg-video ------------ //

function load_bg_video(src,id,loop) {
	// console.log("load_bg_video(" + src + "," + id + "," + loop + ")");
	var loop_str = "";
	var onended_str = "";
	if (loop == "Y") {
		loop_str = "loop";
	} else {
		onended_str = "hide_bg_video('bg_video" + id + "');";	
	}
	var txt = "";
	txt += "<video id=\"bg_video" + id + "\" class=\"bg_video bg_video_off\" preload=\"auto\" muted playsinline volume=\"0\" autoplay " + loop_str + " onCanPlay=\"show_bg_video('bg_video" + id + "');\" onended=\"" + onended_str + "\">";
	txt += "<source src=\"" + src + "\" type=\"video/mp4\">";
	txt += "</video>";
	txt += "<div class='fg_video'></div>";
	$("#bg_video_holder" + id).html(txt);
}

function show_bg_video(id) {
	if ($("#" + id).hasClass("bg_video_off")) {
		if (id == "bg_video-bg-0") {
			var vid = document.getElementById(id);
			vid.playbackRate = 1;
		}
		// doLog("show_bg_video(" + id + ")");
		$("#" + id).removeClass("bg_video_off");
		$("#" + id).addClass("bg_video_on");
		$("#" + id).attr("onCanPlay","");
	}
}

function hide_bg_video(id) {
	$("#" + id).removeClass("bg_video_on");
	$("#" + id).addClass("bg_video_off");
}

function volume_bg_video(vol) {
	var vid = $(".slides .bg_video");
	vid.animate({volume: vol}, 1000, 'swing', function() {
    	// $(".slides .bg_video").each(this.pause()); // pause video
    });
}


// ------------ forms + newsletter ------------ //

function validateEmail(email) { 
	var exp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return exp.test(email);
}

var warnTimeout;

function doWarn(id,txt) {
	// alert("doWarn(" + id + "," + txt + ")");
	$("#"+id).addClass("warning");
	$("label[for='"+ id +"']").html("<span class='icon icon-attention'></span> " + txt);
	$("label[for='"+ id +"']").addClass("warning");
	/*
	// make it shake!
	$(elem).addClass("animated_manual_animation shake").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function(){
    	$(elem).removeClass("animated_manual_animation");
		$(elem).removeClass("shake");
    });
	*/
	$("#"+id).disabled = false;
	$("#"+id).trigger("focus");
	
	clearTimeout(warnTimeout);
	warnTimeout = setTimeout(function(){ 
		resetFormWarnings();
	}, 5000);
}

function resetFormWarnings() {
	$("form .text").removeClass("warning");
	$("form label").removeClass("warning");
	$("form label").each(function(index) {
		var myText = $(this).attr('data-text');
		if (myText !== undefined) {
			$(this).html(urldecode(myText));
		}
	});
}

function checkInput(id, title, allow_empty) {
	title = urldecode(title);
	input = $("#" + id);
	if (allow_empty === undefined) { allow_empty = false; }
	if (allow_empty == false) {
		if (input.val() === "" || input.val().length < 2) {
			doWarn(id, title + " fehlt.");
			return false;
		}
	}
	var zeichen ="<>";
	var eingabe = input.val();
	var laenge = eingabe.length;
	for(i=0; i<laenge;  i++) {
	  	badchar = eingabe.charAt(i);
	  	if (zeichen.indexOf(badchar)>-1) {
			doWarn(id, title + " enthält unerlaubte Zeichen.");
			return false;
		}
	}
	return true;
}

function checkText(id, title, allow_empty) {
	input = $("#" + id);
	if (allow_empty === undefined) { allow_empty = false; }
	if (allow_empty == false) {
		if (input.val() === "" || input.val().length < 24) {
			doWarn(id, title + " fehlt.");
			return false;
		}
	}
	return true;
}

function checkCharCount(el) {
	var str = $("#" + el).val();	
	if ($("#" + el).val().length >= maxChars) {
		doWarn(el, "Das Feld enthält zu viele Zeichen.");
	}
}

function checkUrl(id, title, allow_empty) {
	input = $("#" + id);
	if (allow_empty === undefined) { allow_empty = false; }
	if (allow_empty == false) {
		if (input.val() === "" || input.val().length < 2) {
			doWarn(id, title + " fehlt.");
			return false;
		}
	}
	var zeichen =";<>";
	var eingabe = input.val();
	var laenge = eingabe.length;
	for(i=0; i<laenge;  i++) {
	  	badchar = eingabe.charAt(i);
	  	if (zeichen.indexOf(badchar)>-1) {
			doWarn(id, title + " enthält unerlaubte Zeichen.");
			return false;
		}
	}
	if (eingabe.indexOf("http") !== 0) {
		doWarn(id, title + " muss mit http oder https starten.");
		return false;
	}
	return true;
}

function doFeedback(id,txt) {
	$("#"+ id + " .content").html(txt);
	$("#" + id).slideDown("slow");
	setTimeout(function() { $("#" + id + " a.close").fadeIn("slow"); }, 3000);
}

function closeFeedback(id) {
	$("#" + id + " a.close").fadeOut("fast");
	$("#" + id).fadeOut("slow");
}

function sendnewsletter() {
	doLog("sendnewsletter()");	

	// check email
	if (document.getElementById("nl_email_id")) {
		if (!checkInput("nl_email_id", "E-Mail")) { return false; }
		if (!validateEmail($("#nl_email_id").val())) {
			doWarn("nl_email_id", "Die E-Mail ist ungültig.");
			return false; 
		}
	}

	// check firstname
	if (document.getElementById("nl_firstname_id")) {
		if (!checkInput("nl_firstname_id", "Vorname")) { return false; }
	}
	
	// check nl_country
	if (document.getElementById("nl_country_id")) {
		if (!checkInput("nl_country_id", "Land")) { return false; }
	}
	
	// send data
	var post_data = $("#nl_sender_form").serialize();
	
	// add pers_lytics_uid
	if (window.hasOwnProperty('lio')) {
		post_data += "&pers_lytics_uid=" + window.lio._uid;
	} else {
		post_data += "&pers_lytics_uid=";
	}
	// console.log("post_data:"); console.log(post_data);
	
	$.ajax({
		url: "/" + base + "/section_newsletter_sender.php",
		data: post_data,
		method: "GET",
		dataType: "html",
		cache: false,
		beforeSend: function() {
			$("#nl_btn_send_holder").slideUp("fast");
			doFeedback("nl_feedback_id","<span class='icon icon-spin5 animate-spin'></span> Einen Augenblick bitte...");
		},
		success: function(data) {
			doFeedback("nl_feedback_id",data);
			if (data.search(/error/i) == -1 && data.search(/fehler/i) == -1 && data.search(/erreur/i) == -1) {
				// feedback contains no errors:
				$("#nl_feedback_id a.close").remove();
			} else {
				$("#nl_btn_send_holder").slideDown("fast");
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("Error: " + errorThrown + "(" + XMLHttpRequest.status + ")");
			$("#nl_btn_send_holder").slideDown("fast");
		},
		complete: function() {
			//
		}
	});
	
	return false;
}

var newsletterKeyPress = false;
function initNewsletter() {
    $("#nl_sender_form input").keypress(function(event) {
        if (newsletterKeyPress == false) {
            newsletterKeyPress = true;
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: "Generic Event",
                event_name: "newsletter_soi_start",
                newsletter_soi_start: {
                    newsletter_selection: nl_addressbooks,
                    event_category: "Customer Relations",
                    event_action: "Newsletter",
                    event_label: "Single Opt-In - Start"
                }
            });
        }
    });
    // rewrite browser-history for urls like /newsletter/confirm/
    var res = /newsletter\/([a-zA-Z]+)/.exec(window.location.href);
    if (Array.isArray(res)) {
        // doLog("newsletter_path found: " + res[1]);
        if (window.history && window.history.replaceState) {
            history.replaceState("", window.location.host, window.location.protocol + "//" + window.location.host);
        }
    }
}


// ------------ standard functions ------------ //

var resized;

function initResize() {
	console.log("initResize");
	$(window).on('resize orientationChanged', function() {
		$("#body_id").addClass("resize");
		clearTimeout(resized);
		resized = setTimeout(onResize, 150);
	});
}	

var copyActive = false;

function initCopyButtons() {
	// doLog("initCopyButtons()"); // for clipboard.js v2.0.6
	var clipboard = new ClipboardJS(".copy-button");
	clipboard.on('success', function(e) {
        if (copyActive == false) {
            // console.info('Action:', e.action); console.info('Text:', e.text); console.info('Trigger:', e.trigger);
            doTrack('Social', "LinkCopy", urldecode(e.text));
            e.clearSelection();
            if (lang == "de") {
                doMsg("<span class='icon icon-ok'></span> Link kopiert");
            } else {
                doMsg("<span class='icon icon-ok'></span> Link copied");	
            }
            copyActive = true;
            setTimeout(function() { closeMsg(); copyActive = false; }, 3000);
        }
	});
	var emailclipboard = new ClipboardJS('a.copy-email', {
        text: function(trigger) {
            return trigger.getAttribute('data-usr') + "@" + trigger.getAttribute('data-dom') + "." + trigger.getAttribute('data-tld');
        }
    });
	emailclipboard.on('success', function(e) {
         if (copyActive == false) {
            // console.info('emailclipboard Action:', e.action); console.info('emailclipboard Text:', e.text); console.info('Trigger:', e.trigger);
            doTrack('Social', "EmailCopy", urldecode(e.text));
            e.clearSelection();
            if (lang == "de") {
                doMsg("<span class='icon icon-ok'></span> E-Mail kopiert");
            } else {
                doMsg("<span class='icon icon-ok'></span> E-Mail copied");	
            }
            copyActive = true;
            setTimeout(function() { closeMsg(); copyActive = false; }, 3000);
         }
	});
}

function doMsg(txt) {
	// if ($("#msg .content").html() != "") { doAnim("#msg", "flash"); }
	$("#msg .content").html(urldecode(txt));
	$("#msg").slideDown('fast', function() {});
}

function closeMsg() {
	if (window.jQuery) {
		$("#msg").slideUp("fast", function() { $("#msg .content").empty(); });
	} else {
		document.getElementById('msg').children[0].innerHTML='';document.getElementById('msg').style.display='none';
	}
}

function setShare(id, url, title) {
	var txt = '';
	txt += '<div class="share_tools" data-url="' + url + '" data-title="' + title + '">';
	txt += '<a class="button share_facebook" href="#" onclick="doShare(event,\'facebook\');return false;" title="Share on facebook"><span class="icon icon-facebook"></span></a>';
	// txt += '<a class="button share_facebook_messenger" href="#" onclick="doShare(event,\'facebook_messenger\');" title="Share with Facebook Messenger"><span class="icon icon-facebook-messenger"></span></a>';
	txt += '<a class="button share_whatsapp" href="#" onclick="doShare(event,\'whatsapp\');" title="Share with whatsapp"><span class="icon icon-whatsapp"></span></a>';
	txt += '<a class="button share_twitter" href="#" onclick="doShare(event,\'twitter\');return false;" title="Tweet"><span class="icon icon-twitter"></span></a>';
	txt += '<a class="button share_email" href="#" onclick="doShare(event,\'email\');" title="Share via email"><span class="icon icon icon-mail"></span></a>';
	txt += '<a class="button copy-button" data-clipboard-action="copy" data-clipboard-text="' + urldecode(url) + '" href="#" onclick="return false;" title="Copy link"><span class="icon icon-link"></span></a>'; 
	txt += '</div>';
	$('#' + id).empty().append(txt);
	initCopyButtons();
}

function toggleShare(event) {
	$(event.target).closest(".share_tools").toggleClass("on");
}

function doShare(event, network) {
	// doMsg("doShare(" + network + ")");console.log("event:");console.log(event);
	var share_el,share_container,url,title,share_window;
	// get data-url & data-title from parent div.share_tools
	if (event.target.parentNode.className == "share_tools") {
		// old safari
		share_el = event.target;
		share_container = event.target.parentNode;
	} else {
		share_el = event.target.parentNode;
		share_container = event.target.parentNode.parentNode;
	}
	// console.log("share_container:");console.log(share_container);
	url = share_container.dataset.url;
	title = share_container.dataset.title;
	// console.log("data:");console.log(url);console.log(urldecode(title));doMsg("url: " + urldecode(url) + "<br>title: " + urldecode(title));
	switch(network) {
		case "facebook":
			doTrack('Social', "Facebook", urldecode(url));
			share_window = window.open("https://www.facebook.com/sharer/sharer.php?u=" + url,"share_window","width=600,height=450,status=no,location=no,scrollbars=no,resizable=yes");
			share_window.focus();
			break;
		case "twitter":
			doTrack('Social', "Twitter", urldecode(url));
			title = urldecode(title);
			title = encodeURIComponent(title);
			$(window).bind("message", function(event) { event = event.originalEvent; if (event.source == share_window && event.data != "__ready__") { doLog("tweet successful"); } });
			share_window = window.open("https://twitter.com/intent/tweet?url=" + url + "&text=" + title + "&hashtags=","share_window","width=600,height=500,status=no,location=no,scrollbars=no,resizable=yes");
			share_window.focus();
			break;
		case "email":
			doTrack('Social', "Email", urldecode(url));
			title = urldecode(title);
			title = encodeURIComponent(title);
			share_el.href = "mailto:?subject=" + title + "&body=" + url;
			break;	
		case "whatsapp":
			doTrack('Social', "Whatsapp", urldecode(url));
			share_el.href = "whatsapp://send?text=" + title + encodeURIComponent(": ") + url;
			break;
		case "facebook_messenger":
			doTrack('Social', "FacebookMessenger", urldecode(url));
			share_el.href = "fb-messenger://share?link=" + url;
		default:
			break;
	}
}

function toggleTab(nr) {
	$(".tabs .tabheader li").removeClass("on");
	$(".tabs .tab").slideUp("fast");
	setTimeout(function() {
		$(".tabs .tabheader li.tab" + nr + "toggle").addClass("on");
		$(".tabs .tab" + nr).slideDown("slow", function() {});
	}, 400);
}

function toggleMenu() {
	if ($("#body_id").hasClass("menu_on")) {
        $("html").removeClass("menu_on");
		$("#body_id").removeClass("menu_on");
	} else {
		$("html").addClass("menu_on");
        $("#body_id").addClass("menu_on");
	}
}

function doScroll(el) {
	doLog("doScroll(" + el + ")");
	yOffset = -1 * $(".header_norm").outerHeight();
	yOffset -= 0;
	$.scrollTo(el, 800, {
		axis: "y",
		offset: yOffset,
		onAfter: function () {
		}
	});
}

function initNav() {
	$('.header_norm .nav_list a.page_link').on("click", function(){
		doShow($(this).data('href'),"",0);
		return false;
	});
	$('.nav_overlay .nav_list a.page_link').on("click", function(){
		doShow($(this).data('href'),"",0);
		toggleMenu();
		return false;
	});
	var sections = $('section');
	var waypoints = sections.waypoint({
		handler: function(direction) {
			var active_id = this.element.id;
			// doLog(active_id + ' hit 40% from top of window');
			if (direction === 'up'){ active_id = $("#" + active_id).prev().attr('id'); }
			// if (direction === 'down'){ active_id = $("#" + active_id).next().attr('id'); }
			$('.nav_list ul li.nav_page').removeClass('on');
			$('.nav_list ul li.nav_' + active_id).addClass('on');
			// setHash(sectionId); // 2do: if not scrolling because of doShow(), leads to blinks while auto-scrolling (ie, ff)
		},
		offset: '35%'
	});
	var waypoint = new Waypoint({
		element: $('#header_bottom'),
		handler: function(direction) {
			// console.log('Scrolled to #header_bottom, Direction: ' + direction);
			if (direction === 'up'){
				$("#body_id").removeClass("compact");
			}
			if (direction === 'down'){
				$("#body_id").addClass("compact");
			}
		},
		offset: -150
	});
}

function initHeader() {
	// https://stackoverflow.com/questions/31223341/#answer-31223774
	var body = $("#body_id");
	var lastScrollTop = 0;
	window.addEventListener("scroll", function() {
	   var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
	   if (st > lastScrollTop && st > 60){
		  body.addClass("scrollDown");
	   } else {
		  body.removeClass("scrollDown");
	   }
	   lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
	}, false);
}

function initFancybox() {
	$.fancybox.defaults.buttons = ['close']; // 'fullScreen','slideShow',
	$.fancybox.defaults.hash = false;
	$.fancybox.defaults.loop = true;
	$.fancybox.defaults.backFocus = false;
	// $.fancybox.defaults.hideScrollbar = true;
	// $.fancybox.defaults.margin = [0,0];
}

function doTruncate(identifier, limit) {
    switch (lang) {
        case "de":
            var showText = "Mehr anzeigen";
            var hideText = "Weniger anzeigen";
            break;
        case "fr":
            var showText = "Voir Plus";
            var hideText = "Voir Moins";
            break;
        default:
            var showText = "Show more";
            var hideText = "Show less";
            break;
    }
	if (isNaN(limit)) { limit = 7; }
	$(identifier).truncate({
		"maxLines": limit,
		"truncateString": "&nbsp;&#8230;",
		"showText": "<div class='more clearfix'><span class='border title'>" + showText + "</span>&nbsp;<span class='icon icon-down-open'></span></div>",
		"hideText": "<div class='more clearfix'><span class='border title'>" + hideText + "</span>&nbsp;<span class='icon icon-up-open'></span></div>",
		"animate": true,
		"animateOptions": { 'complete': function() {
			$(identifier).css("height","auto");
			sRefresh();
			if ($(this).data("status") === "open") {
				$(this).data("status","closed");
				var yOffset = -1 * $(".header_compact").height();
				yOffset -= 10;
				var myId = $(this).attr("id");
				if (!myId) {
					myId = "trunc_" + myRandom(100000, 999999);
					$(this).attr("id",myId);
				}
				var target = $("#" + myId);
				$.scrollTo(target, 1000, {
					axis: "y",
					offset: yOffset,
					duration: 3000,
					onAfter: function () {
                        try { $(".carousel").flickity('resize'); } catch (e) { }
                    }
				});
			} else {
				$(this).data("status","open");
                try { $(".carousel").flickity('resize'); } catch (e) { }
			}
		} }
	});
}

function urldecode(str) {
	return decodeURIComponent((str+'').replace(/\+/g, ' '));
}

function doLog(txt) {
	node = document.getElementById("log");
	if (node) { node.innerHTML = txt + "<br>" + node.innerHTML; }
	if (page_mode == "dev") { if (console) { console.log(txt); } }
}

function doTrack(category, action, label) {
	if (category != "" && action != "") {
		// umg-tracking
        switch(category) {
            case "CRM":
            case "Video":
                dataLayer.push({'event':'GAEvent', 'attributes': {'eventCategory': '' + category + '', 'eventAction': '' + action +'', 'eventLabel': '' + label + '' }});
                break;
            case "Social":
                dataLayer.push({'event': 'Generic Event', 'event_name': 'share_start', 'share_start' : { 'social_network': '' + action + '', 'event_category': 'Social', 'event_action': 'Share - ' + action + '', 'event_label': '' + label + ''}});
                break;
            case "Audio":
                dataLayer.push({'event': "Generic Event", 'event_name': "audio_play", 'audio_play': { 'artist_name': '' + artist + '', 'audio_name': '' + label + '', 'event_category': "Audio", 'event_action': '' + action + '', 'event_label': '' + label + '' }});
                break;
            default:
                break;    
        }
		// analytics.js
		// ga('send', 'event', category, action, label);
		// ga.js:
		// _gaq.push(['_trackEvent', category, action, label]);	
	}
	doLog("doTrack(" + category + " | " + action + " | " + label + ")");
}

// wca (facebook website custom audiences)
function wcaCtrl(modus) {
	var domain = location.hostname.replace('www.','').replace('m.','');
	if (modus === "off") {
		document.cookie = "fb_umg_disabled=1; expires=Thu, 31 Dec 2099 23:59:59 UTC; domain=." + domain + "; path=/";
		alert('Facebook WCA is now disabled for this site');
	} else {
		document.cookie = "fb_umg_disabled=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=." + domain;
		alert('Facebook WCA is now enabled for this site');
	}
}

function initSvg() {
	$('img.svg').each(function(){
		var $img = $(this); var imgID = $img.attr('id'); var imgClass = $img.attr('class'); var imgURL = $img.attr('src');
		$.get(imgURL, function(data) {
			var $svg = $(data).find('svg');
			if (typeof imgID !== 'undefined') { $svg = $svg.attr('id', imgID); }
			if (typeof imgClass !== 'undefined') { $svg = $svg.attr('class', imgClass+' replaced-svg'); }
			$svg = $svg.removeAttr('xmlns:a'); $img.replaceWith($svg);
		}, 'xml');
	});
}

function inIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

function checkLinks() {
    $('a[href^="http"]').not('a[href*="' + location.hostname + '"]').attr({target: "_blank", rel: "noopener"});
}

function winopen(url,name,w,h) {
	var w_shift = Number((screen.width/2)-(w/2));
	var h_shift = Number((screen.height/2)-(h/2));
	var newWin = window.open(url, name, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no, width='+w+', height='+h+', left='+w_shift+', top='+h_shift);
	newWin.focus();
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getCookieValue(a) { // thx 2 mac: http://stackoverflow.com/questions/5639346/#answer-25490531
    var b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
}

function getRequestVar(name){
	if (name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search)) { return decodeURIComponent(name[1]); }
}

function kill(id) {
	element = document.getElementById(id);
 	if (element) {
  		var parent = element.parentNode;
  		if (parent) {
			parent.removeChild(element);
		}
 	}
 	return false;
}

// email crypto
function UnCryptMailto(s) {
	var n = 0;
	var r = "";
	for (var i = 0; i < s.length; i++) {
		n = s.charCodeAt( i );
		if (n>= 8364) { n = 128; }
		r += String.fromCharCode(n - 1);
	}
	return r;
}

function linktoUncryptMail(s) {
	location.href = "mailto:" + UnCryptMailto(s); // alert("email: " + UnCryptMailto(s));
}

// thx Jonas Raoni Soares Silva, http://jsfromhell.com/array/shuffle [rev. #1] // usage: var a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; alert('shuffle(a): ' + shuffle(a));
function shuffle(v) {
    for(var j, x, i = v.length; i; j = parseInt(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x);
    return v;
};

function myRandom(a, b) {
	if (a > b) { return(-1); }
	if (a === b) { return(a); }
	return a + parseInt(Math.random() * ( b - a+1 ));
}

// peace out