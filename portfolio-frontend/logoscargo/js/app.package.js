(function($,window,document,undefined){var touchDistancePrev=0;var Animation=function(Glide,Core){var offset;function Animation(){}Animation.prototype.make=function(displacement){if(!Core.Run.canProcess()){return Core.Arrows.disable()}offset=typeof displacement!=="undefined"?parseInt(displacement):0;this[Glide.options.type]();return this};Animation.prototype.after=function(callback){return setTimeout(function(){callback()},Glide.options.animationDuration+20)};Animation.prototype.slider=function(){var translate=Glide[Glide.size]*(Glide.current-1);var shift=Core.Clones.shift-Glide.paddings;if(Core.Run.isStart()){if(Glide.options.centered){shift=Math.abs(shift)}else{shift=0}Core.Arrows.disable("prev")}else if(Core.Run.isEnd()){if(Glide.options.centered){shift=Math.abs(shift)}else{shift=Math.abs(shift*2)}Core.Arrows.disable("next")}else{shift=Math.abs(shift);Core.Arrows.enable()}Glide.track.css({transition:Core.Transition.get("all"),transform:Core.Translate.set(Glide.axis,translate-shift-offset)})};Animation.prototype.carousel=function(){var translate=Glide[Glide.size]*Glide.current;var shift;if(Glide.options.centered){shift=Core.Clones.shift-Glide.paddings}else{shift=Core.Clones.shift}if(Core.Run.isOffset("<")){translate=0;Core.Run.flag=false;this.after(function(){Glide.track.css({transition:Core.Transition.clear("all"),transform:Core.Translate.set(Glide.axis,Glide[Glide.size]*Glide.length+shift)})})}if(Core.Run.isOffset(">")){translate=Glide[Glide.size]*Glide.length+Glide[Glide.size];Core.Run.flag=false;this.after(function(){Glide.track.css({transition:Core.Transition.clear("all"),transform:Core.Translate.set(Glide.axis,Glide[Glide.size]+shift)})})}Glide.track.css({transition:Core.Transition.get("all"),transform:Core.Translate.set(Glide.axis,translate+shift-offset)})};Animation.prototype.slideshow=function(){Glide.slides.css("transition",Core.Transition.get("opacity")).eq(Glide.current-1).css("opacity",1).siblings().css("opacity",0)};return new Animation};var Api=function(Glide,Core){function Api(){}Api.prototype.instance=function(){return{current:function(){return Glide.current},go:function(distance,callback){Core.Run.pause();Core.Run.make(distance,callback);Core.Run.play()},jump:function(distance,callback){Core.Transition.jumping=true;Core.Animation.after(function(){Core.Transition.jumping=false});Core.Run.make(distance,callback)},move:function(distance){Core.Transition.jumping=true;Core.Animation.make(distance);Core.Transition.jumping=false},start:function(interval){Core.Run.running=true;Glide.options.autoplay=parseInt(interval);Core.Run.play()},play:function(){return Core.Run.play()},pause:function(){return Core.Run.pause()},destroy:function(){Core.Run.pause();Core.Clones.remove();Core.Helper.removeStyles([Glide.track,Glide.slides]);Core.Bullets.remove();Glide.slider.removeData("glide_api");Core.Events.unbind();Core.Touch.unbind();Core.Arrows.unbind();Core.Bullets.unbind();Glide.destroyed=true;delete Glide.slider;delete Glide.track;delete Glide.slides;delete Glide.width;delete Glide.length},refresh:function(){Core.Run.pause();Glide.collect();Glide.setup();Core.Clones.remove().init();Core.Bullets.remove().init();Core.Build.init();Core.Run.make("="+parseInt(Glide.options.startAt),Core.Run.play())}}};return new Api};var Arrows=function(Glide,Core){function Arrows(){this.build();this.bind()}Arrows.prototype.build=function(){this.wrapper=Glide.slider.find("."+Glide.options.classes.arrows);this.items=this.wrapper.children()};Arrows.prototype.disable=function(type){var classes=Glide.options.classes;if(!type){return this.disableBoth()}this.items.filter("."+classes["arrow"+Core.Helper.capitalise(type)]).unbind("click.glide touchstart.glide").addClass(classes.disabled).siblings().bind("click.glide touchstart.glide",this.click).bind("mouseenter.glide",this.hover).bind("mouseleave.glide",this.hover).removeClass(classes.disabled)};Arrows.prototype.disableBoth=function(){this.items.unbind("click.glide touchstart.glide").addClass(Glide.options.classes.disabled)};Arrows.prototype.enable=function(){this.bind();this.items.removeClass(Glide.options.classes.disabled)};Arrows.prototype.click=function(event){event.preventDefault();if(!Core.Events.disabled){Core.Run.pause();Core.Run.make($(this).data("glide-dir"));Core.Animation.after(function(){Core.Run.play()})}};Arrows.prototype.hover=function(event){if(!Core.Events.disabled){switch(event.type){case"mouseleave":Core.Run.play();break;case"mouseenter":Core.Run.pause();break}}};Arrows.prototype.bind=function(){this.items.on("click.glide touchstart.glide",this.click).on("mouseenter.glide",this.hover).on("mouseleave.glide",this.hover)};Arrows.prototype.unbind=function(){this.items.off("click.glide touchstart.glide").off("mouseenter.glide").off("mouseleave.glide")};return new Arrows};var Build=function(Glide,Core){function Build(){this.init()}Build.prototype.init=function(){this[Glide.options.type]();this.active();Core.Height.set()};Build.prototype.isType=function(name){return Glide.options.type===name};Build.prototype.isMode=function(name){return Glide.options.mode===name};Build.prototype.slider=function(){Core.Transition.jumping=true;Glide.slides[Glide.size](Glide[Glide.size]);Glide.track.css(Glide.size,Glide[Glide.size]*Glide.length);if(this.isMode("vertical")){Core.Height.set(true)}Core.Animation.make();Core.Transition.jumping=false};Build.prototype.carousel=function(){Core.Transition.jumping=true;Core.Clones.shift=Glide[Glide.size]*Core.Clones.items.length/2-Glide[Glide.size];Glide.slides[Glide.size](Glide[Glide.size]);Glide.track.css(Glide.size,Glide[Glide.size]*Glide.length+Core.Clones.getGrowth());if(this.isMode("vertical")){Core.Height.set(true)}Core.Animation.make();Core.Clones.append();Core.Transition.jumping=false};Build.prototype.slideshow=function(){Core.Transition.jumping=true;Core.Animation.make();Core.Transition.jumping=false};Build.prototype.active=function(){Glide.slides.eq(Glide.current-1).addClass(Glide.options.classes.active).siblings().removeClass(Glide.options.classes.active)};return new Build};var Bullets=function(Glide,Core){function Bullets(){this.init();this.bind()}Bullets.prototype.init=function(){this.build();this.active();return this};Bullets.prototype.build=function(){this.wrapper=Glide.slider.children("."+Glide.options.classes.bullets);for(var i=1;i<=Glide.length;i++){$("<button>",{class:Glide.options.classes.bullet,"data-glide-dir":"="+i}).appendTo(this.wrapper)}this.items=this.wrapper.children()};Bullets.prototype.active=function(){this.items.eq(Glide.current-1).addClass("active").siblings().removeClass("active")};Bullets.prototype.remove=function(){this.items.remove();return this};Bullets.prototype.click=function(event){event.preventDefault();if(!Core.Events.disabled){Core.Run.pause();Core.Run.make($(this).data("glide-dir"));Core.Animation.after(function(){Core.Run.play()})}};Bullets.prototype.hover=function(event){if(!Core.Events.disabled){switch(event.type){case"mouseleave":Core.Run.play();break;case"mouseenter":Core.Run.pause();break}}};Bullets.prototype.bind=function(){this.wrapper.on("click.glide touchstart.glide","button",this.click).on("mouseenter.glide","button",this.hover).on("mouseleave.glide","button",this.hover)};Bullets.prototype.unbind=function(){this.wrapper.off("click.glide touchstart.glide","button").off("mouseenter.glide","button").off("mouseleave.glide","button")};return new Bullets};var Clones=function(Glide,Core){var map=[0,1];var pattern;function Clones(){this.items=[];this.shift=0;this.init()}Clones.prototype.init=function(){this.map();this.collect();return this};Clones.prototype.map=function(){var i;pattern=[];for(i=0;i<map.length;i++){pattern.push(-1-i,i)}};Clones.prototype.collect=function(){var item;var i;for(i=0;i<pattern.length;i++){item=Glide.slides.eq(pattern[i]).clone().addClass(Glide.options.classes.clone);this.items.push(item)}};Clones.prototype.append=function(){var i;var item;for(i=0;i<this.items.length;i++){item=this.items[i][Glide.size](Glide[Glide.size]);if(pattern[i]>=0){item.appendTo(Glide.track)}else{item.prependTo(Glide.track)}}};Clones.prototype.remove=function(){var i;for(i=0;i<this.items.length;i++){this.items[i].remove()}return this};Clones.prototype.getGrowth=function(){return Glide.width*this.items.length};return new Clones};var Core=function(Glide,Modules){function Core(){for(var module in Modules){this[module]=new Modules[module](Glide,this)}}return new Core};var Events=function(Glide,Core){var triggers=$("[data-glide-trigger]");function Events(){this.disabled=false;this.prevented=false;this.keyboard();this.hoverpause();this.resize();this.bindTriggers();this.bindAnchors();this.bindImages()}Events.prototype.keyboard=function(){if(Glide.options.keyboard){$(window).on("keyup.glide",function(event){if(event.keyCode===39){Core.Run.make(">")}if(event.keyCode===37){Core.Run.make("<")}})}};Events.prototype.hoverpause=function(){if(Glide.options.hoverpause){Glide.track.on("mouseover.glide",function(){Core.Run.pause();Core.Events.trigger("mouseOver")}).on("mouseout.glide",function(){Core.Run.play();Core.Events.trigger("mouseOut")})}};Events.prototype.resize=function(){$(window).on("resize.glide."+Glide.uuid,Core.Helper.throttle(function(){if(!Glide.destroyed){Core.Transition.jumping=true;Glide.setup();Core.Build.init();Core.Run.make("="+Glide.current,false);Core.Run.play();Core.Transition.jumping=false}},Glide.options.throttle))};Events.prototype.bindTriggers=function(){if(triggers.length){triggers.off("click.glide touchstart.glide").on("click.glide touchstart.glide",this.handleTrigger)}};Events.prototype.handleTrigger=function(event){event.preventDefault();var targets=$(this).data("glide-trigger").split(" ");if(!this.disabled){for(var el in targets){var target=$(targets[el]).data("glide_api");target.pause();target.go($(this).data("glide-dir"),this.activeTrigger);target.play()}}};Events.prototype.bindAnchors=function(){Glide.track.on("click.glide","a",function(e){if(this.prevented){e.preventDefault()}}.bind(this))};Events.prototype.bindImages=function(){Glide.track.on("dragstart.glide","img",function(e){if(this.prevented){e.preventDefault()}}.bind(this))};Events.prototype.detachClicks=function(event){Glide.track.find("a").each(function(i,a){$(a).attr("data-href",$(a).attr("href")).removeAttr("href")});return this};Events.prototype.attachClicks=function(event){Glide.track.find("a").each(function(i,a){$(a).attr("href",$(a).attr("data-href")).removeAttr("data-href")});Core.Animation.after(function(){this.prevented=false}.bind(this));return this};Events.prototype.preventClicks=function(){this.prevented=true;return this};Events.prototype.call=function(func){if(func!=="undefined"&&typeof func==="function"){func(this.getParams())}return this};Events.prototype.trigger=function(name){Glide.slider.trigger(name+".glide",[this.getParams()]);return this};Events.prototype.getParams=function(){return{index:Glide.current,length:Glide.slides.length,current:Glide.slides.eq(Glide.current-1),slider:Glide.slider,swipe:{distance:Core.Touch.distance||0}}};Events.prototype.unbind=function(){Glide.track.off("click.glide","a").off("dragstart.glide","img").off("keyup.glide").off("mouseover.glide").off("mouseout.glide");triggers.off("click.glide touchstart.glide");$(window).off("keyup.glide").off("resize.glide."+Glide.uuid)};Events.prototype.disable=function(){this.disabled=true;return this};Events.prototype.enable=function(){this.disabled=false;return this};return new Events};var Height=function(Glide,Core){function Height(){if(Glide.options.autoheight){Glide.wrapper.css({transition:Core.Transition.get("height")})}}Height.prototype.get=function(){var offset=Glide.axis==="y"?Glide.paddings*2:0;return Glide.slides.eq(Glide.current-1).height()+offset};Height.prototype.set=function(force){return Glide.options.autoheight||force?Glide.wrapper.height(this.get()):false};return new Height};var Helper=function(Glide,Core){function Helper(){}Helper.prototype.byAxis=function(hValue,vValue){if(Glide.axis==="y"){return vValue}return hValue};Helper.prototype.capitalise=function(string){return string.charAt(0).toUpperCase()+string.slice(1)};Helper.prototype.now=Date.now||function(){return(new Date).getTime()};Helper.prototype.throttle=function(func,wait,options){var that=this;var context;var args;var result;var timeout=null;var previous=0;if(!options){options={}}var later=function(){previous=options.leading===false?0:that.now();timeout=null;result=func.apply(context,args);if(!timeout){context=args=null}};return function(){var now=that.now();if(!previous&&options.leading===false){previous=now}var remaining=wait-(now-previous);context=this;args=arguments;if(remaining<=0||remaining>wait){if(timeout){clearTimeout(timeout);timeout=null}previous=now;result=func.apply(context,args);if(!timeout){context=args=null}}else if(!timeout&&options.trailing!==false){timeout=setTimeout(later,remaining)}return result}};Helper.prototype.removeStyles=function(elements){for(var i=0;i<elements.length;i++){elements[i].removeAttr("style")}};return new Helper};var Run=function(Glide,Core){function Run(){this.running=false;this.flag=false;this.play()}Run.prototype.play=function(){var that=this;if(!this.canProcess()){return}if(Glide.options.autoplay||this.running){if(typeof this.interval==="undefined"){this.interval=setInterval(function(){that.pause();that.make(">");that.play()},this.getInterval())}}return this.interval};Run.prototype.getInterval=function(){return parseInt(Glide.slides.eq(Glide.current-1).data("glide-autoplay"))||Glide.options.autoplay};Run.prototype.pause=function(){if(Glide.options.autoplay||this.running){if(this.interval>=0){this.interval=clearInterval(this.interval)}}return this.interval};Run.prototype.isStart=function(){return Glide.current===1};Run.prototype.isEnd=function(){return Glide.current===Glide.length};Run.prototype.isOffset=function(direction){return this.flag&&this.direction===direction};Run.prototype.make=function(move,callback){var that=this;this.direction=move.substr(0,1);this.steps=move.substr(1)?move.substr(1):0;if(!this.canProcess()){return this.stop()}if(!Glide.options.hoverpause){this.pause()}if(callback!==false){Core.Events.disable().call(Glide.options.beforeTransition).trigger("beforeTransition")}switch(this.direction){case">":if(this.isEnd()){Glide.current=1;this.flag=true}else if(this.steps===">"){Glide.current=Glide.length}else{Glide.current=Glide.current+1}break;case"<":if(this.isStart()){Glide.current=Glide.length;this.flag=true}else if(this.steps==="<"){Glide.current=1}else{Glide.current=Glide.current-1}break;case"=":Glide.current=parseInt(this.steps);break}Core.Height.set();Core.Bullets.active();Core.Animation.make().after(function(){Core.Build.active();Core.Touch.distance=0;if(callback!==false){Core.Events.enable().call(callback).call(Glide.options.afterTransition).trigger("afterTransition")}if(!Glide.options.hoverpause){that.play()}});Core.Events.call(Glide.options.duringTransition).trigger("duringTransition")};Run.prototype.stop=function(){this.pause()};Run.prototype.canProcess=function(){return Glide.slides.length>1};return new Run};var Touch=function(Glide,Core){var touch;function Touch(){this.dragging=false;if(Glide.options.touchDistance){Glide.track.on({"touchstart.glide":$.proxy(this.start,this)})}if(Glide.options.dragDistance){Glide.track.on({"mousedown.glide":$.proxy(this.start,this)})}}Touch.prototype.unbind=function(){Glide.track.off("touchstart.glide mousedown.glide").off("touchmove.glide mousemove.glide").off("touchend.glide touchcancel.glide mouseup.glide mouseleave.glide")};Touch.prototype.start=function(event){if(!Core.Events.disabled&&!this.dragging){if(event.type==="mousedown"){touch=event.originalEvent}else{touch=event.originalEvent.touches[0]||event.originalEvent.changedTouches[0]}Core.Transition.jumping=true;this.touchStartX=parseInt(touch.pageX);this.touchStartY=parseInt(touch.pageY);this.touchSin=null;this.dragging=true;Glide.track.on({"touchmove.glide mousemove.glide":Core.Helper.throttle($.proxy(this.move,this),Glide.options.throttle),"touchend.glide touchcancel.glide mouseup.glide mouseleave.glide":$.proxy(this.end,this)});Core.Events.detachClicks().call(Glide.options.swipeStart).trigger("swipeStart");Core.Run.pause()}};Touch.prototype.move=function(event){if(!Core.Events.disabled&&this.dragging){if(event.type==="mousemove"){touch=event.originalEvent}else{touch=event.originalEvent.touches[0]||event.originalEvent.changedTouches[0]}var subExSx=parseInt(touch.pageX)-this.touchStartX;var subEySy=parseInt(touch.pageY)-this.touchStartY;var powEX=Math.abs(subExSx<<2);var powEY=Math.abs(subEySy<<2);var touchHypotenuse=Math.sqrt(powEX+powEY);var touchCathetus=Math.sqrt(Core.Helper.byAxis(powEY,powEX));this.touchSin=Math.asin(touchCathetus/touchHypotenuse);this.distance=Core.Helper.byAxis(touch.pageX-this.touchStartX,touch.pageY-this.touchStartY);if(this.touchSin*180/Math.PI<45){Core.Animation.make(Core.Helper.byAxis(subExSx,subEySy))}Core.Events.preventClicks().call(Glide.options.swipeMove).trigger("swipeMove");if(Core.Build.isMode("vertical")){if(Core.Run.isStart()&&subEySy>0){return}if(Core.Run.isEnd()&&subEySy<0){return}}if(this.touchSin*180/Math.PI<45){event.stopPropagation();event.preventDefault();Glide.track.addClass(Glide.options.classes.dragging)}else{return}}};Touch.prototype.end=function(event){if(!Core.Events.disabled&&this.dragging){var distanceLimiter;if(event.type==="mouseup"||event.type==="mouseleave"){touch=event.originalEvent}else{touch=event.originalEvent.touches[0]||event.originalEvent.changedTouches[0]}var touchDistance=Core.Helper.byAxis(touch.pageX-this.touchStartX,touch.pageY-this.touchStartY);var touchDeg=this.touchSin*180/Math.PI;Core.Transition.jumping=false;if(Core.Build.isType("slider")){if(Core.Run.isStart()){if(touchDistance>0){touchDistance=0}}if(Core.Run.isEnd()){if(touchDistance<0){touchDistance=0}}}if(event.type==="mouseup"||event.type==="mouseleave"){distanceLimiter=Glide.options.dragDistance}else{distanceLimiter=Glide.options.touchDistance}if(touchDistance>distanceLimiter&&touchDeg<45){Core.Run.make("<")}else if(touchDistance<-distanceLimiter&&touchDeg<45){Core.Run.make(">")}else{Core.Animation.make()}Core.Animation.after(function(){Core.Events.enable();Core.Run.play()});this.dragging=false;Core.Events.attachClicks().disable().call(Glide.options.swipeEnd).trigger("swipeEnd");Glide.track.removeClass(Glide.options.classes.dragging).off("touchmove.glide mousemove.glide").off("touchend.glide touchcancel.glide mouseup.glide mouseleave.glide")}};return new Touch};var Transition=function(Glide,Core){function Transition(){this.jumping=false}Transition.prototype.get=function(property){if(!this.jumping){return property+" "+Glide.options.animationDuration+"ms "+Glide.options.animationTimingFunc}return this.clear("all")};Transition.prototype.clear=function(property){return property+" 0ms "+Glide.options.animationTimingFunc};return new Transition};var Translate=function(Glide,Core){var axes={x:0,y:0,z:0};function Translate(){}Translate.prototype.set=function(axis,value){axes[axis]=parseInt(value);return"translate3d("+-1*axes.x+"px, "+-1*axes.y+"px, "+-1*axes.z+"px)"};return new Translate};var Glide=function(element,options){var defaults={autoplay:4e3,type:"carousel",mode:"horizontal",startAt:1,hoverpause:true,keyboard:true,touchDistance:80,dragDistance:120,animationDuration:400,animationTimingFunc:"cubic-bezier(0.165, 0.840, 0.440, 1.000)",throttle:16,autoheight:false,paddings:0,centered:true,classes:{base:"glide",wrapper:"glide__wrapper",track:"glide__track",slide:"glide__slide",arrows:"glide__arrows",arrow:"glide__arrow",arrowNext:"next",arrowPrev:"prev",bullets:"glide__bullets",bullet:"glide__bullet",clone:"clone",active:"active",dragging:"dragging",disabled:"disabled"},beforeInit:function(event){},afterInit:function(event){},beforeTransition:function(event){},duringTransition:function(event){},afterTransition:function(event){},swipeStart:function(event){},swipeEnd:function(event){},swipeMove:function(event){}};this.options=$.extend({},defaults,options);this.uuid=Math.floor(Math.random()*1e3);this.current=parseInt(this.options.startAt);this.element=element;this.collect();this.setup();this.destroyed=false;this.options.beforeInit({index:this.current,length:this.slides.length,current:this.slides.eq(this.current-1),slider:this.slider});var Engine=new Core(this,{Helper:Helper,Translate:Translate,Transition:Transition,Arrows:Arrows,Bullets:Bullets,Run:Run,Animation:Animation,Clones:Clones,Height:Height,Build:Build,Events:Events,Touch:Touch,Api:Api});Engine.Events.call(this.options.afterInit);return Engine.Api.instance()};Glide.prototype.collect=function(){var options=this.options;var classes=options.classes;this.slider=this.element.addClass(classes.base+"--"+options.type).addClass(classes.base+"--"+options.mode);this.track=this.slider.find("."+classes.track);this.wrapper=this.slider.find("."+classes.wrapper);this.slides=this.track.find("."+classes.slide).not("."+classes.clone)};Glide.prototype.setup=function(){var modeToDimensionsMap={horizontal:["width","x"],vertical:["height","y"]};this.size=modeToDimensionsMap[this.options.mode][0];this.axis=modeToDimensionsMap[this.options.mode][1];this.length=this.slides.length;this.paddings=this.getPaddings();this[this.size]=this.getSize()};Glide.prototype.getPaddings=function(){var option=this.options.paddings;if(typeof option==="string"){var normalized=parseInt(option,10);var isPercentage=option.indexOf("%")>=0;if(isPercentage){return parseInt(this.slider[this.size]()*(normalized/100))}return normalized}return option};Glide.prototype.getSize=function(){return this.slider[this.size]()-this.paddings*2};$.fn.glide=function(options){return this.each(function(){if(!$.data(this,"glide_api")){$.data(this,"glide_api",new Glide($(this),options))}})}})(jQuery,window,document);var YoutubeDelayed={initPlayer:function(node){var videoId=node.getAttribute("data-videoid");var image=node.getAttribute("data-image")||"maxresdefault.jpg";node.style.backgroundImage=node.getAttribute("data-image")?"url("+image+")":"url(http://img.youtube.com/vi/"+videoId+"/"+image+")";node.innerHTML='<a class="play-button" href="http://www.youtube.com/watch?v='+videoId+'" target="_blank"><span class="play-button_side play-button_icon"><svg viewBox="0 0 15 18" xmlns="http://www.w3.org/2000/svg"><polygon points="0 0 0 18 15 9 0 0"></polygon></svg></span><span class="play-button_side play-button_text"><span>Play<br>video</span></span></a>'+'<div class="video-embed_overlay"></div>';node.firstChild.onclick=YoutubeDelayed.loadPlayer},init:function(){var players=document.getElementsByClassName("video-embed");var i;for(i=0;i<players.length;i++){YoutubeDelayed.initPlayer(players[i])}},loadPlayer:function(e){e.preventDefault();this.parentNode.innerHTML='<iframe src="http://www.youtube.com/embed/'+this.parentNode.getAttribute("data-videoid")+'?autoplay=1&controls=0&amp;fs=0&amp;modestbranding=1&amp;rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>'}};(function(window,factory){if(typeof define==="function"&&define.amd){define(["jquery"],function($){return factory(window,$)})}else if(typeof module==="object"&&typeof module.exports==="object"){module.exports=factory(window,require("jquery"))}else{window.lity=factory(window,window.jQuery||window.Zepto)}})(typeof window!=="undefined"?window:this,function(window,$){"use strict";var document=window.document;var _win=$(window);var _deferred=$.Deferred;var _html=$("html");var _instances=[];var _attrAriaHidden="aria-hidden";var _dataAriaHidden="lity-"+_attrAriaHidden;var _focusableElementsSelector='a[href],area[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),button:not([disabled]),iframe,object,embed,[contenteditable],[tabindex]:not([tabindex^="-"])';var _defaultOptions={esc:true,handler:null,handlers:{image:imageHandler,inline:inlineHandler,youtube:youtubeHandler,vimeo:vimeoHandler,googlemaps:googlemapsHandler,facebookvideo:facebookvideoHandler,iframe:iframeHandler},template:'<div class="lity" role="dialog" aria-label="Dialog Window (Press escape to close)" tabindex="-1"><div class="lity-wrap" data-lity-close role="document"><div class="lity-loader" aria-hidden="true">Loading...</div><div class="lity-container"><div class="lity-content"></div><button class="lity-close" type="button" aria-label="Close (Press escape to close)" data-lity-close>&times;</button></div></div></div>'};var _imageRegexp=/(^data:image\/)|(\.(png|jpe?g|gif|svg|webp|bmp|ico|tiff?)(\?\S*)?$)/i;var _youtubeRegex=/(youtube(-nocookie)?\.com|youtu\.be)\/(watch\?v=|v\/|u\/|embed\/?)?([\w-]{11})(.*)?/i;var _vimeoRegex=/(vimeo(pro)?.com)\/(?:[^\d]+)?(\d+)\??(.*)?$/;var _googlemapsRegex=/((maps|www)\.)?google\.([^\/\?]+)\/?((maps\/?)?\?)(.*)/i;var _facebookvideoRegex=/(facebook\.com)\/([a-z0-9_-]*)\/videos\/([0-9]*)(.*)?$/i;var _transitionEndEvent=function(){var el=document.createElement("div");var transEndEventNames={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var name in transEndEventNames){if(el.style[name]!==undefined){return transEndEventNames[name]}}return false}();function transitionEnd(element){var deferred=_deferred();if(!_transitionEndEvent||!element.length){deferred.resolve()}else{element.one(_transitionEndEvent,deferred.resolve);setTimeout(deferred.resolve,500)}return deferred.promise()}function settings(currSettings,key,value){if(arguments.length===1){return $.extend({},currSettings)}if(typeof key==="string"){if(typeof value==="undefined"){return typeof currSettings[key]==="undefined"?null:currSettings[key]}currSettings[key]=value}else{$.extend(currSettings,key)}return this}function parseQueryParams(params){var pairs=decodeURI(params.split("#")[0]).split("&");var obj={},p;for(var i=0,n=pairs.length;i<n;i++){if(!pairs[i]){continue}p=pairs[i].split("=");obj[p[0]]=p[1]}return obj}function appendQueryParams(url,params){return url+(url.indexOf("?")>-1?"&":"?")+$.param(params)}function transferHash(originalUrl,newUrl){var pos=originalUrl.indexOf("#");if(-1===pos){return newUrl}if(pos>0){originalUrl=originalUrl.substr(pos)}return newUrl+originalUrl}function error(msg){return $('<span class="lity-error"/>').append(msg)}function imageHandler(target,instance){var desc=instance.opener()&&instance.opener().data("lity-desc")||"Image with no description";var img=$('<img src="'+target+'" alt="'+desc+'"/>');var deferred=_deferred();var failed=function(){deferred.reject(error("Failed loading image"))};img.on("load",function(){if(this.naturalWidth===0){return failed()}deferred.resolve(img)}).on("error",failed);return deferred.promise()}imageHandler.test=function(target){return _imageRegexp.test(target)};function inlineHandler(target,instance){var el,placeholder,hasHideClass;try{el=$(target)}catch(e){return false}if(!el.length){return false}placeholder=$('<i style="display:none !important"/>');hasHideClass=el.hasClass("lity-hide");instance.element().one("lity:remove",function(){placeholder.before(el).remove();if(hasHideClass&&!el.closest(".lity-content").length){el.addClass("lity-hide")}});return el.removeClass("lity-hide").after(placeholder)}function youtubeHandler(target){var matches=_youtubeRegex.exec(target);if(!matches){return false}return iframeHandler(transferHash(target,appendQueryParams("https://www.youtube"+(matches[2]||"")+".com/embed/"+matches[4],$.extend({autoplay:1},parseQueryParams(matches[5]||"")))))}function vimeoHandler(target){var matches=_vimeoRegex.exec(target);if(!matches){return false}return iframeHandler(transferHash(target,appendQueryParams("https://player.vimeo.com/video/"+matches[3],$.extend({autoplay:1},parseQueryParams(matches[4]||"")))))}function facebookvideoHandler(target){var matches=_facebookvideoRegex.exec(target);if(!matches){return false}if(0!==target.indexOf("http")){target="https:"+target}return iframeHandler(transferHash(target,appendQueryParams("https://www.facebook.com/plugins/video.php?href="+target,$.extend({autoplay:1},parseQueryParams(matches[4]||"")))))}function googlemapsHandler(target){var matches=_googlemapsRegex.exec(target);if(!matches){return false}return iframeHandler(transferHash(target,appendQueryParams("https://www.google."+matches[3]+"/maps?"+matches[6],{output:matches[6].indexOf("layer=c")>0?"svembed":"embed"})))}function iframeHandler(target){return'<div class="lity-iframe-container"><iframe frameborder="0" allowfullscreen src="'+target+'"/></div>'}function winHeight(){return document.documentElement.clientHeight?document.documentElement.clientHeight:Math.round(_win.height())}function keydown(e){var current=currentInstance();if(!current){return}if(e.keyCode===27&&!!current.options("esc")){current.close()}if(e.keyCode===9){handleTabKey(e,current)}}function handleTabKey(e,instance){var focusableElements=instance.element().find(_focusableElementsSelector);var focusedIndex=focusableElements.index(document.activeElement);if(e.shiftKey&&focusedIndex<=0){focusableElements.get(focusableElements.length-1).focus();e.preventDefault()}else if(!e.shiftKey&&focusedIndex===focusableElements.length-1){focusableElements.get(0).focus();e.preventDefault()}}function resize(){$.each(_instances,function(i,instance){instance.resize()})}function registerInstance(instanceToRegister){if(1===_instances.unshift(instanceToRegister)){_html.addClass("lity-active");_win.on({resize:resize,keydown:keydown})}$("body > *").not(instanceToRegister.element()).addClass("lity-hidden").each(function(){var el=$(this);if(undefined!==el.data(_dataAriaHidden)){return}el.data(_dataAriaHidden,el.attr(_attrAriaHidden)||null)}).attr(_attrAriaHidden,"true")}function removeInstance(instanceToRemove){var show;instanceToRemove.element().attr(_attrAriaHidden,"true");if(1===_instances.length){_html.removeClass("lity-active");_win.off({resize:resize,keydown:keydown})}_instances=$.grep(_instances,function(instance){return instanceToRemove!==instance});if(!!_instances.length){show=_instances[0].element()}else{show=$(".lity-hidden")}show.removeClass("lity-hidden").each(function(){var el=$(this),oldAttr=el.data(_dataAriaHidden);if(!oldAttr){el.removeAttr(_attrAriaHidden)}else{el.attr(_attrAriaHidden,oldAttr)}el.removeData(_dataAriaHidden)})}function currentInstance(){if(0===_instances.length){return null}return _instances[0]}function factory(target,instance,handlers,preferredHandler){var handler="inline",content;var currentHandlers=$.extend({},handlers);if(preferredHandler&&currentHandlers[preferredHandler]){content=currentHandlers[preferredHandler](target,instance);handler=preferredHandler}else{$.each(["inline","iframe"],function(i,name){delete currentHandlers[name];currentHandlers[name]=handlers[name]});$.each(currentHandlers,function(name,currentHandler){if(!currentHandler){return true}if(currentHandler.test&&!currentHandler.test(target,instance)){return true}content=currentHandler(target,instance);if(false!==content){handler=name;return false}})}return{handler:handler,content:content||""}}function Lity(target,options,opener,activeElement){var self=this;var result;var isReady=false;var isClosed=false;var element;var content;options=$.extend({},_defaultOptions,options);element=$(options.template);self.element=function(){return element};self.opener=function(){return opener};self.options=$.proxy(settings,self,options);self.handlers=$.proxy(settings,self,options.handlers);self.resize=function(){if(!isReady||isClosed){return}content.css("max-height",winHeight()+"px").trigger("lity:resize",[self])};self.close=function(){if(!isReady||isClosed){return}isClosed=true;removeInstance(self);var deferred=_deferred();if(activeElement&&(document.activeElement===element[0]||$.contains(element[0],document.activeElement))){try{activeElement.focus()}catch(e){}}content.trigger("lity:close",[self]);element.removeClass("lity-opened").addClass("lity-closed");transitionEnd(content.add(element)).always(function(){content.trigger("lity:remove",[self]);element.remove();element=undefined;deferred.resolve()});return deferred.promise()};result=factory(target,self,options.handlers,options.handler);element.attr(_attrAriaHidden,"false").addClass("lity-loading lity-opened lity-"+result.handler).appendTo("body").focus().on("click","[data-lity-close]",function(e){if($(e.target).is("[data-lity-close]")){self.close()}}).trigger("lity:open",[self]);registerInstance(self);$.when(result.content).always(ready);function ready(result){content=$(result).css("max-height",winHeight()+"px");element.find(".lity-loader").each(function(){var loader=$(this);transitionEnd(loader).always(function(){loader.remove()})});element.removeClass("lity-loading").find(".lity-content").empty().append(content);isReady=true;content.trigger("lity:ready",[self])}}function lity(target,options,opener){if(!target.preventDefault){opener=$(opener)}else{target.preventDefault();opener=$(this);target=opener.data("lity-target")||opener.attr("href")||opener.attr("src")}var instance=new Lity(target,$.extend({},opener.data("lity-options")||opener.data("lity"),options),opener,document.activeElement);if(!target.preventDefault){return instance}}lity.version="2.2.2";lity.options=$.proxy(settings,lity,_defaultOptions);lity.handlers=$.proxy(settings,lity,_defaultOptions.handlers);lity.current=currentInstance;$(document).on("click.lity","[data-lity]",lity);return lity});$(function(){YoutubeDelayed.init();$("#slider").glide({type:"carousel",mode:"vertical",autoplay:3e3,keyboard:false,animationDuration:500,animationTimingFunc:"cubic-bezier(.75,.15,.35,.8)",beforeTransition:function(event){if(event.swipe.distance>0){document.getElementById("slider_progress").className="slider_progress slider_progress--animate-reverse"}else{document.getElementById("slider_progress").className="slider_progress slider_progress--animate"}},afterTransition:function(event){document.getElementById("slider_index").innerHTML='<div class="slider_index-current">'+event.index+"</div>"+'<div class="slider_index-all">/'+event.length+"</div>";document.getElementById("slider_progress").className="slider_progress"},classes:{base:"slider",wrapper:"slider_wrapper",track:"slider_track",slide:"slider_item",arrows:"slider_arrows",arrow:"slider_arrow",arrowNext:"next",arrowPrev:"prev",bullets:"slider_bullets",bullet:"slider_bullet",clone:"clone",active:"active",dragging:"dragging",disabled:"disabled"}});$("#preview").glide({autoplay:2e3,animationDuration:500,keyboard:false,animationTimingFunc:"cubic-bezier(.75,.15,.35,.8)",classes:{base:"slider",wrapper:"slider_wrapper",track:"slider_track",slide:"slider_item",arrows:"slider_arrows",arrow:"slider_arrow",arrowNext:"next",arrowPrev:"prev",bullets:"slider_bullets",bullet:"slider_bullet",clone:"clone",active:"active",dragging:"dragging",disabled:"disabled"}});$("#slider-hero").glide({type:"slideshow",autoplay:3e3,animationDuration:500,keyboard:false,hoverpause:false,animationTimingFunc:"cubic-bezier(.75,.15,.35,.8)",classes:{base:"slider",wrapper:"slider_wrapper",track:"slider_track",slide:"slider_item",arrows:"slider_arrows",arrow:"slider_arrow",arrowNext:"next",arrowPrev:"prev",bullets:"slider_bullets",bullet:"slider_bullet",clone:"clone",active:"active",dragging:"dragging",disabled:"disabled"}});$('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(event){if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var target=$(this.hash);target=target.length?target:$("[name="+this.hash.slice(1)+"]");if(target.length){event.preventDefault();$("html, body").animate({scrollTop:target.offset().top},300,function(){var $target=$(target);$target.focus();if($target.is(":focus")){return false}else{$target.attr("tabindex","-1");$target.focus()}})}}});var formMessage=function(message,type){var $container=$(".form-messages"),content="";if(!message){console.error("You forgot a message");message="Add a message"}if(type=="success"){content+='<div class="form_message form_message-success">'+message+"</div>"}else if(type=="error"){content+='<div class="form_message form_message-error">'+message+"</div>"}else{content+='<div class="form_message form_message-default">'+message+"</div>"}$container.empty().append(content);setTimeout(function(){$container.find(".form_message").addClass("showing")},100)};var formHide=function(){$(".contacts-form_inner").removeClass("hiding").addClass("hidden")};$("#contact-form").submit(function(e){e.preventDefault();var $form=$(this);$.post($form.attr("action"),$form.serialize()).then(function(){formHide();setTimeout(formMessage("We will contact you within the next few hours. Have a great day and talk soon!","success"),200)}).fail(function(){setTimeout(formMessage("There was an error, try to repeat later.","error"),400)})});jQuery(".tabs_link").click(function(e){var target=jQuery(this).data("tab");e.preventDefault();jQuery(".tabs_link").removeClass("tabs_link--active");jQuery(".tabs_content").removeClass("tabs_content--active");jQuery(this).addClass("tabs_link--active");jQuery(target).addClass("tabs_content--active")});var heightEqual=function(elem){var elements=document.getElementsByClassName(elem);var elementHeights=Array.prototype.map.call(elements,el=>{return el.clientHeight});var maxHeight=Math.max(...elementHeights);if(window.innerWidth>748){Array.prototype.forEach.call(elements,el=>el.style.height=`${maxHeight}px`)}};heightEqual("card_top");var tracking=function(params){var trackingOutput=$("#js-tracking_output");$("#js-tracking_submit").click(function(event){event.preventDefault();var trackingInput=$("#js-tracking_input").val().toLowerCase();if(trackingInput.length===8){getData(trackingInput)}else{showError("Wrong tracking number")}});function getData(input){var url="tracking.json";jQuery.ajax({url:url,dataType:"json"}).done(function(data){if(jQuery.isEmptyObject(data)){showError("Wrong tracking number")}else{setData(data)}}).fail(function(xhr,error){showError("Sending form error")})}function showLoading(isLoading){if(isLoading){trackingOutput.html('<div class="tracking_loading"></div>')}else{trackingOutput.html("")}}function showError(err){let output='<div class="form_message form_message-error showing">'+err+"</div>";trackingOutput.html(output)}function setData(data){let output="";output='<div class="tracking_title">Tracking Number</div><div class="tracking_value">'+data.title+"</div>";output+='<div class="tracking_title">Delivery date</div><div class="tracking_o-value">'+data.date+"</div>";output+='<div class="tracking_title">Invoice Total</div><div class="tracking_value">'+data.total+'<span class="currency-sign"> ₽</span></div>';output+='<div class="tracking_title">Status</div><div class="tracking_value">'+data.status+"</div>";output+='<div class="tracking_title">Notes</div><div class="tracking_value">'+data.note+"</div>";trackingOutput.html(output)}}();jQuery(".collapse_btn").click(function(e){jQuery(this).toggleClass("collapse_btn--is-open");var target=jQuery(this).data("target");jQuery(target).toggle()});$(".js-menu-toggle").click(function(e){e.preventDefault();var target=$(this).data("target");var isVisible=$(target).css("z-index")=="-1";if(!isVisible){$(target).removeClass("main-menu--is-active")}else{$(target).addClass("main-menu--is-active")}})});