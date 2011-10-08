function setValue(key,value) 
{
	localStorage[key] = value;
}
function getValue(key) 
{
	return localStorage.getItem(key);
}	

var defaults = {
  'options.dial.columns':'3',
  'options.dial.dialspacing':'24',
  'options.dial.space':'90',
  'options.dial.centerVertically':'1',
  //'options.dial.defaultGroupName':'home',
  'options.dial.showTitle':'1',
  'options.dial.alwaysNewTab':'0',
  'options.dial.titlePosition':'inside',

  'options.dial.style.round':'4',
  'options.dial.style.padding':'4',
  'options.dial.style.shadow':'1',
  'options.dial.style.title.align':'left',
  'options.dial.style.title.face':'Helvetica, Helvetica Neue, Arial, Verdana',
  'options.dial.style.title.weight':'bold',
  'options.dial.style.title.style':'normal',
  'options.dial.style.title.size':'14',
  'options.dial.style.colors.bg':'FFFFFF',
  'options.dial.style.colors.bgover':'FFFFFF',
  'options.dial.style.colors.bginner':'FFFFFF',
  'options.dial.style.colors.bginnerover':'FFFFFF',
  'options.dial.style.colors.border':'CCCCCC',
  'options.dial.style.colors.borderover':'999999',
  'options.dial.style.colors.title':'777777',
  'options.dial.style.colors.titleover':'333333',

  'options.background.url':'http://farm6.static.flickr.com/5022/5565048623_7300cd271a_o.png',
  'options.background.color':'D9D9D9',
  'options.background.repeat':'repeat-x',
  'options.background.position':'left top',
}

// apply defaults
for (value in defaults) 
{
  if (!getValue(value)) {
    setValue(value,defaults[value])
  }
}
