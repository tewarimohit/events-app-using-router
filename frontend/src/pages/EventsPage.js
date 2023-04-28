import { json, redirect, useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";

function EventsPage() {
  const data = useLoaderData(); // can be called directly where we want result but parent component
  const events = data.events;

  if (data.isError) {
    return <p>{data.message}</p>;
  }
  return (
    <>
      <EventsList events={events} />
    </>
  );
}

export async function eventsListLoader() {
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
    return resData;
  }
}

export default EventsPage;
