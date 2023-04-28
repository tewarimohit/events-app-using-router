import React from "react";
import EventForm from "../components/EventForm";
import { json, redirect } from "react-router-dom";

const NewEventPage = () => {
  return <EventForm />;
};

export default NewEventPage;
export async function eventFormAction({ request, params }) {
  const data = await request.formData();
  const requestData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };
  const response = await fetch("http://localhost:8080/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestData),
  });

  if (response.status === 422) {
    console.log("here", response);
    return response;
  }
  if (!response.ok) {
    throw json({ message: "Could not save event.." }, { status: 500 });
  }

  return redirect("/events");
}
