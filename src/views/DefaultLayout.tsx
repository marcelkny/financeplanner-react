import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { LoadingScreen } from "../components/layout/LoadingScreen";
import { useLoadingContext } from "../context/LoadingContext";
import { useCallback, useEffect, useState } from "react";
import { BottomSlideMenu } from "../components/layout/BottomSlideMenu";
export default function DefaultLayout() {
    const [loadingContext] = useLoadingContext();
    const [loadingState, setLoading] = useState<boolean>(true);

    const loaderCallback = useCallback(() => {
        console.log("Loading State: ", loadingContext.isLoading);
        setLoading(loadingContext.isLoading);
    }, [loadingContext, setLoading]);

    useEffect(() => {
        loaderCallback();
    }, [loadingContext, loaderCallback]);

    return (
        <div>
            <div>
                
            </div>

            <div className="flex flex-col h-screen justify-between">
                <header>
                    <Header />
                </header>
                <main className="w-full flex-shrink-0 flex-grow mx-auto bg-slate-800 px-2">
                    {loadingState === true ? <LoadingScreen /> : undefined}

                    <Outlet />
                </main>
                <footer>
                    <Footer />
                </footer>
            </div>
        </div>
    );
}
