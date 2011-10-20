// USER SETTINGS

function layoutDials()
{

    // prepare elements
    var row, position;
    var container = document.getElementById('pages');
    container.innerHTML = '';
    var dials = (getValue('dials')) ? JSON.parse(getValue('dials')) : new Array();
    
    // title height      
    var TITLE = 24;
    // number of cols
    var COLS = getValue('options.dial.columns');
    // number of rows
    var ROWS = Math.ceil(dials.length/COLS);
    // custom spacing
    var SPACING = parseInt(getValue('options.dial.dialspacing'));
    // custom padding
    var PADDING = parseInt(getValue('options.dial.style.padding'));
    // custom zoom ?
    var WIDTHMODIFIER = ( parseInt(getValue('options.dial.space'))>0 ) ? ( getValue('options.dial.space') / 100 ) : 0.9;
    // screen dimensions
    var WINDOW_WIDTH  = window.screen.width;
    var WINDOW_HEIGHT = window.screen.height;
    var WINDOW_INNER_WIDTH  = window.innerWidth;
    // avail space
    var SPACE = window.innerHeight - 15;
    // thumbnail ration (screen capture taken by Chrome should have this ratio)
    var RATIO = WINDOW_HEIGHT / WINDOW_WIDTH;
    // 
    var RATIO_MODIFIED = false;

    var CONTAINER_TOP = 0;

    // maximized Chrome inner window ratio
    if (RATIO < 0.55) { RATIO = 0.55; RATIO_MODIFIED = true }
    if (RATIO > 0.65) { RATIO = 0.65; }

    var DIALSPACE = WIDTHMODIFIER * WINDOW_INNER_WIDTH;
    var DIALWIDTH = ( DIALSPACE - ( (COLS) * SPACING ) )  / COLS;
    if (DIALWIDTH>360) DIALWIDTH = 360;

    var DIALHEIGHT = ( DIALWIDTH * RATIO );

    // show title
    if (getValue('options.dial.showTitle')!=1) { 
        TITLE = PADDING + 2;
    }

    var RESIZEDDIALS = false;

    if ( ( ROWS * (DIALHEIGHT+SPACING+PADDING+TITLE) ) > SPACE  ) {
        RESIZEDDIALS = true;
        DIALHEIGHT = ( SPACE - ( ROWS * ( SPACING+PADDING+TITLE ) ) ) / ROWS;
        DIALWIDTH = DIALHEIGHT / RATIO; 
    }

    if (getValue('options.dial.centerVertically')=='1' && RESIZEDDIALS == false) {
        CONTAINER_TOP -= 15;  
    }

    // PAGES
    container.style.width =  COLS*(DIALWIDTH+SPACING)+'px';

    var THUMBNAILHEIGHT = ( ( DIALWIDTH - (2 * PADDING) ) * RATIO ) + PADDING ;

    for (var i=0; i < dials.length; i++) {
        var dial = dials[i];
        position=i+1;

        CURRENT_ROW = Math.ceil(position/COLS);
        CURRENT_COL = ((position-1)%COLS)+1;

        var li = document.createElement("li");
        var link = document.createElement("a");
        var thumbnail_container = document.createElement("div");
        var dialtitle = document.createElement("div");

        li.setAttribute("class", "link"); 
        li.setAttribute("position", position); 
        li.setAttribute("row", CURRENT_ROW); 
        li.setAttribute("col", CURRENT_COL); 
        $(li).contextMenu('menu-dial', {
            bindings: {
                'menu-edit-dial': function(t) {
                    var idx = $(t).attr('position') - 1;
                    var dial = dials[idx];
                    displayEditDialDialog(dial);
                },
                'menu-remove-dial': function(t) {
                    var idx = $(t).attr('position') - 1;
                    dials.splice(idx, 1);
                    setValue('dials', JSON.stringify(dials));
                    layoutDials();
                }
            }
        });
        link.setAttribute('href', dial.url);
        link.style.width = DIALWIDTH+'px';
        if (getValue('options.dial.alwaysNewTab')==1)
            link.setAttribute('target', '_blank');
        dialtitle.style.width = DIALWIDTH-2*PADDING;
        dialtitle.style.marginLeft = SPACING/2+'px';
        dialtitle.style.display = 'block'
        dialtitle.style.margin = '0 auto'
        dialtitle.setAttribute('class','title');
        dialtitle.innerHTML = dial.name;

        // DO WE RENDER IMAGE (THUMBNAIL OR CUSTOM THUMBNAIL)
        if (dial.image != '') {
            thumbnail_container.style.backgroundSize = 'contain'; 
            thumbnail_container.style.backgroundPosition = 'center center';
            thumbnail_container.style.backgroundImage = 'url('+dial.image+')';
        } else {
            if (RATIO_MODIFIED == true) {
                thumbnail_container.style.backgroundSize = '102% 100%'; // nove
            } else {
                thumbnail_container.style.backgroundSize = '102%'; // nove
            }

        }

        // widths and heights
        thumbnail_container.setAttribute('class','thumbnail_container');
        thumbnail_container.style.height = THUMBNAILHEIGHT;
        link.appendChild(thumbnail_container)
        link.style.height = THUMBNAILHEIGHT + PADDING + TITLE;
        link.style.padding = PADDING+'px';
        link.style.margin = SPACING/2;
        li.style.height = THUMBNAILHEIGHT + PADDING + TITLE + SPACING;
        li.style.overflow = 'hidden';

        // title at the bottom 
        if (localStorage['options.dial.titlePosition']!='inside') {
          
          if (localStorage['options.dial.showTitle']==1) { 
            li.appendChild(dialtitle);
          }
          link.appendChild(thumbnail_container)
          link.style.marginTop = 0;
          link.style.height = THUMBNAILHEIGHT + PADDING + PADDING+2;

        // title at the top
        } else {
          
          link.appendChild(thumbnail_container)
          if (localStorage['options.dial.showTitle']==1) { 
            link.appendChild(dialtitle)
          }
          link.style.paddingBottom = 0;
          thumbnail_container.style.height = THUMBNAILHEIGHT;

        }

        li_x = (CURRENT_COL-1) * DIALWIDTH + ( (CURRENT_COL-1 ) * (SPACING) );
        li_y = (CURRENT_ROW-1) * DIALHEIGHT + ( (CURRENT_ROW-1 ) * ( SPACING + PADDING + TITLE ) );;
        li_y = (CURRENT_ROW-1) * (THUMBNAILHEIGHT + PADDING + TITLE + SPACING);

        li.appendChild(link);
        li.style.left = li_x; 
        li.style.top = li_y; 

        container.appendChild(li);
    }


    // CENTER VERTICALLY?
    if (localStorage['options.dial.centerVertically']=='1' && RESIZEDDIALS==false) {
        var rowsheight = ( ROWS * (THUMBNAILHEIGHT + 2*PADDING + 2*SPACING) ); 
        var top = (SPACE-rowsheight)/2;
        //alert(SPACE+' '+rowsheight);
        if (top >= 0) {
            container.style.top = CONTAINER_TOP + ((SPACE-rowsheight)/2);
        } else {
            container.style.top = 15;
        }
    } else {
        container.style.top = CONTAINER_TOP;
    } 

}

function displayDialog(dialog, title, displayCb, cancelCb)
{
    var $overlay = $('#overlay');
    var $dialog = $('#'+dialog);

    var h2 = $dialog.find('h2');
    if (title != null && h2.length > 0) {
        h2[0].innerHTML=title;
    }

    $dialog.close_dialog = function() {
        $dialog.hide(0);
        $overlay.fadeOut(250);
        if (cancelCb) cancelCb($dialog); 
    };

    $overlay.click($dialog.close_dialog);
    $dialog.find('.close').click($dialog.close_dialog);
    $dialog.find('.cancel').click($dialog.close_dialog);

    $overlay.fadeIn(250);
    $dialog.show(0);

    if (displayCb) displayCb($dialog);
}

function clearDialog(dialog) {
    var $dialog = $('#'+dialog);
    if (dialog == 'dialog') {
    } else if (dialog == '') {
    }
}

function import_settings(strJSON)
{
    var objJSON = JSON.parse(strJSON);
    $.each(objJSON, function(key, value) {
        if (key != 'dials') {
            setValue(key, value);
        } else {
            setValue(key, JSON.stringify(value));
        }
    });
}

function export_settings(objJSON) {
    var export_settings = {};
    for (var i=0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var value;
        if (key != 'dials') {
            value = localStorage.getItem(localStorage.key(i));
        } else {
            value = JSON.parse(localStorage.getItem(localStorage.key(i)));
        }
        export_settings[key] = value;
    }
    return export_settings;
}

function edit_dial($dialog, replace_idx) {
    var image = $dialog.find('#logo').val();
    if (image == '') {
        image = $dialog.find('#image').val();
    }
    var dial_data = {
        'url': $dialog.find('#url').val(),
        'name': $dialog.find('#name').val(),
        'image': image
    };
    var dials = (getValue('dials')) ? JSON.parse(getValue('dials')) : new Array();
    if (replace_idx != null) {
        dials[replace_idx] = dial_data;
    } else {
        dials.push(dial_data);
    }
    setValue('dials', JSON.stringify(dials));
}

function displayEditDialDialog(dial) {
    displayDialog('dial-dialog', 'Edit Dial', function($dialog) {
        $dialog.find('#url').val(dial.url);
        $dialog.find('#name').val(dial.name);
        $dialog.find('#image').val(dial.image);
        var $edit_button = $dialog.find('#add-edit-dial');
        $edit_button.unbind('click');
        $edit_button.click(function() {
            edit_dial($dialog, idx);
            layoutDials();
            $dialog.close_dialog();
        });
    }, function($dialog) {
        $dialog.find('#url').val('');
        $dialog.find('#name').val('');
        $dialog.find('#image').val('');
        $dialog.find('#logo').val('');
    });
}

function displayAddDialDialog() {
    displayDialog('dial-dialog', 'Add Dial', function($dialog) {
        var $edit_button = $dialog.find('#add-edit-dial');
        $edit_button.unbind('click');
        $edit_button.click(function() {
            edit_dial($dialog);
            layoutDials();
            $dialog.close_dialog();
        });
    }, function($dialog) {
        $dialog.find('#url').val('');
        $dialog.find('#name').val('');
        $dialog.find('#image').val('');
        $dialog.find('#logo').val('');
    });
}

function displaySettingsDialog() {
    displayDialog('settings-dialog', null, function($dialog) {
        // import-button
        var $import_button = $dialog.find('#import-settings');
        $import_button.unbind('click');
        $import_button.click(function() {
            var strJSON = $dialog.find('#import-export-textarea').val() || '{}';
            try {
                import_settings(strJSON);
                $dialog.close_dialog();
                location.reload();
            } catch(e) {
                alert("import error!\n"+e);
            }
        });
        // export-button
        var $export_button = $dialog.find('#export-settings');
        $export_button.unbind('click');
        $export_button.click(function() {
            var settings = export_settings();
            $dialog.find('#import-export-textarea').val(JSON.stringify(settings, null, 2));
        });
    }, function($dialog) {
        $dialog.find('#import-export-textarea').val('');
    });
}

function init() 
{
    $('#container').contextMenu('menu', {
      bindings: {
        'menu-add-dial': function(t) {
            displayAddDialDialog();
        },
        'menu-import-export-settings': function(t) { 
            displaySettingsDialog();
        }
      }
    });

    $('#button-config').click(function(t) { displaySettingsDialog() });
    $('#button-add-dial').click(function(t) { displayAddDialDialog() });

    layoutDials();
}

$(function() {
    var default_dials = [
        {"name":"Gmail","url":"https://mail.google.com/","image":"http://farm6.static.flickr.com/5145/5612547349_bf6b97702a_o.jpg"},
        {"name":"Google Reader","url":"http://www.google.com/reader/","image":"http://farm6.static.flickr.com/5144/5612548919_36c288a72e_o.png"},
        {"name":"Google Calendar","url":"https://www.google.com/calendar/","image":"http://farm6.static.flickr.com/5182/5613127636_e854aea66b_o.png"}
    ];
    if (!getValue('dials')) {
        setValue('dials', JSON.stringify(default_dials));
    }

    init(); 
    window.addEventListener("resize", function() { 
        layoutDials();
    }, false); 
});
