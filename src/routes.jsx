import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { pb } from "@/api/pocketbase";

import ReservationWrite from "./pages/ReservationWrite";

// const ReservationWrite = lazy(() => import("@p/ReservationWrite"));
const RootLayout = lazy(() => import("@l/RootLayout"));
const UserReviewList = lazy(() => import("@p/UserReviewList"));
const UpdateUserData = lazy(() => import("@p/UpdateUserData"));
const ReviewWrite = lazy(() => import("@p/ReviewWrite"));
const Reservation = lazy(() => import("@p/Reservation"));
const UserReview = lazy(() => import("@p/UserReview"));
const Favorites = lazy(() => import("@p/Favorites"));
const MyReview = lazy(() => import("@p/MyReview"));
const NotFound = lazy(() => import("@p/NotFound"));
const Register = lazy(() => import("@p/Register"));
const Follow = lazy(() => import("@p/Follow"));
const Region = lazy(() => import("@p/Region"));
const Login = lazy(() => import("@p/Login"));
const Place = lazy(() => import("@p/Place"));
const Feed = lazy(() => import("@p/Feed"));

let isValidUser = pb.authStore.isValid;

const routerConfig = isValidUser
  ? [
      {
        path: "/",
        element: <RootLayout />,
        errorElement: <NotFound />,
        children: [
          { index: true, element: <Feed /> },
          { path: "my-review", element: <MyReview /> },
          { path: "reservation", element: <Reservation /> },
          { path: "favorite", element: <Favorites /> },
        ],
      },
      { path: "update-user-data", element: <UpdateUserData /> },
      { path: "place/:placeId/:recordId", element: <Place /> },
      { path: "user-review/:userId", element: <UserReview /> },
      { path: "user-review-list/:userId", element: <UserReviewList /> },
      { path: "region", element: <Region /> },
      { path: "review-write", element: <ReviewWrite /> },
      { path: "reservation-write", element: <ReservationWrite /> },
      { path: "follow", element: <Follow /> },
    ]
  : [
      {
        path: "/",
        children: [
          { index: true, element: <Login /> },
          { path: "register", element: <Register /> },
        ],
        errorElement: <NotFound />,
      },
    ];

const router = createBrowserRouter(routerConfig);
export default router;
