import { pb } from "@/api/pocketbase";
import { useQuery } from "@tanstack/react-query";

function useReservationList() {
  const userInfo = pb.authStore.model;

  async function fetchReservation() {
    try {
      const reservation = await pb.collection("reservation").getFullList({
        filter: `booker = '${userInfo.id}'`,
        expand: "place",
        sort: "-date",
      });
      return reservation;
    } catch (error) {
      console.error(error);
    }
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["reservationList"],
    queryFn: fetchReservation,
  });

  if (error) console.error(error);

  return { data, isLoading };
}

export default useReservationList;

/* -------------------------------------------------------------------------- */

export function useFetchVisitData() {
  const userInfo = pb.authStore.model;

  async function fetchVisitData() {
    try {
      const reservation = await pb.collection("reservation").getFullList({
        filter: `booker="${userInfo.id}" && visited=true && canceled=false`,
        expand: "place",
        sort: "-date",
      });

      let visitCount = reservation.reduce((acc, cur) => {
        acc[cur.expand.place.title] = (acc[cur.expand.place.title] || 0) + 1;
        return acc;
      }, {});

      let visitData = Object.entries(visitCount).sort((a, b) => b[1] - a[1]);
      return visitData;
    } catch (error) {
      console.error(error);
    }
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["visitData"],
    queryFn: fetchVisitData,
  });

  if (error) console.error(error);

  return { data, isLoading };
}
