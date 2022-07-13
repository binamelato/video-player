document.addEventListener("DOMContentLoaded", function(event){ 
//определяем переменные плеера
v_spot = '#vvayer'; //id or class объекта в котором будет размещен плеер
v_store = ''; //path to trailer hranilische
v_form = vt_player[0]; //format trailer
v_tral = vt_player[1]; //trailer identificator
v_pl = document.querySelector(v_spot);//container player
_player();

v_vid = document.querySelector(".vplayer"); //player
v_hu = document.querySelector("#v_hud"); //hud
v_play = document.querySelector("#pl_ps"); //button play
v_olum = document.querySelector("#pl_voi"); //button volume
v_olus = document.querySelector("#pl_voj"); //button volume pan
v_oluk = document.querySelector("#pl_vok"); //button volume pan
v_gres = document.querySelector("#pl_prog"); //progress bar
v_hd = document.querySelector("#tm_full"); //full window
//vinis = document.querySelector("video"); //progress bar
v_time = document.querySelector(".durationTime"); //time video
v_cime = document.querySelector(".currTime"); //time video


if(v_pl){
	v_pl.addEventListener('mouseenter', e => {_hover();});
	v_pl.addEventListener('mouseleave', e => {_dehover();});
}
if(v_vid){
	v_olum.addEventListener('click', e => {_volplus();});
	v_olus.addEventListener('mouseleave', e => {_volmin();});
	v_olus.addEventListener('change',videoChangeVolume);
	v_play.addEventListener('click', e => {_play();}); //play
	v_hd.addEventListener('click', e => {_fullhd();}); //full screen
	v_vid.addEventListener('timeupdate',videoProgress);
	v_gres.addEventListener('click',videoChangeTime);
}


function _player(){//постсроение плеера
	v_pl.innerHTML = "<video></video>";
	v_cont = v_pl.querySelector('video');
	v_cont.setAttribute("preload", "auto");//предзагрузка видео
	v_cont.setAttribute("autoplay","autoplay");//автозапуск видео
	v_cont.setAttribute("style", "width:100%;");
	v_cont.setAttribute("class", "vplayer");
	v_cont.setAttribute("src", v_store+v_tral+"."+v_form);
	v_pl.insertAdjacentHTML("beforeend","<div id='v_hud' style='padding:0px;margin:0px;margin-top:-80px;position:absolute;display:none;width:700px;'><div style='margin:0px 10px;'><div id='pr_bar' style='height:30px;width:100%;'><div style='padding:6px 6px;'><progress id='pl_prog' style='width:100%;' value='0' max='100'></progress></div></div><div style='padding:0px;margin:0px;display:flex;height:30px;width:100%;flex-wrap:wrap;'><div style='width:50%;display:flex;justify-content:flex-start;'><div id='pl_ps' style='height:30px;width:30px;'><img style='width:25px;padding:2px 4px;' src='ico/play1.png'></div><div id='pl_voi' style='height:30px;width:40px;'><img style='width:25px;padding:3px 8px;' src='ico/volume1.png'></div><div id='pl_voj' style='height:30px;width:110px;display:none;'><input style='width:100px;margin:7px 0px;' type='range' value='100' max='100' id='pl_vok'></div><div id='tm_code' style='height:30px;width:110px;'><div style='padding:6px 4px;color:#fff;font-weight:600;'><span class='currTime'>00:00</span> / <span class='durationTime'>00:00</span></div></div></div><div style='width:50%;display:flex;justify-content:flex-end;'><div id='tm_full' style='height:30px;width:45px;'><div><img style='width:25px;padding:3px 10px;' src='ico/fullscreen1.png'></div></div></div></div></div></div>"); 
}

function _hover(){ //отображаем худ плеера
	v_hu.style.display = 'block';
}
function _dehover(){//скрываем худ плеера через 2 секунды
	//setTimeout(function back(){v_hu.style.display = 'none';}, 2000);
}
function _volplus(){ //отображаем худ плеера
	v_olus.style.display = 'block';
}
function _volmin(){//скрываем худ плеера через 2 секунды
	setTimeout(function func(){v_olus.style.display = 'none';}, 200);
}
function _play(){//
	//alert('Play bitch!');
	//меняем иконку на паузу
	cn_pl = v_play.classList.toggle('play');
	if(cn_pl){
		var check_im = v_play.querySelector('img').setAttribute('src','ico/pause1.png');
		v_vid.play();
	}else{
		var check_im = v_play.querySelector('img').setAttribute('src','ico/play1.png');
		v_vid.pause();
	}
	if(v_time.innerHTML == '00:00') {
		v_time.innerHTML = videoTime(v_vid.duration); 
	}
}
function _fullhd(){//
	//alert('Full Screen bitch!');
	//меняем иконку на уменьшение экрана
	cn_fm = v_hd.classList.toggle('full');
	if(cn_fm){
		var check_im = v_hd.querySelector('img').setAttribute('src','ico/fullscreen2.png');
	}else{
		var check_im = v_hd.querySelector('img').setAttribute('src','ico/fullscreen1.png');
	}
}

function videoTime(time) { //Рассчитываем время в секундах и минутах
	time = Math.floor(time);
	var minutes = Math.floor(time / 60);
	var seconds = Math.floor(time - minutes * 60);
	var minutesVal = minutes;
	var secondsVal = seconds;
	if(minutes < 10) {
	minutesVal = '0' + minutes;
	}
	if(seconds < 10) {
	secondsVal = '0' + seconds;
	}
	return minutesVal + ':' + secondsVal;
}
function videoProgress(){ //Отображаем время воспроизведения
	progress = (Math.floor(v_vid.currentTime) / (Math.floor(v_vid.duration) / 100));
	v_gres.value = progress;
	v_cime.innerHTML = videoTime(v_vid.currentTime);
}
function videoChangeTime(e){ //Перематываем
	var mouseX = Math.floor(e.pageX - v_gres.offsetLeft);
	var progress = mouseX / (v_gres.offsetWidth / 100);
	v_vid.currentTime = v_vid.duration * (progress / 100);
}
function videoChangeVolume() { //Меняем громкость
	var volume = v_oluk.value / 100;
	v_vid.volume = volume;
}
});