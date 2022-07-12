document.addEventListener("DOMContentLoaded", function(event){ 
//определяем переменные плеера
v_spot = '#vvayer'; //id or class объекта в котором будет размещен плеер
v_store = ''; //path to trailer hranilische
v_form = vv_player[0]; //format trailer
v_tral = vv_player[1]; //trailer identificator
//строим плеер в нужном месте
pint = '';
vv_player(pint);

function vv_player(pint){//постсроение плеера
	v_pl = document.querySelector(v_spot);
	v_cont = document.createElement("video");//sozdaem element video
	v_cont.setAttribute("src", v_store+v_tral+"."+v_form);
	v_cont.append(); //dobavlyaem controlleri  dlya pleera
}
//обработка событий плеера
function pl_trailer(pint){
	pl_vid.style.display = 'block';
	//делаем здесь плеер ,а не подгружаем заранее
}
});