import { Await, defer, json, redirect, useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

function EventsPage() {
  const { events } = useLoaderData(); // can be called directly where we want result but parent component
  // const events = data.events;

  // if (data.isError) {
  //   return <p>{data.message}</p>;
  // }
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

async function loader() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // return { isError: true, message: "Could not load Events.." };
    // throw new Response(JSON.stringify({ message: "Can't Fetch events..." }), {
    //   status: 500,
    // });
    throw json(
      { message: "Can't Fetch events..." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export function eventsListLoader() {
  return defer({ events: loader() }); // load component before data is there
}

export default EventsPage;
