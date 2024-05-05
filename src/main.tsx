import React from "react";
import ReactDOM from "react-dom/client";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import "./index.css";
import "./loadcircle.css";
import HomeView from "./views/home/HomeView";
import InitialView from "./views/home/InitialView";
import DefaultLayout from "./views/DefaultLayout";
import { ProtectedRoute } from "./components/route/ProtectedRoute";
import LoginView from "./views/home/LoginView";
import { AppContextProvider } from "./context/AppContext";
import MainStoreProvider from "./components/store-provider/MainStoreProvider";
import SettingsView from "./views/home/SettingsView";

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
                <Route path="/init" element={<InitialView />} />
                <Route path="/login" element={<LoginView />} />
            </Route>
        
    )
);
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AppContextProvider>
            <MainStoreProvider>
                <RouterProvider router={router} />
            </MainStoreProvider>
        </AppContextProvider>
    </React.StrictMode>
);
