// the type returned by returnPaginationImages()
//
// the first value per record is the number of the page
// the second will be a array of images for this page

export interface BoardImage {
    galleryId: number;
    contentLevel_id: number;
    file: string;
    id: string;
    path: string;
}
export type BoardImageArray = BoardImage[];

export type PaginationData = Record<string, BoardImageArray>;