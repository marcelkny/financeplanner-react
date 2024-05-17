import React from "react";
import ReactDOM from "react-dom/client";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import "./index.css";
import HomeView from "./views/home/HomeView";
import DefaultLayout from "./views/DefaultLayout";
import { ProtectedRoute } from "./components/route/ProtectedRoute";
import LoginView from "./views/home/LoginView";
import { AppContextProvider } from "./context/AppContext";
import MainStoreProvider from "./components/store-provider/MainStoreProvider";
import SettingsView from "./views/home/SettingsView";
import { NavigationProvider } from "./context/NavigationContext";
import { TransactionView } from "./views/finance/TransactionView";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<DefaultLayout />}>
            <Route
                index
                element={
                    <ProtectedRoute>
                        <HomeView />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/settings"
                element={
                    <ProtectedRoute>
                        <SettingsView />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/transactions"
                element={
                    <ProtectedRoute>
                        <TransactionView />
                    </ProtectedRoute>
                }
            />
            <Route path="/login" element={<LoginView />} />
        </Route>
    )
);
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AppContextProvider>
            <MainStoreProvider>
                <NavigationProvider>
                    <RouterProvider router={router} />
                </NavigationProvider>
            </MainStoreProvider>
        </AppContextProvider>
    </React.StrictMode>
);
