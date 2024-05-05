// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function MenuItem({ caption, target, onClickFunction }: { caption: string; target?: string; onClickFunction?: any }) {
    return <div className="text-xl text-gray-300 mb-2 hover:cursor-pointer" onClick={()=>{
        onClickFunction(target)
    }}>{caption}</div>;
}
