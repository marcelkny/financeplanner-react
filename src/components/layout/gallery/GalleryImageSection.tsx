import { BoardImage } from "../../../utils/interfaces/PaginationData";
import GalleryThumbImage from "../../images/GalleryThumbImage";

export default function GalleryImageSection({ images }: { images: BoardImage[] | undefined;}) {
    if (!images) {
        return;
    }
    return (
        <div className="px-2 py-2 w-full flex flex-wrap justify-between gap-4">
            {images.map((item: BoardImage, i: number) => (
                <GalleryThumbImage item={item} key={i} />
            ))}
        </div>
    );
}
