import { getPbImageURL } from "@/utils/getPbImageURL";
import { array, shape } from "prop-types";

function PhotoLayout({ item }) {
  return (
    <>
      {item.photos.length === 1 ? (
        item.photos.map((fileName) => (
          <img
            key={crypto.randomUUID()}
            src={getPbImageURL(item, fileName)}
            alt="리뷰 사진"
            className="aspect-video w-full rounded-lg object-cover"
          />
        ))
      ) : item.photos.length === 2 ? (
        <div className="flex aspect-video gap-0.5 [&>*:nth-child(1)]:rounded-l-lg [&>*:nth-child(2)]:rounded-r-lg">
          {item.photos.map((fileName) => (
            <img
              key={crypto.randomUUID()}
              src={getPbImageURL(item, fileName)}
              alt="리뷰 사진"
              className="w-1/2 object-cover"
            />
          ))}
        </div>
      ) : item.photos.length === 3 ? (
        <div
          className="grid aspect-video grid-cols-[60%_40%] grid-rows-2 gap-0.5
        [&>*:nth-child(1)]:row-start-1 [&>*:nth-child(1)]:row-end-3 [&>*:nth-child(1)]:rounded-l-lg
        [&>*:nth-child(2)]:col-start-2 [&>*:nth-child(2)]:row-end-2 [&>*:nth-child(2)]:rounded-tr-lg
        [&>*:nth-child(3)]:col-start-2 [&>*:nth-child(3)]:row-end-3 [&>*:nth-child(3)]:rounded-br-lg"
        >
          {item.photos.map((fileName) => (
            <img
              key={crypto.randomUUID()}
              src={getPbImageURL(item, fileName)}
              alt="리뷰 사진"
              className="h-full w-full object-cover"
            />
          ))}
        </div>
      ) : (
        <div
          className="relative grid aspect-video grid-cols-[60%_40%] grid-rows-2 gap-0.5
        [&>*:nth-child(1)]:row-start-1 [&>*:nth-child(1)]:row-end-3 [&>*:nth-child(1)]:rounded-l-lg
        [&>*:nth-child(2)]:col-start-2 [&>*:nth-child(2)]:row-end-2 [&>*:nth-child(2)]:rounded-tr-lg
        [&>*:nth-child(3)]:col-start-2 [&>*:nth-child(3)]:row-end-3 [&>*:nth-child(3)]:rounded-br-lg"
        >
          {item.photos.slice(0, 3).map((fileName) => (
            <img
              key={crypto.randomUUID()}
              src={getPbImageURL(item, fileName)}
              alt="리뷰 사진"
              className="h-full w-full object-cover"
            />
          ))}
          <div className="absolute -right-0.5 bottom-0 flex h-1/2 w-[40%] items-center justify-center rounded-br-lg bg-black bg-opacity-40 text-lg font-bold text-white sm:text-xl">
            +{item.photos.slice(3).length}
          </div>
        </div>
      )}
    </>
  );
}

PhotoLayout.propTypes = {
  item: shape({
    photos: array,
  }),
};

export default PhotoLayout;
