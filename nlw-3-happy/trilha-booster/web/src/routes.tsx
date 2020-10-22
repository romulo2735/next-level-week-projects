import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";

import Landing from "./Pages/Landing";
import OrphanagesMap from "./Pages/OrphanagesMap";
import Orphanage from "./Pages/Orphanage";
import CreateOrphanage from "./Pages/CreateOrphanage";

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing}/>
                <Route path="/orphanages/map" component={OrphanagesMap} />

                <Route path="/orphanage/create" component={CreateOrphanage} />
                <Route path="/orphanage/:id" component={Orphanage} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;