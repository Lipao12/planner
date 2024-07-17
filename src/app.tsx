import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CreateTripPage } from "./pages/create-trip";
import { TripDetailsPage } from "./pages/trip-details";
import { UserTripsPage } from "./pages/user-details";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateTripPage />,
  },
  {
    path: "/create-trip/:userId",
    element: <CreateTripPage />,
  },
  {
    path: "/user/:userId/trips/:tripId",
    element: <TripDetailsPage />,
  },
  {
    path: "/user/:userId",
    element: <UserTripsPage />,
  },
]);

export function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
