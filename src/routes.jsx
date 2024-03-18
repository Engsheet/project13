import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { pb } from "@/api/pocketbase";
import { Suspense } from "react";
import Spinner from "./components/Spinner";

const ReservationWrite = lazy(() => import("@p/ReservationWrite"));
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
      {
        path: "update-user-data",
        element: (
          <Suspense fallback={<Spinner />}>
            <UpdateUserData />
          </Suspense>
        ),
      },
      {
        path: "place/:placeId/:recordId",
        element: (
          <Suspense fallback={<Spinner />}>
            <Place />
          </Suspense>
        ),
      },
      {
        path: "user-review/:userId",
        element: (
          <Suspense fallback={<Spinner />}>
            <UserReview />
          </Suspense>
        ),
      },
      {
        path: "user-review-list/:userId",
        element: (
          <Suspense fallback={<Spinner />}>
            <UserReviewList />
          </Suspense>
        ),
      },
      {
        path: "region",
        element: (
          <Suspense fallback={<Spinner />}>
            <Region />
          </Suspense>
        ),
      },
      {
        path: "review-write",
        element: (
          <Suspense fallback={<Spinner />}>
            <ReviewWrite />
          </Suspense>
        ),
      },
      {
        path: "reservation-write",
        element: (
          <Suspense fallback={<Spinner />}>
            <ReservationWrite />
          </Suspense>
        ),
      },
      {
        path: "follow",
        element: (
          <Suspense fallback={<Spinner />}>
            <Follow />
          </Suspense>
        ),
      },
    ]
  : [
      {
        path: "/",
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Spinner />}>
                <Login />
              </Suspense>
            ),
          },
          {
            path: "register",
            element: (
              <Suspense fallback={<Spinner />}>
                <Register />
              </Suspense>
            ),
          },
        ],
        errorElement: (
          <Suspense fallback={<Spinner />}>
            <NotFound />
          </Suspense>
        ),
      },
    ];

const router = createBrowserRouter(routerConfig);
export default router;
