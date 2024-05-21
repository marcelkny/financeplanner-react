export default function AddIcon(props: any) {
    return (
        <svg
            fill="none"
            viewBox="-0.5 -0.5 20.5 20.5"
            strokeWidth={2}
            stroke={props.color}
            aria-hidden="true"
            className={props.dimensions}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 6.75v6m3-3h-6m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
        </svg>
    );
}
