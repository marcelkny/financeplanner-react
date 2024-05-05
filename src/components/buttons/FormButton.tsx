import { MouseEventHandler } from "react";

export interface FormButtonProps {
    value: string;
    onClick: MouseEventHandler<HTMLInputElement>;
    customStyle: string;
}

export function FormButton({ value, onClick, customStyle }: FormButtonProps) {
    const fullClass = customStyle;
    return <div className="w-fit">
        <input type="submit" value={value} className={fullClass} onClick={onClick} />
    </div>;
}
