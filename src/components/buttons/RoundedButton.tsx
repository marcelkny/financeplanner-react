import { MouseEventHandler } from "react";

const buttonStyle = " px-2 rounded-sm bg-gray-400 hover:cursor-pointer w-fit";

export default function RoundedButton({ caption, additionalClass, clickFunction }: { caption: string; additionalClass?: string; clickFunction: MouseEventHandler<HTMLSpanElement> | undefined }) {
    return (
        <div className={`${buttonStyle}`}>
            <span className={additionalClass ? additionalClass : "text-base"} onClick={clickFunction ? clickFunction : undefined}>
                {caption}
            </span>
        </div>
    );
}
