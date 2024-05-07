# Video Player
![Снимок экрана 2024-05-07 194513](https://github.com/binamelato/video-player/assets/22084187/a66594b5-6f5d-46bf-bb88-808a6b081d55)


This is simple video player for a website in vanilla javascript, without using third-party plugins. It can be easily integrated into a website of any complexity and for any task.


## How to use:

***1. Place the block for video player in the place you need***
```
<div id='vvayer'></div>
```

***2. Connect the vt_player.js before closing the tag <body>***
```
<script type='text/javascript' src='vt_player.js'></script>
</body>
```

***3. Connect the player.css in the tag <head>***
```
<link rel="stylesheet" href="player.css" />
```
***4. The data for the script can be obtained from any source (for example: from a database). You just need to form an array of them of the form:***
```
<script>
// all data select from db (msql or other)
vt_player = ['mp4','cp2077','Name video. Announce.', 700];
</script>
```

***5. Settings player***
Path to trailers folder
```
v_store = '';
```

```
v_form = vt_player[0];  //format trailer
v_tral = vt_player[1];  //video identificator
v_name = vt_player[2];  //video name
v_width = vt_player[3]; //size player container
```

***6. If you need help, see the example***

## Preview
![Снимок экрана 2024-05-07 192754](https://github.com/binamelato/video-player/assets/22084187/c2337326-7f3f-4c9e-8c73-73bef7b37740)



