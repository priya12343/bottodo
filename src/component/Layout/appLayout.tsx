import React, {lazy, useState, Suspense, useEffect} from 'react';
import {Outlet, useLocation, useNavigate}           from "react-router-dom";
import FooterNavBar from '../includes/footerNavBar';
import HeaderNavBar from '../includes/headerNavBar';
import SideNavBar from '../includes/sideNavBar';

function Index() {
    let location                              = useLocation();
    const navigate                            = useNavigate();
    //const [{user}]: any                       = useStateValue();
    const [_toggleSidebar, _setToggleSidebar] = useState<boolean>(true);
    const [_isMobile, _setIsMobile]           = useState<boolean>(true);

    useEffect(() => {
        const hasWindow = typeof window !== 'undefined';
        const width     = hasWindow ? window.innerWidth : null;

        // if (!user) {
        //     navigate(route.home, {state: {from: location}, replace: true});
        // }

        if (width && width <= 768) {
            _setIsMobile(true);
            _setToggleSidebar(true);
        } else {
            _setIsMobile(false);
            setTimeout(() => _setToggleSidebar(false), 100);
        }

    }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

    return (<>
        <div className='col-md-12 d-flex'>
            <div className='col-md-2 sideNavDiv'>
                <SideNavBar />
            </div>
            <div className='col-md-10 mainDiv'>
                <div className='col-md-10 headerNav'>
                    <HeaderNavBar />
                </div>
                <div className='outletChildren'>
                    <Outlet />
                </div>
                <FooterNavBar />
            </div>
        </div>
    </>);
}

export default Index;