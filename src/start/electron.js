const {app, BrowserWindow} = require("electron");

// ============================================================================================
// READY
app.on("ready", function() {
    
    let mainWindows = new BrowserWindow({
        // width: 960,
        // height: 1000,
        // transparent: true, 
        // frame: false,
        // title: "Manga crud",
        hasShadow: false,
        webPreferences: {
            nodeIntegration: true, 
            contextIsolation: false,
            enableRemoteModule: true
        }
    });

    mainWindows.loadURL("http://192.168.0.2:5000");
    mainWindows.webContents.openDevTools();
    // mainWindows.setMenu(null);
    // mainWindows.setMenuBarVisibility(false);
    // mainWindows.setResizable(false);  

    require("@electron/remote/main").initialize();
    require("@electron/remote/main").enable(mainWindows.webContents);

});

// ============================================================================================
// CLOSE
app.on('window-all-closed', function(){
    app.quit();
});