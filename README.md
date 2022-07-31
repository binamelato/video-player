# Video Player
This is my simple video player for a website in vanilla javascript, without using third-party plugins.

## How to use:

***1. Place the block for images gallery in the place you need***
```
<div id='vvayer' style='box-shadow:0 0 3px #000;width:700px;'></div>
```

***2. Connect the galgam.js before closing the tag <body>***
```
<script type='text/javascript' src='vt_player.js'></script>
</body>
```

***3. Connect the gal.css in the tag <head>***
```
<link rel="stylesheet" href="player.css" />
```
***4. The script works with data selected from the database. We specify them before connecting the script***
```
<script>
// all data select from db (msql or other)
vt_player = ['mp4','cp2077'];
</script>
```

***5. Settings player***
Path to trailers folder
```
v_store = '';
```

```
v_form = vt_player[0]; //format trailer
v_tral = vt_player[1]; //trailer identificator
```

***6. Шf you need help, see the example***


## Preview
