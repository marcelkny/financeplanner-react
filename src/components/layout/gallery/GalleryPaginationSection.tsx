export default function GalleryPaginationSection({
    curPage,
    pageClick,
    paginationPages,
}: {
    curPage: string;
    pageClick: (value: number) => void;
    paginationPages: string[];
}) {
    const curPageNum = parseInt(curPage);
    const pageArr: number[] = [];
    let dotReplacedSmallerSet = false;
    let dotReplacedHigherSet = false;
    for (const num of paginationPages) {
        const item = parseInt(num);
        let isPushable: boolean = false;
        if (item === 1) {
            isPushable = true;
        }
        if (item === curPageNum) {
            isPushable = true;
        }
        if (item === paginationPages.length) {
            isPushable = true;
        }
        if (item >= curPageNum - 3 && item <= curPageNum + 3) {
            isPushable = true;
        }
        if (isPushable === true) {
            pageArr.push(parseInt(num));
        } else if (item < curPageNum && isPushable === false && dotReplacedSmallerSet === false) {
            pageArr.push(0);
            dotReplacedSmallerSet = true;
        } else if (item > curPageNum && isPushable === false && dotReplacedHigherSet === false) {
            pageArr.push(0);
            dotReplacedHigherSet = true;
        }
    }
    return (
        <div className="flex flex-wrap gap-2 mb-4 w-fit mx-auto">
            {pageArr.map((item: number, i: number) => (
                <div key={i}>
                    {item === curPageNum ? (
                        <div className="px-2 rounded-sm bg-gray-400 text-gray-900 text-center cursor-not-allowed">{item}</div>
                    ) : (
                        <>
                            {item !== 0 ? (
                                <div
                                    className="px-2 rounded-sm bg-gray-600 text-gray-900 text-center cursor-pointer"
                                    onClick={() => {
                                        pageClick(item);
                                    }}
                                >
                                    {item}
                                </div>
                            ) : (
                                <div className="px-2 text-gray-400 text-center">{"..."}</div>
                            )}
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}
