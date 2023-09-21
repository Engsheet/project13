import { useLocation } from 'react-router-dom';
// import useReview from '@h/useReview';
import { useEffect } from 'react';
import useReservationStore from '@/store/reservation';

function PlaceInfo() {
  const { userId, placeId, title, category, address } = useLocation().state || {};
  const { setReservationData } = useReservationStore();

  useEffect(() => {
    setReservationData({ 
      title: title,
      booker: userId,
      place: placeId 
    });
  }, []);

  return (
    <div className="border-b pb-2 w-full">
      <h1 className="text-lg font-semibold">{title}</h1>
      <p>{category}<span className="mx-1">|</span>{address}</p>
    </div>
  )
}

export default PlaceInfo