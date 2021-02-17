import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootreducer from "./Componentes/Reducers/rootreducer";
import { createStore, applyMiddleware, compose } from "redux";
import { BrowserRouter } from "react-router-dom";
import { pink, blueGrey } from "@material-ui/core/colors";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootreducer,
  composeEnhancers(applyMiddleware(thunk))
);

const theme = createMuiTheme({
  palette: {
    primary: pink,
    secondary: blueGrey,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
