document.addEventListener("DOMContentLoaded", function(event){ 
//определяем переменные плеера
v_spot = '#vvayer'; //id or class объекта в котором будет размещен плеер
v_store = ''; //path to trailer hranilische
v_form = vt_player[0]; //format trailer
v_tral = vt_player[1]; //trailer identificator
v_pl = document.querySelector(v_spot);//container player
_player();

v_hu = document.querySelector("#v_hud"); //hud
v_play = document.querySelector("#pl_ps"); //button play
v_olum = document.querySelector("#pl_voi"); //button volume
v_olus = document.querySelector("#pl_voj"); //button volume dop
v_gres = document.querySelector("#pl_prog"); //progress bar
v_hd = document.querySelector("#tm_full"); //progress bar
vinis = document.querySelector("video"); //progress bar


if(v_pl){
	v_pl.addEventListener('mouseenter', e => {_hover();});
	v_pl.addEventListener('mouseleave', e => {_dehover();});
}
if(vinis){
	v_olum.addEventListener('click', e => {_volplus();});
	v_olus.addEventListener('mouseleave', e => {_volmin();});
	v_play.addEventListener('click', e => {_play();}); //play
	v_hd.addEventListener('click', e => {_fullhd();}); //full screen
}

function _player(){//постсроение плеера
	v_pl.innerHTML = "<video></video>";
	v_cont = v_pl.querySelector('video');
	v_cont.setAttribute("style", "width:100%;");
	v_cont.setAttribute("src", v_store+v_tral+"."+v_form);
	v_pl.insertAdjacentHTML("beforeend","<div id='v_hud' style='padding:0px;margin:0px;margin-top:-80px;position:absolute;display:none;width:700px;'><div style='margin:0px 10px;'><div id='pr_bar' style='height:30px;width:100%;box-shadow:0 0 2px;'><div style='padding:6px 6px;'><progress id='pl_prog' style='width:100%;' value='0' max='100'></progress></div></div><div style='padding:0px;margin:0px;display:flex;height:30px;width:100%;flex-wrap:wrap;'><div style='width:50%;display:flex;justify-content:flex-start;'><div id='pl_ps' style='height:30px;width:30px;box-shadow:0 0 2px;'><img style='width:25px;padding:2px 4px;' src='ico/play1.png'></div><div id='pl_voi' style='height:30px;width:40px;box-shadow:0 0 2px;'><img style='width:25px;padding:3px 8px;' src='ico/volume1.png'></div><div id='pl_voj' style='height:30px;width:110px;box-shadow:0 0 2px;display:none;'><input style='width:100px;margin:7px 0px;' type='range' value='100' max='100'></div><div id='tm_code' style='height:30px;width:110px;box-shadow:0 0 2px;'><div style='padding:6px 4px;color:#fff;font-weight:600;'>00:00 / 00:00 </div></div></div><div style='width:50%;display:flex;justify-content:flex-end;'><div id='tm_full' style='height:30px;width:45px;box-shadow:0 0 2px;'><div><img style='width:25px;padding:3px 10px;' src='ico/fullscreen1.png'></div></div></div></div></div></div>"); //dobavlyaem controlleri  dlya pleera
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
	setTimeout(function func(){v_olus.style.display = 'none';}, 500);
}
function _play(){//скрываем худ плеера через 2 секунды
	alert('Play bitch!');
	//меняем иконку на уменьшение экрана
	
}
function _fullhd(){//скрываем худ плеера через 2 секунды
	alert('Full Screen bitch!');
	//меняем иконку на уменьшение экрана
	
}
});