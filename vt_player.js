document.addEventListener("DOMContentLoaded", function(event){ 
//определяем переменные плеера
v_spot = '#vvayer'; //id or class объекта в котором будет размещен плеер
v_store = ''; //path to trailer hranilische
v_form = vt_player[0]; //format trailer
v_tral = vt_player[1]; //trailer identificator
vi_drag = false;
v_pl = document.querySelector(v_spot);//container player
_player();

v_vid = document.querySelector(".vplayer"); //player
v_hu = document.querySelector("#v_hud"); //hud
v_play = document.querySelector("#pl_ps"); //button play
v_olum = document.querySelector("#pl_voi"); //button volume
v_olus = document.querySelector("#pl_voj"); //dop forma volume
v_oluk = document.querySelector("#pl_vok"); //input volume
v_gres = document.querySelector("#pl_prog"); //progress bar
v_hd = document.querySelector("#tm_full"); //full window
v_time = document.querySelector(".durationTime"); //time video
v_cime = document.querySelector(".currTime"); //time video
v_pols = document.querySelector("#carage"); //каретка звука
v_fot = document.querySelector("#pr_carfo"); //контейнер прогресс бара
v_pc = document.querySelector("#pr_carvi"); //каретка прогресс бара

if(v_pl){
	v_pl.addEventListener('mouseenter', e => {_hover();});
	v_pl.addEventListener('mouseleave', e => {_dehover();});
}
if(v_vid){
	v_olum.addEventListener('click', e => {_volplus();});
	v_olus.addEventListener('mouseleave', e => {_volmin();});
	v_olus.addEventListener('mousemove', e => {volumeVisMove(e);});
	v_play.addEventListener('click', e => {_play();}); //play
	v_hd.addEventListener('click', e => {_fullhd();}); //full screen
	v_vid.addEventListener('timeupdate',videoProgress);
	v_gres.addEventListener('click',videoChangeTime);
	v_pols.addEventListener('mousedown',e => {volumeVisChange(e);});//slide volume on
	document.addEventListener('mouseup',e => {volumeVisFix(e);});//slide volume off
	v_pc.addEventListener('click',e => {volumeVisChange(e);});//karetka on
	v_fot.addEventListener('mousemove',e => {volumeVisProgMove(e);});//form karetka video
}


function _player(){//постсроение плеера
	v_pl.innerHTML = "<video></video>";
	v_cont = v_pl.querySelector('video');
	v_cont.setAttribute("preload", "metadata");//предзагрузка видео
	v_cont.setAttribute("autoplay","autoplay");//автозапуск видео
	v_cont.setAttribute("style", "width:100%;");
	v_cont.setAttribute("class", "vplayer");
	v_cont.setAttribute("src", v_store+v_tral+"."+v_form);
	v_pl.insertAdjacentHTML("beforeend","<div id='v_hud' style='padding:0px;margin:0px;margin-top:-80px;position:absolute;display:none;width:700px;'><div style='margin:0px 10px;'><div id='pr_bar' style='height:30px;width:100%;'><div style='padding:6px 6px;'><progress id='pl_prog' style='width:100%;display:none;' value='0' max='100'></progress><div style='padding-top:6px;position:relative;'><div style='width:100%;height:2px;background-color:#fff;' id='pr_carfo'></div><div style='width:12px;height:12px;background-color:#fff;border-radius:16px;margin:-7px 0px;left:0px;position:absolute;' id='pr_carvi'></div></div></div></div><div style='padding:0px;margin:0px;display:flex;height:30px;width:100%;flex-wrap:wrap;'><div style='width:50%;display:flex;justify-content:flex-start;'><div id='pl_ps' style='height:30px;width:30px;'><img style='width:25px;padding:2px 4px;' src='ico/play1.png'></div><div id='pl_voi' style='height:30px;width:40px;'><img style='width:25px;padding:3px 8px;' src='ico/volume1.png'></div><div id='pl_voj' style='height:30px;width:110px;display:none;padding:10px;'><input style='width:100px;margin:7px 0px;display:none;' type='range' value='100' max='100' id='pl_vok'><div style='position:relative;margin:4px 0px;'><div style='height:2px;width:100px;background-color:#fff;'></div><div style='width:12px;height:12px;background-color:#fff;position:absolute;margin:-7px 0px;border-radius:9px;left:88px;' id='carage'></div></div></div><div id='tm_code' style='height:30px;width:110px;'><div style='padding:6px 4px;color:#fff;font-weight:600;'><span class='currTime'>00:00</span> / <span class='durationTime'>00:00</span></div></div></div><div style='width:50%;display:flex;justify-content:flex-end;'><div id='tm_full' style='height:30px;width:45px;'><div><img style='width:25px;padding:3px 10px;' src='ico/fullscreen1.png'></div></div></div></div></div></div>"); 
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
	if(v_time.innerHTML == '00:00'){//надо найти способ получать длительность при загрузке страницы
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
	//разворачиваем экран на весь экран
}
function volumeVisMove(e){
	if(!vi_drag){
		return;
	}else{
		/*
		проблема в том, что сейчас плеер находится с краю, но стоит его сдвинуть в сторону, то весь отсчет, т.е. cordx пойдет по одному месту. А значит, координаты центра надо высчитывать, относительно края страницы.
		отсюда 
		104 - высчитываем координату начала полоски звука
		192 - высчитываем конец полоски звука это начало + 88рх, т.е. длинна звуковой полоски
		*/
		cordx = 192;
		nowCord = e.pageX;
		if(nowCord>=104 && nowCord<=192){
			bat = 88 - (cordx - nowCord);
			v_pols.style.left = bat+'px';
			//console.log(bat);
			//меняем звук
			valvol = (bat*100)/88;
			var volume = Math.round(valvol) / 100;
			v_vid.volume = volume;
			//console.log(volume);
		}
	}
}
function volumeVisProgMove(e){//перематываем клип
	if(!vi_drag){
		return;
	}else{
		//prCordX = e.pageX; //32 ; 24-36px
		//console.log(prCordX); min=0, max=656
		/*
		corfx = 0;
		prCordX = e.pageX;
		if(prCordX>=0 && prCordX<=656){
			bat = 656 - (corfx - prCordX);
			v_pols.style.left = bat+'px';
			//console.log(bat);
			//меняем звук
			valvol = (bat*100)/88;
			var volume = Math.round(valvol) / 100;
			v_vid.volume = volume;
			//console.log(volume);
		}
		*/
	}
}
function volumeVisChange(e){//начинаем двигать ползунок
	vi_drag = true;
}
function volumeVisFix(e){ //заканчиваем двигать ползунок
	vi_drag = false;
}

function videoProgress(){ //Отображаем время воспроизведения
	progress = (Math.floor(v_vid.currentTime) / (Math.floor(v_vid.duration) / 100));
	console.log(v_vid.duration);
	console.log(v_vid.currentTime);
	v_pc.style.left = (v_vid.currentTime*656)/v_vid.duration +'px'; //
	//надо добавить if чтобы не выходила каретка за пределы линии и плюс в конце, если достигнут конец, то останавливать видео и менять иконку и состояние плеера на паузу
	// убрать прогресс бар
	v_gres.value = progress;//перепосчитать
	v_cime.innerHTML = videoTime(v_vid.currentTime);
}
function videoChangeTime(e){ //Перематываем
	var mouseX = Math.floor(e.pageX - v_gres.offsetLeft);
	var progress = mouseX / (v_gres.offsetWidth / 100);
	v_vid.currentTime = v_vid.duration * (progress / 100);
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
});