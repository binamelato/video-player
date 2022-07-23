document.addEventListener("DOMContentLoaded", function(event){ 
//определяем переменные плеера
v_spot = '#vvayer'; //id or class объекта в котором будет размещен плеер
v_store = ''; //path to trailer hranilische
v_form = vt_player[0]; //format trailer
v_tral = vt_player[1]; //trailer identificator
vi_drag = false;
vi_dd = 0;
v_pl = document.querySelector(v_spot);//container player
_player();


v_vid = document.querySelector(".vplayer"); //player
v_hu = document.querySelector("#v_hud"); //hud
v_kn = document.querySelector(".kn"); //hud
v_play = document.querySelector("#pl_ps"); //button play
v_olum = document.querySelector("#pl_voi"); //button volume
v_olus = document.querySelector("#pl_voj"); //dop forma volume
v_hd = document.querySelector("#tm_full"); //full window
v_time = document.querySelector(".durationTime"); //time video
v_cime = document.querySelector(".currTime"); //time video
v_oluk = document.querySelector("#pl_vok"); //line volume controls
v_pols = document.querySelector("#carage"); //каретка звука
v_fot = document.querySelector("#pr_carfo"); //контейнер прогресс бара
v_pc = document.querySelector("#pr_carvi"); //каретка прогресс бара


if(v_pl){
	v_pl.addEventListener('mouseenter', e => {_hover();}); 
	v_pl.addEventListener('mouseleave', e => {_dehover();});
	document.addEventListener('fullscreenchange', e => {keyPress(e);});
	//v_pl.addEventListener('click', e => {_play();});//иконка в центре плеера, мб
}
if(v_vid){
	v_olum.addEventListener('click', e => {_volplus();});
	v_olus.addEventListener('mouseleave', e => {_volmin();});
	v_olus.addEventListener('mousemove', e => {volumeVisMove(e);});
	v_play.addEventListener('click', e => {_play();}); //play
	v_hd.addEventListener('click', e => {_fullhd();}); //full screen
	v_vid.addEventListener('timeupdate',videoProgress);
	v_fot.addEventListener('click',videoChangeTime);
	v_oluk.addEventListener('click', e => {videoChangeVolum(e);});//change vol by click
	v_pols.addEventListener('mousedown', e => {volumeVisChange(e);});//slide volume on
	document.addEventListener('mouseup', e => {volumeVisFix(e);});//slide volume off
	v_pc.addEventListener('click', e => {volumeVisChange(e);});//karetka on
}

function _player(){	//постсроение плеера
	v_pl.innerHTML = "<video></video>";
	v_cont = v_pl.querySelector('video');
	v_cont.setAttribute("preload", "metadata");//предзагрузка видео
	v_cont.setAttribute("autoplay","autoplay");//автозапуск видео
	v_cont.setAttribute("style", "width:100%;");
	v_cont.setAttribute("class", "vplayer");
	v_cont.setAttribute("src", v_store+v_tral+"."+v_form);
	v_pl.insertAdjacentHTML("beforeend","<div id='v_hud'><div class='kn'><div id='pr_bar'><div class='bz'><div class='vt'><div id='pr_carfo'></div><div id='pr_carvi'></div></div></div></div><div class='kx'><div class='rt'><div id='pl_ps'><img src='ico/play1.png'></div><div id='pl_voi'><img src='ico/volume1.png'></div><div id='pl_voj'><div class='lx'><div id='pl_vok'></div><div id='carage'></div></div></div><div id='tm_code'><div class='tc'><span class='currTime'>00:00</span> / <span class='durationTime'>00:00</span></div></div></div><div class='ss'><div id='tm_full'><div id='ftsc'><img src='ico/fullscreen1.png'></div></div></div></div></div></div>"); 
}
function _option(){
	//размер контролов круглых
	dp_control = 12;
	//радиус контролов
	dp2_control = dp_control / 2; //6
	prog_otX = getCoords(v_fot); //24px
	vaLength = prog_otX[1] - prog_otX[0] - dp_control; //длинна полосы 656
	prom_otX = getCoords(v_oluk); //98px
	veLength = prom_otX[1] - prom_otX[0] - dp_control; //длинна полосы 88
}

function _hover(){ //отображаем худ плеера
	v_kn.style.display = 'block';
	_option();
	if(v_time.innerHTML == '00:00'){ //NaN:NaN
		v_time.innerHTML = videoTime(v_vid.duration); 
	}
}
function _dehover(){//скрываем худ плеера через 4 секунды
	//нужно проверять на любую активность курсора, если ее нет запускать таймер
	setTimeout(function back(){v_kn.style.display = 'none';}, 5000); //таймер наверх
}
function _volplus(){ //отображаем полосу звука
	v_olus.style.display = 'block';
	_option();
}
function _volmin(){//скрываем худ плеера через 2 секунды
	setTimeout(function func(){v_olus.style.display = 'none';}, 1000);//таймер наверх
}
function _play(){
	cn_pl = v_play.classList.toggle('play');
	if(cn_pl){
		var check_im = v_play.querySelector('img').setAttribute('src','ico/pause1.png');
		v_vid.play();
	}else{
		var check_im = v_play.querySelector('img').setAttribute('src','ico/play1.png');
		v_vid.pause();
	}
}
function _fullhd(){
	cn_fm = v_hd.classList.toggle('full');
	if(cn_fm){
		var check_im = v_hd.querySelector('img').setAttribute('src','ico/fullscreen2.png');
		_fullscreen();
	}else{
		var check_im = v_hd.querySelector('img').setAttribute('src','ico/fullscreen1.png');
		_endfullscreen();
	}
}
function volumeVisMove(e){
	if(!vi_drag){
		return;
	}else{
		cordx = prom_otX[1] - dp2_control;
		ncordx = prom_otX[0] + dp2_control;
		nowCord = e.pageX;
		if(nowCord>=ncordx && nowCord<=cordx){
			bat = veLength - (cordx - nowCord);
			v_pols.style.left = bat+'px';
			//меняем звук
			valvol = (bat*100)/veLength;
			var volume = Math.round(valvol) / 100;
			v_vid.volume = volume;
		}
	}
}
function volumeVisChange(e){//начинаем двигать ползунок
	vi_drag = true;
}
function volumeVisFix(e){ //заканчиваем двигать ползунок
	vi_drag = false;
}
function videoProgress(){ //Отображаем время воспроизведения
	_option();
	var tempVal = (v_vid.currentTime*vaLength)/v_vid.duration;
	if(tempVal.toFixed(0) == vaLength){
		var check_im = v_play.querySelector('img').setAttribute('src','ico/play1.png');
		v_vid.pause();
	}
	v_pc.style.left = tempVal +'px'; //
	var progba = ((tempVal.toFixed(1) + dp2_control)*100/vaLength).toFixed(1);
	v_cime.innerHTML = videoTime(v_vid.currentTime);
	v_fot.style.background = 'linear-gradient(to right, red '+progba+'%, white 0%)';
}
function videoChangeTime(e){ //Перематываем
	_option();
	var mouseX = Math.floor(e.pageX - prog_otX[0]);
	v_vid.currentTime = v_vid.duration * (mouseX / vaLength);
	var progbe = ((mouseX+dp2_control)*100) / vaLength;
	var dn_pl = v_play.classList.contains('play');
	if(!dn_pl){
		v_play.classList.add('play');
	}
	var check_im = v_play.querySelector('img').setAttribute('src','ico/pause1.png');
	v_fot.style.background = 'linear-gradient(to right, red '+progbe.toFixed(1)+'%, white 0%)';
	v_vid.play();
}
function videoChangeVolum(e){ //Перематываем звук
	var mouseDX = Math.floor(e.pageX - prom_otX[0]);
	vavol = (mouseDX*100)/veLength;
	var volume = Math.round(vavol) / 100;
	v_vid.volume = volume;
	v_pols.style.left = (mouseDX-dp2_control)+'px';
}
function _fullscreen(){
	if (v_pl.requestFullscreen){
		v_pl.requestFullscreen();
	}else if (v_pl.mozRequestFullScreen){
		v_pl.mozRequestFullScreen();
	}else if (v_pl.webkitRequestFullscreen){
		v_pl.webkitRequestFullscreen();
	}else if (v_pl.msRequestFullscreen){
		v_pl.msRequestFullscreen();
	}else{v_pl.classList.toggle("fullscreen");
	}
	videoProgress();
}
function _endfullscreen(){
	if (document._endfullscreen) {
		document._endfullscreen();
	} else if (document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	} else if (document.webkitExitFullscreen) {
		document.webkitExitFullscreen();
	}
	videoProgress(); 
}
function keyPress(e){
	_option();
	var tempVal = (v_vid.currentTime*vaLength)/v_vid.duration;
	v_pc.style.left = tempVal +'px'; //
    if(vi_dd != 0){
		vi_dd = vi_dd - 1;
		v_hd.querySelector('img').setAttribute('src','ico/fullscreen1.png');
		v_hd.classList.remove('full');
    }else{
		vi_dd = vi_dd + 1;
	}
}
function videoTime(time){ //Рассчитываем время в секундах и минутах
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
function getCoords(elem){
	var box = elem.getBoundingClientRect();
	mass = [box.left, box.right];
	return mass;
}
});