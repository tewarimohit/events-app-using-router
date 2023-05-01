import React from "react";
import {
  json,
  redirect,
  useLoaderData,
  useParams,
  useRouteLoaderData,
} from "react-router-dom";
import EventItem from "../components/EventItem";
import { getAuthToken } from "../util/auth";

const EventDetailPage = () => {
  const params = useParams();
  const data = useRouteLoaderData("event-detail");
  const event = data.event;
  return (
    <>
      <EventItem event={event} />
    </>
  );
};

export async function loadEventItems({ request, params }) {
  const eventId = params.eventId;
  const response = await fetch(`http://localhost:8080/events/${eventId}`);
  if (!response.ok) {
    throw json(
      { message: "Could not fetch details of selected event" },
      { status: 500 }
    );
  } else {
    return response;
  }
}

export async function deleteEventAction({ request, params }) {
  const id = params.eventId;
  const token = getAuthToken();
  const response = await fetch(`http://localhost:8080/events/${id}`, {
    method: request.method,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  if (!response.ok) {
    throw json(
      { message: "Can't delete event..." },
      {
        status: 500,
      }
    );
  }
  return redirect("/events");
}

export default EventDetailPage;
