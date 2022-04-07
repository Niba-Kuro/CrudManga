const {app, BrowserWindow} = require("electron");
// const url = require("url");
// const path = require("path");
// const { exec } = require("child_process");

// if(process.env.NODE_ENV !== "production"){
    // require("electron-reload")(__dirname, {
    //     electron: path.join(__dirname, "../node_modules", ".bin", "electron")
    // });
// }

let mainWindows;

// ============================================================================================
// Python 
// let backend;
// backend = path.join(process.cwd(), "src/class/dist/main.exe")
// let execfile = require("child_process").execFile;
// execfile(
//     backend,
// 	{
// 		windowsHide: true,
// 	},
// 	(err, stdout, stderr) => {
// 	    if (err) {
// 		    console.log(err);
//     	}
//         if (stdout) {
// 			console.log(stdout);
// 		}
//         if (stderr) {
// 		    console.log(stderr);
// 		}
// 	}
// )

// ============================================================================================
// READY
app.on("ready", function() {
    
    mainWindows = new BrowserWindow({
        width: 960,
        height: 800,
        transparent: true, 
        frame: false,
        title: "Manga crud",
        hasShadow: false,
        webPreferences: {
            nodeIntegration: true, 
            contextIsolation: false,
            enableRemoteModule: true
        }
    });

    mainWindows.loadURL('http://localhost:5000');
    mainWindows.webContents.openDevTools();
    mainWindows.setMenu(null);
    mainWindows.setMenuBarVisibility(false);
    mainWindows.setResizable(false);  

    require("@electron/remote/main").initialize();
    require("@electron/remote/main").enable(mainWindows.webContents);

    mainWindows.on('close', function() { 
        // exec("taskkill /f /t /im main.exe", (err, stdout, stderr) => {
        //     if (err) {
        //         console.log(err);
        //         return;
        //     }
        //     // console.log(`stdout: ${stdout}`);
        //     // console.log(`stderr: ${stderr}`);        
        // });
    });
    
});


// ============================================================================================
// CLOSE

app.on('window-all-closed', function(){
    app.quit();
});