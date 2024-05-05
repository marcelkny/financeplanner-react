import LoadCircle from "../../components/spinners/loadcircle";

export default function LoadingView({ circleClass }: { circleClass: string }) {
    return (
        <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-50 flex items-center">
            <div className="mx-auto my-auto w-fit">
                <LoadCircle circleClass={circleClass} />
            </div>
        </div>
    );
}
