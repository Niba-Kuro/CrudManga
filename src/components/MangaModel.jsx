// REACT==================================================================================================================
import React, { useState } from "react";
import { Link } from "react-router-dom";
// COMPONENTS=============================================================================================================
import { TooltipModel } from "../components/TooltipModel.jsx";
// STYLESHEET=============================================================================================================
import "../css/mangaModel.css"
// MODEL==================================================================================================================
export function MangaModel({ prop }) {
    // VARIABLES==========================================================================================================
    let [tooltip, setTooltip]   = useState(false);
    let optView                 = "/viewModel/"+prop["_id"];  
    // RETURN=============================================================================================================
    return (
        <>
            <Link to={optView} className="data-model" key={prop["_id"]} onMouseEnter={() => setTooltip(true)} onMouseLeave={() => setTooltip(false)}>
                <div className="data-model-title">{prop["nombre"]}</div>
                <img src={prop.imagen} alt={prop["nombre"]}/>
                {tooltip && (
                    <TooltipModel prop={prop["nombre"]}/>
                )}
            </Link>
        </>
    );
}
