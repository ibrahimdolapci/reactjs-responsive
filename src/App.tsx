import React from 'react';
import './App.css';
import {Events} from "./events";
import {Provider} from "react-redux";
import {store} from "./store";
function App() {
    return (
        <Provider store={store}>
            <Events/>
        </Provider>
    );
}

export default App;
