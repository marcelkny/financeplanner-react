import { ChangeEventHandler } from "react";

export interface InputProps {
    placeholder: string;
    required: boolean;
    id: string;
    name: string;
    className?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}
export interface BaseInputProps {
    placeholder: string;
    type: string;
    required: boolean;
    id: string;
    name: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}

export function TextInput({ placeholder, required, id, name, onChange }: InputProps) {
    return <BaseInput placeholder={placeholder} type="text" required={required} id={id} name={name} onChange={onChange} />;
}
export function PasswordInput({ placeholder, required, id, name, onChange }: InputProps) {
    return <BaseInput placeholder={placeholder} type="password" required={required} id={id} name={name} onChange={onChange} />;
}
const InputClassName = "px-2 mb-5 w-full text-gray-800";
export function BaseInput({ placeholder, type, id, name, required, onChange }: BaseInputProps) {
    return <input type={type} placeholder={placeholder} className={InputClassName} id={id} name={name} required={required} onChange={onChange} />;
}
