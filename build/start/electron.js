const {app, BrowserWindow} = require("electron");
// const path = require("path");
// const url = require("url");
// const { exec } = require("child_process");

// if(process.env.NODE_ENV !== "production"){
    // require("electron-reload")(__dirname, {
    //     electron: path.join(__dirname, "../node_modules", ".bin", "electron")
    // });
    // require("electron-reload")(__dirname, {});
// }

// ============================================================================================
// READY
app.on("ready", function() {
    
    let mainWindows = new BrowserWindow({
        width: 960,
        height: 800,
        // transparent: true, 
        // frame: false,
        // title: "Manga crud",
        // hasShadow: false,
        webPreferences: {
            nodeIntegration: true
            // nodeIntegration: true, 
            // contextIsolation: false,
            // enableRemoteModule: true
        }
    });

    mainWindows.loadURL('http://localhost:5000');
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