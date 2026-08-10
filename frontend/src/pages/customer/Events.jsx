import { useEffect, useState } from "react";
import api from "../../services/api";

function Events() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await api.get("/events");
                setEvents(response.data);
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                    "Unable to load events."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    return (
        <main className="events-page">

            <section className="events-header">
                <span className="section-eyebrow">
                    WHAT'S HAPPENING
                </span>

                <h1>Events & Offers</h1>

                <p>
                    Discover special moments, seasonal experiences
                    and exclusive offers at Premium Cafe.
                </p>
            </section>


            <section className="events-content">

                {loading && (
                    <div className="events-state">
                        Loading events...
                    </div>
                )}

                {error && (
                    <div className="reservation-message reservation-error">
                        {error}
                    </div>
                )}

                {!loading &&
                    !error &&
                    events.length === 0 && (
                        <div className="events-empty">
                            <span className="empty-number">
                                00
                            </span>

                            <h2>No events right now.</h2>

                            <p>
                                Check back soon for our latest
                                cafe experiences and offers.
                            </p>
                        </div>
                    )}

                {!loading &&
                    !error &&
                    events.length > 0 && (
                        <div className="events-grid">

                            {events.map((event) => (
                                <article
                                    className="event-card"
                                    key={event.id}
                                >

                                    <div
                                        className="event-image"
                                        style={
                                            event.imageUrl
                                                ? {
                                                    backgroundImage:
                                                        `url(${event.imageUrl})`,
                                                }
                                                : undefined
                                        }
                                    >
                                        {!event.imageUrl && (
                                            <span className="event-image-placeholder">
                                                PREMIUM CAFE
                                            </span>
                                        )}

                                        <span className="event-discount">
                                            {event.discount}% OFF
                                        </span>
                                    </div>


                                    <div className="event-content">

                                        <div className="event-dates">
                                            {event.startDate}
                                            {" — "}
                                            {event.endDate}
                                        </div>

                                        <h2>
                                            {event.title}
                                        </h2>

                                        {event.description && (
                                            <p>
                                                {event.description}
                                            </p>
                                        )}

                                        <div className="event-footer">

                                            <span>
                                                Special Offer
                                            </span>

                                            <span className="event-offer">
                                                Save {event.discount}%
                                            </span>

                                        </div>

                                    </div>

                                </article>
                            ))}

                        </div>
                    )}

            </section>

        </main>
    );
}

export default Events;