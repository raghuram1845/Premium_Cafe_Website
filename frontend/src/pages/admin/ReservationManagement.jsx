import { useEffect, useState } from "react";
import api from "../../services/api";

function ReservationManagement() {

    const [reservations, setReservations] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const fetchReservations = async () => {

        try {

            setLoading(true);
            setError("");

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


    useEffect(() => {
        fetchReservations();
    }, []);


    const handleApprove = async (id) => {

    const confirmed = window.confirm(
        "Approve this reservation?"
    );

    if (!confirmed) {
        return;
    }

    try {

        setError("");
        setSuccess("");

        const response = await api.put(
            `/reservations/${id}/approve`
        );

        setReservations((previous) =>
            previous.map((reservation) =>
                reservation.id === id
                    ? response.data
                    : reservation
            )
        );

        setSuccess(
            "Reservation approved successfully."
        );

    } catch (err) {

        setError(
            err.response?.data?.message ||
            "Unable to approve reservation."
        );
    }
    };

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to cancel this reservation?"
        );

        if (!confirmed) {
            return;
        }

        try {

            setError("");
            setSuccess("");

            await api.delete(`/reservations/${id}`);

            setReservations((previous) =>
                previous.filter(
                    (reservation) =>
                        reservation.id !== id
                )
            );

            setSuccess(
                "Reservation cancelled successfully."
            );

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Unable to cancel reservation."
            );
        }
    };


    const formatDate = (date) => {

        if (!date) {
            return "—";
        }

        return new Date(`${date}T00:00:00`)
            .toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            });
    };


    const formatTime = (time) => {

        if (!time) {
            return "—";
        }

        const [hours, minutes] = time.split(":");

        const date = new Date();

        date.setHours(
            Number(hours),
            Number(minutes),
            0,
            0
        );

        return date.toLocaleTimeString("en-IN", {
            hour: "numeric",
            minute: "2-digit",
        });
    };


    const getStatusClass = (status) => {

        if (status === "PENDING") {
            return "pending";
        }

        if (status === "APPROVED") {
            return "confirmed";
        }

        if (status === "CANCELLED") {
            return "cancelled";
        }

        return "default";
    };


    return (
        <main className="admin-management-page">

            <section className="admin-management-header">

                <div>

                    <span className="section-eyebrow">
                        RESERVATION MANAGEMENT
                    </span>

                    <h1>
                        Reservations
                    </h1>

                    <p>
                        View and manage customer table reservations.
                    </p>

                </div>


                <button
                    type="button"
                    className="btn btn-light admin-refresh-button"
                    onClick={fetchReservations}
                    disabled={loading}
                >
                    {loading ? "Refreshing..." : "Refresh"}
                </button>

            </section>


            <section className="admin-management-content">

                {error && (
                    <div className="admin-message admin-message-error">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="admin-message admin-message-success">
                        {success}
                    </div>
                )}


                <div className="admin-reservation-panel">

                    <div className="admin-panel-header">

                        <div>

                            <span className="panel-eyebrow">
                                ALL RESERVATIONS
                            </span>

                            <h2>
                                {reservations.length} Reservations
                            </h2>

                        </div>

                    </div>


                    {loading ? (

                        <div className="admin-empty-state">
                            Loading reservations...
                        </div>

                    ) : reservations.length === 0 ? (

                        <div className="admin-empty-state">

                            <span>00</span>

                            <h3>
                                No reservations
                            </h3>

                            <p>
                                Customer reservations will appear here.
                            </p>

                        </div>

                    ) : (

                        <div className="admin-reservation-list">

                            {reservations.map((reservation) => (

                                <article
                                    className="admin-reservation-row"
                                    key={reservation.id}
                                >

                                    <div className="admin-reservation-number">

                                        <span>
                                            RESERVATION
                                        </span>

                                        <strong>
                                            #{reservation.id}
                                        </strong>

                                    </div>


                                    <div className="admin-reservation-customer">

                                        <span className="admin-reservation-label">
                                            CUSTOMER
                                        </span>

                                        <h3>
                                            {reservation.userName ||
                                                "Unknown customer"}
                                        </h3>

                                        <p>
                                            {reservation.guests}{" "}
                                            {reservation.guests === 1
                                                ? "Guest"
                                                : "Guests"}
                                        </p>

                                    </div>


                                    <div className="admin-reservation-date">

                                        <span className="admin-reservation-label">
                                            DATE & TIME
                                        </span>

                                        <strong>
                                            {formatDate(
                                                reservation.reservationDate
                                            )}
                                        </strong>

                                        <p>
                                            {formatTime(
                                                reservation.reservationTime
                                            )}
                                        </p>

                                    </div>


                                    <div className="admin-reservation-table">

                                        <span className="admin-reservation-label">
                                            TABLE
                                        </span>

                                        <strong>
                                            {reservation.tableNumber
                                                ? `Table ${reservation.tableNumber}`
                                                : "—"}
                                        </strong>

                                    </div>


                                    <div className="admin-reservation-status">

                                        <span className="admin-reservation-label">
                                            STATUS
                                        </span>

                                        <span
                                            className={`admin-status-badge ${getStatusClass(
                                                reservation.status
                                            )}`}
                                        >
                                            {reservation.status}
                                        </span>

                                    </div>


                                    <div className="admin-reservation-actions">

                                        {reservation.specialRequest && (
                                        <button
                                        type="button"
                                        className="admin-view-request"
                                        title={reservation.specialRequest}
                                        onClick={() =>
                                        window.alert(
                                            `Special request:\n\n${reservation.specialRequest}`
                                        )
                                    }
                                        >
                                        Request
                                </button>
                                )}

                                    {reservation.status === "PENDING" && (
                                <button
                                type="button"
                                className="admin-confirm-button"
                                onClick={() =>
                                handleApprove(reservation.id)
                                }
                            >
                            Approve
                        </button>
                        )}

                        {reservation.status !== "CANCELLED" && (
                        <button
                        type="button"
                        className="danger"
                        onClick={() =>
                            handleDelete(reservation.id)
                        }
                        >
                        Cancel
                        </button>
                )}

            </div>

                                </article>

                            ))}

                        </div>

                    )}

                </div>

            </section>

        </main>
    );
}

export default ReservationManagement;