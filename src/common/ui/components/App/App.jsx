import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import Domain from "../../../../modules/domain/Domain";
import ToastersProvider from "../../contexts/ToastersContext";

const App = () => {
    return (
        <ToastersProvider>
            <Routes>
                <Route path='*' element={<Navigate to='domain'/>}/>
                <Route path='/domain/*' element={<Domain/>}/>
            </Routes>
        </ToastersProvider>
    );
}

export default App;
