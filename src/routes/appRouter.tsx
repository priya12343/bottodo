import { lazy, Suspense }      from "react";
import {Route, Routes}         from "react-router-dom";
import AppLayout               from "../component/Layout/appLayout";
import { route } from "../config/constants";

const HomePage = lazy(() => import('../pages/index'));
export default function AppRoute() {
 return(<>
    <Routes>
        <Route path={route.home} element={<AppLayout />} >
            <Route path={route.home} element={<Suspense fallback=""><HomePage /></Suspense>} />
        </Route>
        
    </Routes>
 </>)
 } 