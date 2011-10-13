document.write('<style type="text/css">');

if (getValue('options.background.color'))
    document.write('html {background-color:#'+getValue('options.background.color')+';}');
if (getValue('options.background.url'))
    document.write('body {background:none; background-image:url('+getValue('options.background.url')+');}');
if (getValue('options.background.repeat'))
    document.write('body {background-repeat:'+getValue('options.background.repeat')+';}');
if (getValue('options.background.position'))
    document.write('body {background-position:'+getValue('options.background.position')+';}');

if (getValue('options.dial.style.round')) {
    document.write('#pages li a {border-radius:'+getValue('options.dial.style.round')+'px;}');
    document.write('#pages li .thumbnail_container {border-radius:'+(getValue('options.dial.style.round')-2)+'px '+(getValue('options.dial.style.round')-2)+'px 0 0; }');  
}

if (getValue('options.dial.style.shadow') == '1') 
    document.write('#pages li a {box-shadow: 0px 4px 4px rgba(0, 0, 0, .6);}');

if (getValue('options.dial.style.title.face'))
    document.write('.link {font-family:'+getValue('options.dial.style.title.face')+', sans-serif;}');
if (getValue('options.dial.style.title.size'))
    document.write('.link .title {font-size:'+getValue('options.dial.style.title.size')+'px;}');
if (getValue('options.dial.style.title.style'))
    document.write('.link .title {font-style:'+getValue('options.dial.style.title.style')+';}');
if (getValue('options.dial.style.title.weight'))
    document.write('.link .title {font-weight:'+getValue('options.dial.style.title.weight')+';}');
if (getValue('options.dial.style.title.align')) {
    switch(getValue('options.dial.style.title.align')) {
        case 'center':
            document.write('.link .title {text-align:center}');
            break;
        case 'right':
            document.write('.link .title {text-align:right}');
            break;
        default:
            break;
    }
}

if (getValue('options.dial.style.colors.bg'))
    document.write('#pages li a {background:#'+getValue('options.dial.style.colors.bg')+'}');
if (getValue('options.dial.style.colors.bgover'))
    document.write('#pages li:hover a {background:#'+getValue('options.dial.style.colors.bgover')+'}');
if (getValue('options.dial.style.colors.bginner'))
    document.write('.thumbnail_container {background:#'+getValue('options.dial.style.colors.bginner')+'}');
if (getValue('options.dial.style.colors.bginnerover'))
    document.write('#pages li a:hover .thumbnail_container {background:#' +getValue('options.dial.style.colors.bginnerover')+'}');
if (getValue('options.dial.style.colors.border'))
    document.write('#pages li a {border-color:#'+getValue('options.dial.style.colors.border')+'}');
if (getValue('options.dial.style.colors.borderover'))
    document.write('#pages li:hover a {border-color:#'+getValue('options.dial.style.colors.borderover')+'}');
if (getValue('options.dial.style.colors.title'))
    document.write('.link .title {color: #' +getValue('options.dial.style.colors.title')+'}');
if (getValue('options.dial.style.colors.titleover'))
    document.write('.link:hover .title {color: #' +getValue('options.dial.style.colors.titleover')+'}');

if ( getValue('options.customCss') && getValue('options.customCss')!='null' ) 
    document.write(getValue('options.customCss'));

document.write('<\/style>');
