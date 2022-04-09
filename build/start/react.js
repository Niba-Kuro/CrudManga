// REACT
import React, {useState} from "react";
import $ from "jquery";
// COMPONENTS
import { createRoot } from "react-dom/client";
import { ModeloHoja } from "../view/components/ModeloHoja.jsx";

const container         = $("#root")[0];
const root              = createRoot(container);

root.render(
    <>
        <ModeloHoja/>
        <div>
            Prueba
        </div>
    </>
);

