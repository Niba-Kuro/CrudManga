// REACT==================================================================================================================
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// IMPORT=================================================================================================================
import $ from "jquery";
// COMPONENTS=============================================================================================================
import { createRoot }           from "react-dom/client";
import { SheetModel }           from "../components/SheetModel.jsx";
import { HomeModel }            from "../components/HomeModel.jsx";
import { ListModel }            from "../components/ListModel.jsx";
import { ViewModel }            from "../components/ViewModel.jsx";
import { FormModel }            from "../components/FormModel.jsx";
import { ViewImgModel }         from "../components/ViewImgModel.jsx";
import { ConfirmationModel }    from "../components/ConfirmationModel.jsx";
// STYLESHEET=============================================================================================================
import "../css/general.css"
// ROOT===================================================================================================================
const container = $("#root")[0];
const root = createRoot(container);

// const location = useLocation();
// const [displayLocation, setDisplayLocation] = useState(location);
// const [transitionStage, setTransistionStage] = useState("fadeIn");

// useEffect(() => {  
// RENDER=================================================================================================================
root.render(
    <BrowserRouter>
        <Routes>
            <Route 
                path="/"
                element={<SheetModel 
                            prop={
                                <HomeModel />
                            }/>
                        }/>
            <Route 
                path="/add/:page"
                element={<SheetModel 
                            prop={
                                <FormModel action={"add"} title="Agregar manga"/>
                            }/>
                        }/>
            <Route 
                path="/update/:page/:id"
                element={<SheetModel 
                            prop={
                                <FormModel action={"update"} title="Actualizar manga"/>
                            }/>
                        }/>
            <Route 
                path="/delete/:parameter"
                element={<SheetModel 
                            prop={
                                <ConfirmationModel/>
                            }/>
                        }/>
            <Route 
                path="/viewModel/:id"
                element={<SheetModel 
                            prop={
                                <ViewModel query={{"_id": undefined}}/>
                            }/>
                        }/>
            <Route 
                path="/ImgModel/:id"
                element={<SheetModel 
                            prop={
                                <ViewImgModel/>
                            }/>
                        }/>
            <Route 
                path="/next/:page"
                element={<SheetModel 
                            prop={
                                <ListModel 
                                    filter={true} 
                                    title="Tus mangas" 
                                    query={{"$options_filter":{"$limit" : 12, "$skip": undefined, "$count": true}}}
                                />
                            }/>
                        }/>
            <Route 
                path="/filter/:page/:parameter"
                element={<SheetModel 
                            prop={
                                <ListModel 
                                    filter={true} 
                                    title="Tus mangas" 
                                    query={{"$options_filter":{"$limit" : 12, "$skip": undefined, "$count": true}}} 
                                />
                            }/>
                        }/>
        </Routes>
    </BrowserRouter>
);