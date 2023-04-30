import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootComponent from "./pages/RootComponent";
import HomePage from "./pages/HomePage";
import EventsPage, { eventsListLoader } from "./pages/EventsPage";
import EventDetailPage, {
  deleteEventAction,
  loadEventItems,
} from "./pages/EventDetailPage";
import NewEventPage from "./pages/NewEventPage";
import EditEventPage from "./pages/EditEventPage";
import EventsRoot from "./pages/EventsRoot";
import ErrorPage from "./pages/ErrorPage";
import { eventFormAction } from "./components/EventForm";
import AuthenticationPage from "./pages/AuthenticationPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootComponent />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventsRoot />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsListLoader, // routes to page after data gets loaded.
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
              },
            ],
          },
          { path: "new", element: <NewEventPage />, action: eventFormAction },
        ],
      },
      { path: "auth", element: <AuthenticationPage /> },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
