import { AppStatusHref } from "../../context/AppContext";

export type AlertVariant = "error" | "warning" | "success";

export interface AlertProps {
    title: string;
    message: string;
    variant?: AlertVariant;
    target?: AppStatusHref;
}

const colors: Record<AlertVariant, string> = {
    success: "bg-green-100 border-l-4 border-green-500 text-white-700",
    error: "bg-red-100 border-l-4 border-red-500 text-white-700",
    warning: "bg-orange-100 border-l-4 border-orange-500 text-orange-700",
};

export function Alert({ title, message, variant = "error", target }: AlertProps) {
    return (
        <div className={`${colors[variant]} p-4 mb-4`} role="alert">
            <p className="font-bold">{title}</p>
            <p>{message}</p>
            {target === undefined ? undefined : <a href={target.target}>{target.caption}</a>}
        </div>
    );
}
export function SuccessStatus({ title, message, variant = "success", target }: AlertProps) {
    return (
        <div className={`${colors[variant]} p-4 mb-4`} role="alert">
            <p className="font-bold">{title}</p>
            <p>{message}</p>
            {target === undefined ? undefined : (
                <div className="mt-2 flex items-center">
                    <a href={target.target}>
                        {target.caption}
                    </a>
                </div>
            )}
        </div>
    );
}
