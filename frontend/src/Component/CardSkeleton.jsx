import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function CardSkeleton() {
  return (
    <div className="w-[200px] max-w-[90%] h-[260px] bg-white flex flex-col rounded-xl shadow-md">
      {/* Image Skeleton */}
      <div className="w-full h-[65%]">
        <Skeleton height="100%" />
      </div>

      {/* Details */}
      <div className="w-full h-[35%] p-3 flex flex-col gap-2">
        <Skeleton height={15} width="80%" />
        <Skeleton height={12} width="60%" />
        <Skeleton height={18} width="40%" />
      </div>
    </div>
  );
}

export default CardSkeleton;
