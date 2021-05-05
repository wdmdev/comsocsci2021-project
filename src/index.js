import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// views without layouts
import Index from "views/Index.js";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {/* add routes without layouts */}
      <Route path="/comsocsci2021-project" exact component={Index} />
      {/* add redirect for first page */}
      <Redirect from="*" to="/comsocsci2021-project" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
