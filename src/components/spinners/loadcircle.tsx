// import style from "./loadcircle.module.css";
export default function LoadCircle({ circleClass }: { circleClass: string }) {
    return (
        <div className={circleClass}>
            <span className="loadcircle"></span>
        </div>
    );
}
