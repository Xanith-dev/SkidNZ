// SKID NZ — Event Data (loaded from API)
// Events are now fetched from the backend at runtime.

const API_URL = "http://localhost:8000"; // Change to your deployed backend URL

let events = []; // populated by fetchEvents()

async function fetchEvents() {
  try {
    const res = await fetch(`${API_URL}/events`);
    if (!res.ok) throw new Error("Failed to fetch events");
    events = await res.json();
    renderEvents("all");
  } catch (err) {
    console.error("Could not load events:", err);
    showToast("COULD NOT LOAD EVENTS — CHECK CONNECTION");
  }
}
