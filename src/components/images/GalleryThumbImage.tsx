import { useCallback, useState } from "react";
import { HOST_URL } from "../../config/config";
import { BoardImage } from "../../utils/interfaces/PaginationData";
import LoadCircle from "../spinners/loadcircle";

export default function GalleryThumbImage({ item, key }: { item: BoardImage; key: number }) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const onLoad = useCallback(() => {
        setIsLoading(false);
    }, []);
    return (
        <div className="w-[45%] h-[250px] md:w-[30%] md:h-[275px] lg:w-[15%] lg:h-[300px] overflow-hidden" key={key}>
            <>
                <div className="w-full h-full flex items-center" style={{ display: isLoading ? "block" : "none" }}>
                    <div className="w-fit h-fit mx-auto">
                        <LoadCircle circleClass="w-[30px] h-[30px]" />
                    </div>
                </div>
                <img
                    className="w-[110%] h-[110%] object-cover object-[50% 15%]"
                    loading="lazy"
                    src={`${HOST_URL}/${item.path}${item.file}`}
                    onLoad={onLoad}
                ></img>
            </>
        </div>
    );
}
