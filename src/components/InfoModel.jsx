// REACT==================================================================================================================
import React, { useState } from "react";
// COMPONENTS=============================================================================================================
import { TooltipModel } from "./TooltipModel.jsx";
// STYLESHEET=============================================================================================================
import "../css/infoModel.css"
// MODEL==================================================================================================================
export function InfoModel({ title, data }) {
    // VARIABLES==========================================================================================================
    let [tooltip, setTooltip]   = useState(false);
    // RETURN=============================================================================================================
    return (
        <div className="view-data-status" onMouseEnter={() => setTooltip(true)} onMouseLeave={() => setTooltip(false)}>
            <h4 className="view-data-status-title">
                {title}
            </h4>
            <div className="view-data-status-content">
                {data}
            </div>
            {tooltip && (
                <TooltipModel prop={data}/>
            )}
        </div>
    );
}