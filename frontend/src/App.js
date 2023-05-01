import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootComponent from "./pages/RootComponent";
import HomePage from "./pages/HomePage";
// import { eventsListLoader } from "./pages/EventsPage";
import EventDetailPage, {
  deleteEventAction,
  loadEventItems,
} from "./pages/EventDetailPage";
import NewEventPage from "./pages/NewEventPage";
import EditEventPage from "./pages/EditEventPage";
import EventsRoot from "./pages/EventsRoot";
import ErrorPage from "./pages/ErrorPage";
import { eventFormAction } from "./components/EventForm";
import AuthenticationPage, { authAction } from "./pages/AuthenticationPage";
import { logoutAction } from "./pages/Logout";
import { checkAuthLoader, tokenLoader } from "./util/auth";
import { Suspense, lazy } from "react";

const EventsPage = lazy(() => import("./pages/EventsPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootComponent />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventsRoot />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <EventsPage />
              </Suspense>
            ),
            loader: () =>
              import("./pages/EventsPage").then((module) =>
                module.eventsListLoader()
              ), // routes to page after data gets loaded.
          },
          {
            path: ":eventId",
            id: "event-detail",
            loader: loadEventItems,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction,
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: eventFormAction,
                loader: checkAuthLoader,
              },
            ],
          },
          {
            path: "new",
            element: <NewEventPage />,
            action: eventFormAction,
            loader: checkAuthLoader,
          },
        ],
      },
      { path: "auth", element: <AuthenticationPage />, action: authAction },
      { path: "logout", action: logoutAction },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
