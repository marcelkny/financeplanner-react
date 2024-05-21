function RedoIcon(props: { fillcolor: string; iconclass: string }) {
    return (
        <svg fill="none" viewBox="0 0 24 24" className={props.iconclass} {...props}>
            <path
                fill={props.fillcolor}
                d="M13.146 11.05l-.174-1.992 2.374-.208a5 5 0 10.82 6.173l2.002.5a7 7 0 11-1.315-7.996l-.245-2.803L18.6 4.55l.523 5.977-5.977.523z"
            />
        </svg>
    );
}

export default RedoIcon;
