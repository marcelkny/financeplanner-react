export default function SignalStrengthIcon(props: any) {
    const signal = props.signal;
    let fillArray = ["#c2bebe", "#c2bebe", "#c2bebe", "#c2bebe"];
    if (signal >= -100 && signal <= -91) {
        fillArray = ["#454545", "#c2bebe", "#c2bebe", "#c2bebe"];
    }
    if (signal >= -90 && signal <= -81) {
        fillArray = ["#454545", "#454545", "#c2bebe", "#c2bebe"];
    }
    if (signal >= -80 && signal <= -71) {
        fillArray = ["#454545", "#454545", "#454545", "#c2bebe"];
    }
    if (signal >= -70 && signal <= -1) {
        fillArray = ["#454545", "#454545", "#454545", "#454545"];
    }
    return (
        <svg className={props.className} width={20} height={115.484} viewBox="0 0 121.349 115.484" id="svg133" {...props}>
            <path
                d="m 2.7444067,114.98385 c -1.2390001,0 -2.24300009,-0.683 -2.24300009,-1.526 V 71.062849 c 0,-0.842 0.99999999,-1.526 2.24300009,-1.526 H 24.634406 c 1.241,0 2.247,0.685 2.247,1.529 v 42.390001 c 0,0.844 -1.006,1.528 -2.246,1.528 z"
                style={{
                    fill: fillArray[0],
                    fillOpacity: 1,
                    strokeWidth: 1,
                    strokeMiterlimit: 10,
                }}
                id="path1209"
            />
            <path
                d="m 34.068625,114.98838 c -1.23877,0 -2.243,-1.00424 -2.243,-2.243 V 50.472374 c 0,-1.238612 1.00439,-2.242551 2.243,-2.241999 h 21.89 c 1.2402,0 2.2459,1.004797 2.247,2.244999 v 62.266996 c 0,1.23988 -1.00512,2.24501 -2.245,2.24501 z"
                style={{
                    fill: fillArray[1],
                    fillOpacity: 1,
                    strokeWidth: 1,
                    strokeMiterlimit: 10,
                }}
                id="path1186"
            />
            <path
                d="m 65.390811,24.0867 c -1.23861,0 -2.24255,1.00439 -2.242,2.243 v 86.40801 c 5.5e-4,1.23949 1.00551,2.244 2.245,2.244 h 21.892 c 1.23981,-0.002 2.244,-1.00719 2.244,-2.247 V 26.3347 c 5.5e-4,-1.239 -1.004,-2.24355 -2.243,-2.243 z"
                style={{
                    fill: fillArray[2],
                    fillOpacity: 1,
                    strokeWidth: 1,
                    strokeMiterlimit: 10,
                }}
                id="path1158"
            />
            <path
                d="m 96.71459,114.9859 c -1.239002,5.5e-4 -2.243551,-1.00401 -2.242998,-2.243 V 2.742897 c 0.0017,-1.238546 1.006453,-2.24155306 2.244998,-2.24100006 h 21.888 c 1.24097,0 2.247,1.00601606 2.247,2.24700006 V 112.74089 c 0,1.23988 -1.00512,2.24501 -2.245,2.24501 z"
                style={{
                    fill: fillArray[3],
                    fillOpacity: 1,
                    strokeWidth: 1,
                    strokeMiterlimit: 10,
                }}
                id="path1093"
            />
        </svg>
    );
}
