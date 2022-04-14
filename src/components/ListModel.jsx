// REACT==================================================================================================================
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// IMPORT=================================================================================================================
import { funcAjax } from "../js/function.js";
// COMPONENTS=============================================================================================================
import { MangaModel } from "../components/MangaModel.jsx";
import { ListFilterModel } from "../components/ListFilterModel.jsx";
// STYLESHEET=============================================================================================================
import "../css/listModel.css"
// MODEL==================================================================================================================
export function ListModel({ filter, query = undefined }) {
    // VARIABLES==========================================================================================================
    let [listManga, setListManga]       = useState([]);
    let [listLiManga, setListLiManga]   = useState([]);
    let { page }                        = useParams();
    let optFilter                       = undefined;
    let optNext                         = undefined;
    query["$options_filter"]["$skip"]   = undefined;
    let optPage                         = "/next/1";
    let clsFilter                       = "sheet-list-frame sheet-list-frame-without-filter";
    // CONDITIONS=========================================================================================================
    if(filter){
        clsFilter = "sheet-list-frame sheet-list-frame-with-filter";
        optFilter = <>
                        <div className="sheet-list-frame-filter">
                            <img className="sheet-list-icon-filter" src="../img/filter.png" alt="filter.png"/>
                            <img className="sheet-list-icon-filter" src="../img/search.png" alt="search.png"/>
                            <input type="text" name="txtBuscarManga" placeholder="Buscar manga"></input>                        
                        </div>
                        <div className="list-manga-model hide-list">
                            <ul>
                                {
                                    listLiManga.map(function (item) {
                                        return <ListFilterModel prop={item} key={item["_id"]} />
                                    })
                                }
                                <li><h2>....</h2></li>
                            </ul>
                        </div>
                    </>;
    }

    // if(window.location.pathname === "next"){

    // }

    if(page !== undefined){
        optPage = "/next/" + (parseInt(page) + 1);        
        if(parseInt(page) > 1){
            query["$options_filter"]["$skip"] = 12 * (parseInt(page) - 1);
        }
    }

    if(listManga.length === 12 || page === undefined){
        optNext = <Link to={optPage} className="next-page"></Link>;
    }
    // USEEFFCET==========================================================================================================
    useEffect(function () {
        funcAjax("http://127.0.0.1:5000/listManga", setListManga, query);
        if(filter){
            funcAjax("http://127.0.0.1:5000/listManga", setListLiManga, {"$options_filter":{"$limit" : 20, "$sort" : -1}});
        }
    }, [query, filter, page]);
    // RETURN=============================================================================================================
    return (
        <>
            <div className="sheet-list">
                <div className={clsFilter}>
                    <div className="sheet-list-title">
                        <img className="sheet-list-icon-title" src="../img/list.png" alt="list.png" />
                        <h3>Tus ultimos mangas <span></span></h3>
                    </div>
                    {optFilter}
                    <div className="sheet-container">
                        {
                            listManga.map(function (item) {
                                return <MangaModel prop={item} key={item["_id"]} />
                            })
                        }
                    </div>
                </div>
            </div>
            {optNext}
        </>
    );
}