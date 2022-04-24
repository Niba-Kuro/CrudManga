// REACT==================================================================================================================
import React from "react";
import { Link } from "react-router-dom";
// COMPONENTS=============================================================================================================
import { ListModel } from "./ListModel.jsx";
// STYLESHEET=============================================================================================================
import "../css/homeModel.css"
// MODEL==================================================================================================================
export function HomeModel() {
    // RETURN=============================================================================================================
    return (
        <>
            <div className="sheet-controller">
                <Link to="/add/1" className="btn-model-controller">
                    <img className="img-effect" src="../img/effect.png" alt="effect.png" />
                    <img className="img-icons" src="../img/add.png" alt="add.png" />
                </Link>
                <Link to="/update/1" className="btn-model-controller">
                    <img className="img-effect" src="../img/effect.png" alt="effect.png" />
                    <img className="img-icons" src="../img/update.png" alt="update.png" />
                </Link>
                <Link to="/" className="btn-model-controller">
                    <img className="img-effect" src="../img/effect.png" alt="effect.png" />
                    <img className="img-icons" src="../img/remove.png" alt="remove.png" />
                </Link>
                <Link to="/" className="btn-model-controller">
                    <img className="img-effect" src="../img/effect.png" alt="effect.png" />
                    <img className="img-icons" src="../img/search.png" alt="search.png" />
                </Link>
    
            </div>
            <ListModel filter={false} title="Tus ultimos mangas" query={{"$options_filter":{"$limit" : 8, "$sort" : -1, "$count": true}}}/>
        </>
    );
}


