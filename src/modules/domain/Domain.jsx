import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import PrivateRoutes from "../../common/util/routers/ProtectedRoutes";
import Header from "./components/Header/Header";
import Files from "./pages/Files/Files";

const RETRY_SIGN_IN = 'Выполните вход';

const Domain = () => {
    return (
        <div>
            <Header/>
            <Routes>
                <Route path='/' element={<Navigate to='auth'/>}/>
                <Route path='/auth' element={<Auth/>}/>
                <Route path='/auth/sign-in' element={<SignIn/>}/>
                <Route path='/auth/sign-up' element={<SignUp/>}/>
                <Route element={<PrivateRoutes errorMessage={RETRY_SIGN_IN}/>}>
                    <Route path='/files' element={<Files/>}/>
                </Route>
            </Routes>
        </div>
    )
}

export default Domain;