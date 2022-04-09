// REACT
import React, {useState} from "react";
import $ from "jquery";
// COMPONENTS
import { createRoot } from "react-dom/client";
import { SheetModel } from "../view/components/SheetModel.jsx";

const container         = $("#root")[0];
const root              = createRoot(container);

root.render(
    <SheetModel/>
);

