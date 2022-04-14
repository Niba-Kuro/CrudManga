// FUNCTIONS==============================================================================================================
async function funcAjax(url, setState, item) {
    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(item)
    });
    let json = await response.json();
    setState(json);
}

function funcOpenUrl(url) {
    // eslint-disable-next-line no-eval
    eval("funcUrl('" + url + "');");
}

function funcImg(opt){
    switch(opt){
        case "add":
            return "data:image/png;base64,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";
        case "list":
            return "data:image/png;base64,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";
        default:
            break;
    }
}

function funcModel() {
    return {
        "_id": undefined,
        "autor": [],
        "capitulos": undefined,
        "demografia": undefined,
        "editorial": [],
        "estado": undefined,
        "finalizacion": undefined,
        "genero": [],
        "imagen": undefined,
        "link": [],
        "nombre": undefined,
        "nombre_jp": undefined,
        "publicacion": undefined,
        "sinopsis": undefined,
        "tomo": undefined
    }
}

export { funcAjax, funcOpenUrl, funcModel, funcImg };