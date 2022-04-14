// REACT==================================================================================================================
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// IMPORT=================================================================================================================
import $ from "jquery";
// COMPONENTS=============================================================================================================
import { createRoot } from "react-dom/client";
import { SheetModel } from "../components/SheetModel.jsx";
import { HomeModel } from "../components/HomeModel.jsx";
import { ListModel } from "../components/ListModel.jsx";
import { ViewModel } from "../components/ViewModel.jsx";
// STYLESHEET=============================================================================================================
import "../css/general.css"
// ROOT===================================================================================================================
const container = $("#root")[0];
const root = createRoot(container);
// RENDER=================================================================================================================
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<SheetModel prop={<HomeModel />} />}></Route>
            <Route path="/next/:page" element={<SheetModel prop={<ListModel filter={true} query={{"$options_filter":{"$limit" : 12, "$skip": undefined}}} />} />}></Route>
            <Route path="/filter/:page/:parameter" element={<SheetModel prop={<ListModel filter={true} query={{"$options_filter":{"$limit" : 12, "$skip": undefined}}} />} />}></Route>
            <Route path="/viewModel/:id" element={<SheetModel prop={<ViewModel query={{"_id": undefined}} />} />}></Route>
        </Routes>
    </BrowserRouter>
);