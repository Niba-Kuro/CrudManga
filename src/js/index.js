// IMPORT=================================================================================================================
    // Jquery
    const $ = require("jquery");
    // Electron
    const { shell } = require("electron");    
    const BrowserWindow  = require("@electron/remote").BrowserWindow;
// VARIABLES==============================================================================================================
    // MouseDraggable
    let xInicial = 0;
    let yInicial = 0;
    let drag     = false;
// EVENTS=================================================================================================================
    // DraggableWindows
    $(window).on('mousedown', function(e) { 
        xInicial = e.clientX;
        yInicial = e.clientY;
        drag = true;
    });

    $(window).on('mouseup', function(e) { 
        drag = false;
        $("#root").removeAttr("style")
    });

    $(window).on('mousemove', function(e) {
        try {
            let win = BrowserWindow.getFocusedWindow();
            let x = e.screenX - xInicial;
            let y = e.screenY - yInicial;
            let flag = e.target === document.documentElement;
            // if (flag){
            //     win.setIgnoreMouseEvents(true, { forward: true });
            // } 
            // else {
            //     win.setIgnoreMouseEvents(false);
            // }
            if(drag){
                $("#root").css("cursor", "grabbing");
                win.setPosition(x, y);
            }
        }catch (e) {
        }
    });

    //dragstart
    $(document).on("dragstart", function(e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
        }
    });

    function funcUrl(url) {
        shell.openExternal(url);
    };