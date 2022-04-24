// REACT==================================================================================================================
import React from "react";
import { Link } from "react-router-dom";
// MODEL==================================================================================================================
export function ListFilterModel({ prop }) {
    // RETURN=============================================================================================================
    return (
        <li>
            <Link to={"/viewModel/" + prop["_id"]}>
                <div className="list-manga-content">
                    <img src={prop["imagen"]} alt={prop["nombre"]}/>
                    <div>
                        <h3>{prop["nombre"]}</h3>
                        <hr/>
                        <h5>{prop["autor"]}</h5>
                    </div>
                </div>
                <div className="list-manga-id">
                    <h4>#{prop["_id"]}</h4>
                </div>
            </Link>
        </li>
    );
}