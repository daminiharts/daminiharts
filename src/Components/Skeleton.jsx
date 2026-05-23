const SkeletonCard = () => {
  return (
    <div className="animate-pulse bg-white rounded overflow-hidden  gap-8 items-start shadow-sm ">
      {/* Image placeholder */}
      <div className="bg-gray-200 h-48 md:h-64 w-full " />

      {/* Text placeholders */}
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-full" />
      </div>
    </div>
  );
};

export default SkeletonCard;