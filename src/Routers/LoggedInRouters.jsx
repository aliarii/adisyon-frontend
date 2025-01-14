import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import ProtectedRoute from '../Auth/ProtectedRoute';
import Navbar from '../Components/Navbar/Navbar';
import Sidebar from '../Components/Sidebar/Sidebar';
import BasketDetailsPage from '../Pages/BasketDetailsPage/BasketDetailsPage';
import BasketsPage from '../Pages/BasketsPage/BasketsPage';
import HistoryPage from '../Pages/HistoryPage/HistoryPage';
import HomePage from '../Pages/HomePage/HomePage';
import RecordsPage from '../Pages/RecordsPage/RecordsPage';
import SettingsPage from '../Pages/SettingsPage/SettingsPage';
import ReportPage from '../Pages/ReportPage/ReportPage';
import { getUser } from '../State/Auth/Action';
import { getCompanyByUserId } from '../State/Company/Action';
import AccessDeniedPage from '../Pages/AccessDeniedPage/AccessDeniedPage';

const LoggedInRouters = () => {
    const [openSideBar, setOpenSideBar] = useState(() => {
        const savedState = localStorage.getItem('sidebar');
        return savedState ? savedState === "true" : "true";
    });
    const location = useLocation();
    const isBasketDetailsPage = !location.pathname.includes('/Basket');

    const auth = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    useEffect(() => {
        const savedState = localStorage.getItem('sidebar');
        if (savedState !== null) {
            setOpenSideBar(savedState === 'true');
        }
    }, []);

    const setSideBar = (value) => {
        localStorage.setItem("sidebar", value)
        setOpenSideBar(value);
    }
    useEffect(() => {
        if (jwt) {
            dispatch(getUser(jwt));
        }
    }, [jwt, dispatch]);

    useEffect(() => {
        if (auth.user && jwt) {
            dispatch(getCompanyByUserId(auth.user, jwt));
        }
    }, [auth.user, dispatch, jwt]);

    return (
        <div className="md: w-full px-3 mx-auto bg-white dark:bg-dark-9">
            {isBasketDetailsPage && <Sidebar openSideBar={openSideBar} setSideBar={setSideBar} />}

            <div className={`${openSideBar && window.innerWidth <= 640 ? "visible" : "hidden"} `}>
                <div className={"z-[91] fixed bg-dark-5 opacity-75 min-h-full min-w-full"} onClick={() => setSideBar(!openSideBar)}></div>
            </div>

            <div className={`${openSideBar && isBasketDetailsPage ? "sm:ml-64 ml-0" : "ml-0"}`}>
                <div className="flex flex-col h-screen px-3 pt-5 gap-2">
                    {isBasketDetailsPage && <Navbar openSideBar={openSideBar} setSideBar={setSideBar} />}

                    <Routes>
                        <Route path="/*" element={<ProtectedRoute element={<HomePage />} />} />
                        <Route path="/baskets" element={<ProtectedRoute element={<BasketsPage />} requiredPermission="READ_BASKET" />} />
                        <Route path="/reports" element={<ProtectedRoute element={<ReportPage />} requiredPermission="READ_REPORT" />} />
                        <Route path="/basket/:name" element={<ProtectedRoute element={<BasketDetailsPage />} requiredPermission="READ_BASKET" />} />
                        <Route path="/history" element={<ProtectedRoute element={<HistoryPage />} requiredPermission="READ_HISTORY" />} />
                        <Route path="/records" element={<ProtectedRoute element={<RecordsPage />} requiredPermission="READ_LOG" />} />

                        <Route path="/settings" element={<ProtectedRoute element={<Navigate to="/settings/company" />} requiredPermission="READ_SETTINGS" />} />

                        <Route path="/settings/company" element={<ProtectedRoute element={<SettingsPage settingsIndex={0} />} requiredPermission="READ_SETTINGS" />} />
                        <Route path="/settings/product" element={<ProtectedRoute element={<SettingsPage settingsIndex={1} />} requiredPermission="READ_SETTINGS" />} />
                        <Route path="/settings/basket" element={<ProtectedRoute element={<SettingsPage settingsIndex={2} />} requiredPermission="READ_SETTINGS" />} />
                        <Route path="/settings/user" element={<ProtectedRoute element={<SettingsPage settingsIndex={3} />} requiredPermission="READ_SETTINGS" />} />
                        <Route path="/settings/profile" element={<ProtectedRoute element={<SettingsPage settingsIndex={4} />} requiredPermission="READ_SETTINGS" />} />

                        <Route path="/accessDenied" element={<AccessDeniedPage />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default LoggedInRouters