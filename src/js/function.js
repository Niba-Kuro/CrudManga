//============================================================================================================
// IMPORT
    import $ from "jquery";
//============================================================================================================
// VARIABLEs
    
    // Electron
    // const electron = require('electron');
    // const {shell} = electron.shell;
    const BrowserWindow  = require("@electron/remote").BrowserWindow;

    // MouseDraggable
    let xInicial = 0;
    let yInicial = 0;
    let drag     = false;

//============================================================================================================
// EVENTOS
    // DraggableWindows
    $(window).on('mousedown', function(e) { 
        xInicial = e.clientX;
        yInicial = e.clientY;
        drag = true;
    });

    $(window).on('mouseup', function(e) { 
        drag = false;
        $("*").css("cursor", "");
    });

    $(window).on('mousemove', function(e) {
        try {
            let win = BrowserWindow.getFocusedWindow();
            let x = e.screenX - xInicial;
            let y = e.screenY - yInicial;
            let flag = e.target === document.documentElement;
            if (flag){
                win.setIgnoreMouseEvents(true, { forward: true });
            } 
            else {
                win.setIgnoreMouseEvents(false);
            }
            if(drag){
                $("*").css("cursor", "grabbing");
                win.setPosition(x, y);
            }
        }catch (e) {
        }
    });
