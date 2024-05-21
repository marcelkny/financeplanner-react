import { useIsLoading } from "../../context/LoadingContext";

export function LoadingScreen() {
    return (
        <>
            <div className="absolute top-0 left-0 flex items-center justify-center w-screen h-screen bg-[rgba(0,0,0,0.8)] backdrop-blur-[2px]">
                <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-red-700"></div>
            </div>
        </>
    );
}
