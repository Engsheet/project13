import { AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";

function ReviewWriteLink() {
  return (
    <Link
      to={"/reservation"}
      className="flex aspect-square w-11 items-center justify-center rounded-full bg-primary text-lg hover:bg-secondary focus:bg-secondary sm:w-[52px] sm:text-xl"
      aria-label="리뷰 쓰기"
    >
      <AiFillEdit />
    </Link>
  );
}

export default ReviewWriteLink;
