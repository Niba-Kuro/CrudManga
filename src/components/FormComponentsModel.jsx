// REACT==================================================================================================================
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// IMPORT=================================================================================================================
import $ from "jquery";
import { funcMonth, funcAjax, funcMangaModel } from "../js/function.js";
// STYLESHEET=============================================================================================================
import "../css/formComponentsModel.css"
// MODEL==================================================================================================================
export function FormTextComponentModel({id, title, placeholder, element, field, setStatus}) {
    // RETURN=============================================================================================================
    return (
        <div className="view-form">
            <h4 className="view-form-title">{title}</h4>
            <div className="view-form-data">
                <input 
                    id={id} 
                    type="text" 
                    placeholder={placeholder}
                    onInput={() => {
                        let json = funcMangaModel(element["_id"], element);
                        json[field] = $("#" + id).val();
                        setStatus(json);
                    }}
                    value={element[field]}
                    />
            </div>
        </div>
    );
}

export function FormAreaComponentModel({id, title, placeholder, element, field, setStatus}) {
    // RETURN=============================================================================================================
    return (
        <div className="view-form">
            <h4 className="view-form-title">{title}</h4>
            <div className="view-form-data">
                <textarea 
                    id={id} 
                    placeholder={placeholder} 
                    onInput={() => {
                        let json = funcMangaModel(element["_id"], element);
                        json[field] = $("#" + id).val();
                        setStatus(json);
                    }}
                    value={element[field]}
                > 
                </textarea>
            </div>
        </div>
    );
}

export function FormRdoComponentModel({title, element, field, setStatus}) {
    // VARIABLES==========================================================================================================    
    let [checkFinish, setCheckFinish]         = useState(false);
    let [checkActive, setCheckActive]         = useState(false);
    let [checkAbandoned, setCheckAbandoned]   = useState(false);
    // USEEFFECT==========================================================================================================
    useEffect(function () {
        if(element[field] === "Finalizado"){
            setCheckFinish(true);
        }
        if(element[field] === "Activo"){
            setCheckActive(true);
        }
        if(element[field] === "Abandonado"){
            setCheckAbandoned(true);
        }
    }, [element, field]);
    // RETURN=============================================================================================================
    return (
        <div className="view-form">
            <h4 className="view-form-title">{title}</h4>
            <div className="view-form-data display-flex">
                <input type="radio" id="cbxFinish" name="cbxStatus"
                    onClick={() => {
                        let json = funcMangaModel(element["_id"], element);
                        json[field] = "Finalizado";
                        setStatus(json);
                        setCheckFinish(true);
                        setCheckActive(false);
                        setCheckAbandoned(false);
                    }}
                    checked={checkFinish}
                    onChange={() => {}}
                />
                <label htmlFor="cbxFinish">Finalizado</label>
                <input type="radio" id="cbxActive" name="cbxStatus"
                    onClick={() => {
                        let json = funcMangaModel(element["_id"], element);
                        json[field] = "Activo";
                        setStatus(json);
                        setCheckFinish(false);
                        setCheckActive(true);
                        setCheckAbandoned(false);
                    }}
                    checked={checkActive}
                    onChange={() => {}}
                />
                <label htmlFor="cbxActive">Activo</label>
                <input type="radio" id="cbxAbandoned" name="cbxStatus"
                    onClick={() => {
                        let json = funcMangaModel(element["_id"], element);
                        json[field] = "Abandonado";
                        setStatus(json);
                        setCheckFinish(false);
                        setCheckActive(false);
                        setCheckAbandoned(true);
                    }}
                    checked={checkAbandoned}
                    onChange={() => {}}
                />
                <label htmlFor="cbxAbandoned">Abandonado</label>
            </div>
        </div>
    );
}

export function FormCbxComponentModel({id, title, list=[], placeholder, element, field, setStatus}) {        
    // RETURN=============================================================================================================
    return (
        <div className="view-form">
            <h4 className="view-form-title">{title}</h4>
            <div className="view-form-data">
                <div 
                    id={id} 
                    tabIndex="0"                    
                    className={(function(){
                        if(element[field] === ""){
                            return "cbx-div placeholder-cbx";
                        }
                        return "cbx-div";
                    })()}
                    onFocus={() => {$("#" + id + "+ ul").removeClass("hide-list");}}
                    onBlur={()  => {$("#" + id + "+ ul").addClass("hide-list");}}                    
                >
                    {(function(){
                        if(element[field] === ""){
                            return placeholder;
                        }
                        return element[field];
                    })()}
                </div>
                <ul 
                    className="list-form hide-list"
                    tabIndex="0"  
                    onFocus={() => {$("#" + id + "+ ul").removeClass("hide-list");}}                                                       
                    onBlur={()  => {$("#" + id + "+ ul").addClass("hide-list");}}
                    >
                    {
                        list.map(function(item, index){
                            return <li 
                                key={index} 
                                onClick={() => {
                                    $("#" + id).text(item);
                                    $("#" + id + "+ ul").toggleClass("hide-list");
                                    let json = funcMangaModel(element["_id"], element);
                                    json[field] = item;
                                    setStatus(json);
                                }}
                            >{item}</li>
                        })
                    }
                </ul>
            </div>
        </div>
    );
}

export function FormCbxSearchComponentModel({id, title, placeholder, action, element, field, setStatus}) {
    // VARIABLES==========================================================================================================
    let [list, setList]     = useState([]);
    // USEEFFCET==========================================================================================================
    useEffect(function () {
        funcAjax("list"+action, {"$options_filter":{"$limit" : 20, "$sort" : -1}}, setList);
    }, [action]);
    // RETURN=============================================================================================================
    return (
        <div className="view-form">
            <h4 className="view-form-title">{title}</h4>
            <div className="view-form-data">
                <input 
                    type="text" 
                    id={id} 
                    placeholder={placeholder}
                    value={element[field]}
                    onFocus={() => {$("#" + id + "+ ul").removeClass("hide-list");}}                                                       
                    onBlur={()  => {$("#" + id + "+ ul").addClass("hide-list");}}
                    onInput={() => {
                        funcAjax("list"+action, {"nombre" : {"$regex": $("#"+id).val().trim(), "$options": "i"}, "$options_filter":{"$limit" : 20, "$sort" : -1}}, setList);
                        let json = funcMangaModel(element["_id"], element);
                        json[field] = [$("#" + id).val()];
                        setStatus(json);
                    }}
                />
                <ul 
                    className="list-form hide-list"
                    tabIndex="0"  
                    onFocus={() => {$("#" + id + "+ ul").removeClass("hide-list");}}                                                       
                    onBlur={()  => {$("#" + id + "+ ul").addClass("hide-list");}}
                    >
                    {
                        list.map(function(item){
                            return <li 
                                key={action+item["_id"]} 
                                onClick={() => {
                                    $("#" + id).val(item["nombre"]);
                                    $("#" + id + "+ ul").toggleClass("hide-list");
                                    let json = funcMangaModel(element["_id"], element);
                                    json[field] = [$("#" + id).val().trim()];
                                    setStatus(json);
                                }}
                            >{item["nombre"]}</li>
                        })
                    }
                    <li className="optios-more">....</li>
                </ul>
            </div>
        </div>
    );
}

export function FormDobuleComponentModel({option, idFirst, idSecond, titleFirst, titleSecond, placeholderFirst, placeholderSecond, element, fieldFirst, fieldSecond, setStatus}) {
    // VARIABLES==========================================================================================================
    let optContent = undefined;
    // CONDITIONS=========================================================================================================
    if(option !== undefined){
        if(option.toLowerCase() === "int"){
            optContent = <>
                            <DobuleComponentIntModel
                                id={idFirst}
                                title={titleFirst}
                                placeholder={placeholderFirst}
                                element={element}
                                field={fieldFirst}
                                setStatus={setStatus}
                            />
                            <DobuleComponentIntModel
                                id={idSecond}
                                title={titleSecond}
                                placeholder={placeholderSecond}
                                element={element}
                                field={fieldSecond}
                                setStatus={setStatus}
                            />
                        </>;
        }

        if(option.toLowerCase() === "date"){
            optContent = <>
                            <DobuleComponentDateModel
                                id={idFirst}
                                title={titleFirst}
                                placeholder={placeholderFirst}
                                element={element}
                                field={fieldFirst}
                                setStatus={setStatus}
                            />
                            <DobuleComponentDateModel
                                id={idSecond}
                                title={titleSecond}
                                placeholder={placeholderSecond}
                                element={element}
                                field={fieldSecond}
                                setStatus={setStatus}
                            />
                        </>;
        }
    }
    // RETURN=============================================================================================================
    return (
        <div className="display-flex margin-double-flex">
            {optContent}
        </div>
    );
}

export function DobuleComponentIntModel({id, title, placeholder, element, field, setStatus}) {
    // RETURN=============================================================================================================
    return (
        <div className="view-form double-component">
            <h4 className="view-form-title">{title}</h4>
            <div className="view-form-data">
                <input 
                    id={id}
                    onInput={() => {
                        let input = $("#"+id)
                        input.val(input.val().replace(/\D/g, ""));
                        let json = funcMangaModel(element["_id"], element);
                        json[field] = input.val().trim();
                        setStatus(json);
                    }}
                    placeholder={placeholder}
                    type="text" 
                    maxLength="6"
                    value={element[field]}
                    />
            </div>
        </div>
    );
}

export function DobuleComponentDateModel({id, title, placeholder, element, field, setStatus}) {
    // VARIABLES==========================================================================================================
    let [intYear, setIntYear]           = useState(new Date().getFullYear());
    let [intMonth, setIntMonth]         = useState(0);
    let [filterDate, setFilterDate]     = useState(false);
    let [filterMonth, setFilterMonth]   = useState(false);
    let [filterYear, setFilterYear]     = useState(false);
    let dtYear                          = new Date(intYear.toString()).getFullYear() + 1;
    let dtMont                          = new Date(intYear, intMonth).getMonth();
    let dtDays                          = new Date(dtYear, (dtMont + 1), 0).getDate();
    let dtMissingDays                   = new Date(dtYear, dtMont, 1).getDay() - 1;
    // let optText                         = <span>{placeholder}</span>;
    let optDate                         = [];
    let optDateYear                     = undefined
    let optDateMonth                    = undefined
    let optCalenderFilter               = undefined;
    let optCalender                     = undefined;
    let funcPosition                    = undefined;

    funcPosition = function(position, setStatus, action){
        if(action === 1){
            position++;
        }
        if(action === -1){
            position--;
        }
        if(position === 1901){
            position = new Date().getFullYear();
        }
        setStatus(position);
    };

    // CONDITIONS=========================================================================================================
    // if(element[field] !== undefined){
    //     optText = element[field];
    // }    

    if(dtMissingDays === -1){
        dtMissingDays = 6;
    }

    if(intMonth === 12){
        intMonth = 0;
    }

    if(intMonth === -1){
        intMonth = 11;
    }

    for(let i = 0; i < dtMissingDays; i++){
        optDate.push(<li 
                        key={"hide"+i}                        
                        className="list-date-data">
                    </li>);
    }

    for(let i = 0; i < dtDays; i++){
        optDate.push(<li 
                        key={i}
                        data-date = {(i + 1)}
                        className="list-date-data"
                        onClick={(e) => {
                            $(e.target).parent().find(".list-date-check").toggleClass("list-date-check");
                            $(e.target).toggleClass("list-date-check");
                            let month   = (dtMont + 1).toString();
                            let day     = $(e.target).text(); 
                            if(month.length === 1){
                                month = "0" + month;
                            }
                            if(day.length === 1){
                                day = "0" + day;
                            }
                            $("#"+id).text(dtYear + "-" + month + "-" + day);
                            $("#" + id + "+ ul").toggleClass("hide-list");
                            let json = funcMangaModel(element["_id"], element);
                            json[field] = $("#"+id).text().trim();
                            setStatus(json);
                        }}
                    >{(i + 1)}</li>);
    }

    optDateYear = Array.from({length: (new Date().getFullYear() - 1901)}, (_, i) => {
                                return (
                                    <li 
                                        key={"year"+(1901+(i+1))}
                                        className="date-content-list"
                                        onClick={() => {                                            
                                            setIntYear((1901+(i+1)));
                                            setFilterDate(false);
                                            setFilterYear(false);
                                        }}
                                        >{1901+(i+1)}</li>
                                );
                            });

    optDateMonth = Array.from({length: 12}, (_, i) => {
                                return (
                                    <li 
                                        key={"month" + (i + 1)}
                                        className="date-content-list"
                                        onClick={() => {                                            
                                            setIntMonth(i);
                                            setFilterDate(false);
                                            setFilterMonth(false);
                                        }}
                                        >{funcMonth(i)}</li>
                                );
                            });
    // COMPONENTS=========================================================================================================
    optCalenderFilter           = <>
                                        {filterMonth === true && (
                                            optDateMonth
                                        )}
                                        {filterYear === true && (
                                            optDateYear
                                        )}
                                    </>;
    optCalender                 = <>
                                        <li className="list-date-year">
                                            <span 
                                                className="date-previous"
                                                onClick={() => {
                                                    funcPosition(intYear, setIntYear, -1);
                                                }}
                                            >{"<"}</span>
                                            <span 
                                                className="date-year"
                                                onClick={() => {
                                                    setFilterYear(true);
                                                    setFilterDate(true);
                                                }}
                                                >{dtYear}</span>
                                            <span 
                                                className="date-next"
                                                onClick={() => {
                                                    funcPosition(intYear, setIntYear, 1);
                                                }}
                                                >{">"}</span>
                                        </li>
                                        <li className="list-date-month">
                                            <span 
                                                className="date-previous"
                                                onClick={() => {
                                                    funcPosition(intMonth, setIntMonth, -1);
                                                }}
                                                >{"<"}</span>
                                            <span 
                                                className="date-year"
                                                onClick={() => {
                                                    setFilterMonth(true);
                                                    setFilterDate(true);
                                                }}
                                                >{funcMonth(dtMont)}</span>
                                            <span 
                                                className="date-next"
                                                onClick={() => {                                
                                                    funcPosition(intMonth, setIntMonth, 1);
                                                }}
                                            >{">"}</span>
                                        </li>
                                        <li className="list-date-days">
                                            <ul className="display-flex">
                                                <li>L</li><li>M</li><li>X</li><li>J</li><li>V</li><li>S</li><li>D</li>
                                            </ul>
                                        </li>
                                        {optDate}
                                    </>
    // USEEFFCET==========================================================================================================
    useEffect(function () {
        let input = $("#" + id);
        let split = input.text().split("-");
        input.find("+ ul .list-date-check").toggleClass("list-date-check");
        if(split.length === 3){
            if(parseInt(intYear) === parseInt(split[0])){
                if((intMonth + 1) === parseInt(split[1])){
                    input.find("+ ul .list-date-data[data-date='" + parseInt(split[2]) + "']").toggleClass("list-date-check");
                }
            }
        }
    }, [intYear, intMonth, id]);
    // RETURN=============================================================================================================
    return (
        <div className="view-form double-component">
            <h4 className="view-form-title">{title}</h4>
            <div className="view-form-data">
                <div 
                    id={id} 
                    className={(function(){
                        if(element[field] === ""){
                            return "cbx-div placeholder-cbx";
                        }
                        return "cbx-div";
                    })()}
                    tabIndex="0"
                    onFocus={() => {$("#" + id + "+ ul").removeClass("hide-list");}}                                                       
                    onBlur={()  => {$("#" + id + "+ ul").addClass("hide-list");}}
                    >
                    {(function(){
                        if(element[field] === ""){
                            return placeholder;
                        }
                        return element[field];
                    })()}
                </div>
                <ul 
                    className="list-date display-flex hide-list"
                    tabIndex="0"  
                    onFocus={() => {$("#" + id + "+ ul").removeClass("hide-list");}}                                                       
                    onBlur={()  => {$("#" + id + "+ ul").addClass("hide-list");}}
                    >
                    {filterDate === false && (
                        optCalender
                    )}
                    {filterDate === true && (
                        optCalenderFilter
                    )}
                </ul>
            </div>
        </div>
    );
}

export function FormSelectMultipledtModel({id, title, placeholder, action, element, field, setStatus}) {
    // VARIABLES==========================================================================================================
    let [list, setList]                         = useState([]);
    let json                                    = funcMangaModel(element["_id"], element);
    // USEEFFCET==========================================================================================================
    useEffect(function () {                    
        if(action.toLowerCase() !== "link"){
            funcAjax("list"+action, {"$options_filter":{"$limit" : 20, "$sort" : -1}}, setList);
        }
    }, [action]);
    // RETURN=============================================================================================================
    return (
        <>
            <div className="view-form">
                <h4 className="view-form-title">{title}</h4>
                <div className="view-form-data">
                    <input 
                        type="text" 
                        id={id} 
                        className="w-90"
                        placeholder={placeholder}
                        onFocus={() => {
                            if(action.toLowerCase() !== "link"){
                                $("#" + id + "+ ul").removeClass("hide-list");
                            }
                        }}
                        onBlur={()  => {
                            if(action.toLowerCase() !== "link"){
                                $("#" + id + "+ ul").addClass("hide-list");
                            }
                        }}
                        onInput={(e) => {
                                if(action.toLowerCase() !== "link"){
                                    funcAjax("list"+action, {"nombre" : {"$regex": $("#"+id).val().trim(), "$options": "i"}, "$options_filter":{"$limit" : 20, "$sort" : -1}}, setList);
                                }
                            }}
                    />
                    <ul 
                        className="list-form w-480px hide-list"
                        tabIndex="0"
                        onFocus={() => {
                            if(action.toLowerCase() !== "link"){
                                $("#" + id + "+ ul").removeClass("hide-list");
                            }
                        }}
                        onBlur={()  => {
                            if(action.toLowerCase() !== "link"){
                                $("#" + id + "+ ul").addClass("hide-list");
                            }
                        }}
                        >
                        {
                            list.map(function(item){
                                return <li 
                                    key={action + item["_id"]} 
                                    onClick={() => {
                                        $("#" + id).val(item["nombre"]);
                                        $("#" + id + "+ ul").toggleClass("hide-list");
                                    }}
                                >{item["nombre"]}</li>
                            })
                        }
                        <li className="optios-more">....</li>
                    </ul>
                    <button
                        onClick={() => {
                            if(json[field].find(element => element === $("#"+id).val().trim()) === undefined){
                                if(list.find(element => element["nombre"] === $("#"+id).val().trim()) !== undefined || action.toLowerCase() === "link"){                                    
                                    json[field].push($("#"+id).val().trim());
                                    setStatus(json);
                                }
                            }
                        }}
                        ><img src="../img/add.png" alt="add.png"/></button>
                </div>
            </div>
            <div className="view-form">
                <h4 className="view-form-title">{action}</h4>
                <div className="view-form-data view-form-list-data">
                    <ul className="display-flex">
                        {
                            json[field].map(function(item, index){
                                return <li 
                                    key={"list" + action + index}
                                    className="pill-model" 
                                >{(function(){
                                        if(item.split("/").length > 1 ){
                                            return item.split("/")[2];
                                        }
                                        return item;
                                    })()}<span
                                            onClick={() => {
                                                json[field] = json[field].filter(element => element !== item);
                                                setStatus(json);
                                            }}
                                            >x</span></li>
                            })
                        }
                    </ul>
                </div>
            </div>
        </>
    );
}

export function FormImgtModel({id, title, placeholder, element, field, setStatus}) {
    // VARIABLES==========================================================================================================
    let [nameImg, setNameImg]       = useState("");
    // USEEFFCET==========================================================================================================
    useEffect(function () {        
        if(element[field] !== undefined){
            if(element[field]["name"] !== undefined){
                setNameImg(element[field]["name"]);
            }else{
                setNameImg(element["nombre"]);
            }
        }
    }, [element, field]);
    // RETURN=============================================================================================================
    return (
        <div className="view-form">
            <h4 className="view-form-title">{title}</h4>
            <div className="view-form-data">
                <input 
                    type="file" 
                    id={id + "File"} 
                    className="hide"
                    onChange={() => {
                        let file = $("#" + id + "File")[0]["files"];
                        if(file[0] != null){
                            $("#" + id).val(file[0]["name"]);
                        }
                        console.log(file);
                        let reader = new FileReader();
                        reader.readAsDataURL(file[0]);
                        reader.onloadend = function() {
                            element[field] = { "name"   : file[0]["name"],
                                               "image"  : reader.result};
                            setStatus(element);
                        }
                    }}
                />
                <input 
                    type="text" 
                    id={id} 
                    className="w-90"
                    placeholder={placeholder}
                    disabled
                    value={nameImg}
                />
                <button
                    onClick={() => {
                        $("#" + id + "File").trigger("click");                        
                    }}
                    ><img src="../img/add.png" alt="add.png"/></button>
            </div>
        </div>
    );
}

export function FormButtonModel({text, element, action}) {
    // VARIABLES==========================================================================================================
    let [message, setMessage]       = useState({});
    let navigate                    = useNavigate();
    // USEEFFCET==========================================================================================================
    // useEffect(function () {
    // }, [action]);
    // RETURN=============================================================================================================
    return (
        <>
            <button      
                className="view-form-button" 
                onClick={() => {
                    let json = funcMangaModel(element["_id"], element);
                    json["nombre"]      = json["nombre"].trim();
                    json["nombre_jp"]   = json["nombre_jp"].trim();
                    json["sinopsis"]    = json["sinopsis"].trim();
                    json["autor"]       = json["autor"][0].trim();
                    json["editorial"]   = json["editorial"][0].trim();
                    json["imagen"]      = json["imagen"]["image"];
                    
                    if(action === "add"){
                        funcAjax("createManga", json, setMessage);
                        navigate("/");
                    }
                    
                    if(action === "update"){
                        funcAjax("updateManga", json, setMessage);
                        navigate("/viewModel/"+element["_id"]);
                    }
                }}
            >{text}</button>
        </>
    );
}