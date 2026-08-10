import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

function MyReservations() {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await api.get("/reservations");
                setReservations(response.data);
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                    "Unable to load reservations."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, []);

    //user handle cancel reservation
    const handleCancel = async (id) => {

    const confirmed = window.confirm(
        "Are you sure you want to cancel this reservation?"
    );

    if (!confirmed) {
        return;
    }

    try {
        setDeletingId(id);
        setError("");

        await api.delete(`/reservations/${id}`);

        setReservations((previous) =>
            previous.filter(
                (reservation) => reservation.id !== id
            )
        );

    } catch (err) {
        setError(
            err.response?.data?.message ||
            "Unable to cancel the reservation."
        );
    } finally {
        setDeletingId(null);
    }};


    if (loading) {
        return (
            <main className="my-reservations-page">
                <div className="reservations-state">
                    Loading your reservations...
                </div>
            </main>
        );
    }

    return (
        <main className="my-reservations-page">

            <section className="my-reservations-header">
                <div>
                    <span className="section-eyebrow">
                        YOUR VISITS
                    </span>

                    <h1>My Reservations</h1>

                    <p>
                        Keep track of your upcoming visits at
                        Premium Cafe.
                    </p>
                </div>

                <Link
                    to="/reservations"
                    className="btn btn-primary"
                >
                    New Reservation
                </Link>
            </section>

            <section className="my-reservations-content">

                {error && (
                    <div className="reservation-message reservation-error">
                        {error}
                    </div>
                )}

                {!error && reservations.length === 0 && (
                    <div className="reservations-empty">
                        <span className="empty-number">00</span>

                        <h2>No reservations yet.</h2>

                        <p>
                            Your next Premium Cafe experience
                            is just a reservation away.
                        </p>

                        <Link
                            to="/reservations"
                            className="btn btn-primary"
                        >
                            Reserve a Table
                        </Link>
                    </div>
                )}

                {!error && reservations.length > 0 && (
                    <div className="reservation-list">

                        {reservations.map((reservation) => (
                            <article
                                className="reservation-card"
                                key={reservation.id}
                            >

                                <div className="reservation-card-date">
                                    <span>
                                        {reservation.reservationDate}
                                    </span>

                                    <strong>
                                        {reservation.reservationDate
                                            ?.split("-")[2]}
                                    </strong>
                                </div>

                                <div className="reservation-card-main">

                                    <div className="reservation-card-heading">
                                        <div>
                                            <span className="panel-eyebrow">
                                                RESERVATION #{reservation.id}
                                            </span>

                                            <h2>
                                                Table {reservation.tableNumber}
                                            </h2>
                                        </div>

                                        <span className="reservation-status-badge">
                                            {reservation.status}
                                        </span>
                                    </div>

                                    <div className="reservation-meta">

                                        <div>
                                            <span>TIME</span>
                                            <strong>
                                                {reservation.reservationTime}
                                            </strong>
                                        </div>

                                        <div>
                                            <span>GUESTS</span>
                                            <strong>
                                                {reservation.guests}
                                            </strong>
                                        </div>

                                        <div>
                                            <span>TABLE</span>
                                            <strong>
                                                {reservation.tableNumber}
                                            </strong>
                                        </div>

                                    </div>

                                    {reservation.specialRequest && (
                                        <div className="reservation-special-request">
                                            <span>
                                                SPECIAL REQUEST
                                            </span>

                                            <p>
                                                {reservation.specialRequest}
                                            </p>
                                        </div>
                                    )}

                                    <div className="reservation-card-footer">

    <span>
        Reservation #{reservation.id}
    </span>

    <button
        type="button"
        className="cancel-reservation"
        disabled={deletingId === reservation.id}
        onClick={() =>
            handleCancel(reservation.id)
        }
    >
        {deletingId === reservation.id
            ? "Cancelling..."
            : "Cancel reservation"}
    </button>

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

export default MyReservations;