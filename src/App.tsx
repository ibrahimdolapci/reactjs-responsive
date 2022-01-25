import React from 'react';
import './App.css';
import {Provider} from "react-redux";
import {store} from "./app/store";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {Events} from "./app/pages/events";
import {EventDetails} from "./app/pages/events/details";

function App() {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <Routes>
                    <Route path="/">
                        <Route path="events" element={<Events/>}>
                            <Route path=":id" element={<EventDetails/>}/>
                        </Route>
                        <Route index element={<Navigate to="/events"/>}/>
                    </Route>
                </Routes>
            </Provider>
        </BrowserRouter>
    );
}

export default App;
