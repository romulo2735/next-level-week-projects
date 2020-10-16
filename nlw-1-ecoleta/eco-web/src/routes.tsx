import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import PontoCriar from "./pages/PontoCriar";

const Routes = () => {
    return(
        <BrowserRouter>
            <Route component={Home}  path="/" exact />
            <Route component={PontoCriar}  path="/ponto/cadastrar" />
        </BrowserRouter>
    )
}

export default Routes;