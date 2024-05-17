import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
export default function DefaultLayout() {
    return (
        <div className="flex flex-col h-screen justify-between">
            <header>
                <Header />
            </header>
            <main className="w-full flex-shrink-0 flex-grow mx-auto bg-slate-800 overflow-auto px-2">
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}
