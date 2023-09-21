import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useReviewStore from '@s/review';

function VisitedPlaceInfo() {
  const { userId, placeId, title, category, address } = useLocation().state || {};
  const { setReviewData } = useReviewStore();

  useEffect(() => {
    setReviewData({ 
      writer: userId,
      place: placeId 
    });
  }, []);

  return (
    <div className="border-b pb-2 w-full">
      <h1 className="text-lg font-semibold">{title}</h1>
      <p>{category}<span className="mx-1">|</span>{address}</p>
    </div>
  );
}

export default VisitedPlaceInfo;