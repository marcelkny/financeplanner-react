import { NavigationInfo, NavigationSetUserNavigation, useNavigationContext } from "../context/NavigationContext";

export function dispatchNavigationInfo(navInfo: NavigationInfo) {
    const [, dispatchNavInfo] = useNavigationContext();
    const navAction = NavigationSetUserNavigation(navInfo);
    dispatchNavInfo(navAction);
    console.log("new NavInfo dispatched: ", navInfo);
}
