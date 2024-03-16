import { create } from "zustand";

const initialReservationData = {
  booker: "",
  place: "",
  date: "",
  guestCount: 1,
  reservedName: "",
  email: "",
  tel: 0,
  requirements: "",
  visited: false,
  canceled: false
};

const useReservationStore = create((set) => ({
  reservationData: { ...initialReservationData },
  setReservationData: (data) => set((state) => ({ reservationData: { ...state.reservationData, ...data } })),
  resetReservationData() { set({ reservationData : {...initialReservationData} }); }
}));

export default useReservationStore;