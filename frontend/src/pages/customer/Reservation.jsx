import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function Reservation() {
    const navigate = useNavigate();

    const [tables, setTables] = useState([]);
    const [loadingTables, setLoadingTables] = useState(false);

    const [form, setForm] = useState({
        reservationDate: "",
        reservationTime: "",
        guests: 2,
        specialRequest: "",
        cafeTableId: "",
    });

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    //

    const fetchAvailableTables = async () => {

    if (
        !form.reservationDate ||
        !form.reservationTime ||
        !form.guests
    ) {
        setTables([]);
        return;
    }

    try {
        setLoadingTables(true);
        setError("");

        const response = await api.get("/tables/available", {
            params: {
                date: form.reservationDate,
                time: form.reservationTime,
                guests: Number(form.guests),
            },
        });

        setTables(response.data);

        setForm((previous) => ({
            ...previous,
            cafeTableId: "",
        }));

    } catch (err) {
        setTables([]);

        setError(
            err.response?.data?.message ||
            "Unable to find available tables."
        );
    } finally {
        setLoadingTables(false);
    }
    };

    const handleChange = (event) => {

    const { name, value } = event.target;

    setForm((previous) => ({
        ...previous,
        [name]: value,
    }));

    setError("");

    if (
        name === "reservationDate" ||
        name === "reservationTime" ||
        name === "guests"
    ) {
        setTables([]);

        setForm((previous) => ({
            ...previous,
            [name]: value,
            cafeTableId: "",
        }));
    }
    };

    const handleTableSelect = (tableId) => {
        setForm((previous) => ({
            ...previous,
            cafeTableId: String(tableId),
        }));

        setError("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setSuccess("");

        if (!form.cafeTableId) {
            setError("Please select a table.");
            return;
        }

        try {
            setSubmitting(true);

            const request = {
                reservationDate: form.reservationDate,
                reservationTime: form.reservationTime,
                guests: Number(form.guests),
                specialRequest: form.specialRequest,
                cafeTableId: Number(form.cafeTableId),
            };

            await api.post("/reservations", request);

            setSuccess("Your reservation has been created successfully.");

            setTimeout(() => {
                navigate("/my-reservations");
            }, 1200);

        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to create your reservation."
            );
        } finally {
            setSubmitting(false);
        }
    };

    const availableTables = tables;

    return (
        <main className="reservation-page">

            <section className="reservation-page-header">
                <span className="section-eyebrow">
                    YOUR NEXT VISIT
                </span>

                <h1>Reserve a Table</h1>

                <p>
                    Choose your preferred date, time and table.
                    We'll take care of the rest.
                </p>
            </section>


            <section className="reservation-container">

                <form
                    className="reservation-form-card"
                    onSubmit={handleSubmit}
                >

                    <div className="reservation-form-heading">
                        <span className="panel-eyebrow">
                            RESERVATION DETAILS
                        </span>

                        <h2>Plan your visit</h2>
                    </div>


                    {error && (
                        <div className="reservation-message reservation-error">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="reservation-message reservation-success">
                            {success}
                        </div>
                    )}


                    <div className="reservation-form-grid">

                        <div className="reservation-field">
                            <label htmlFor="reservationDate">
                                Date
                            </label>

                            <input
                                id="reservationDate"
                                name="reservationDate"
                                type="date"
                                value={form.reservationDate}
                                onChange={handleChange}
                                required
                            />
                        </div>


                        <div className="reservation-field">
                            <label htmlFor="reservationTime">
                                Time
                            </label>

                            <input
                                id="reservationTime"
                                name="reservationTime"
                                type="time"
                                value={form.reservationTime}
                                onChange={handleChange}
                                required
                            />
                        </div>


                        <div className="reservation-field">
                            <label htmlFor="guests">
                                Guests
                            </label>

                            <input
                                id="guests"
                                name="guests"
                                type="number"
                                min="1"
                                value={form.guests}
                                onChange={handleChange}
                                required
                            />
                        </div>

                    </div>

                    <div className="find-tables-wrapper">
                        <button
                        type="button"
                            className="btn btn-dark"
                             onClick={fetchAvailableTables}
                                disabled={
                                    !form.reservationDate ||
                                    !form.reservationTime ||
                                    !form.guests ||
                                    loadingTables
                                }
                                    >
                            {loadingTables
                                ? "Finding tables..."
                                : "Find Available Tables"}
                        </button>
                    </div>


                    <div className="reservation-field">

                        <label>
                            Choose your table   
                        </label>

                    {loadingTables ? (
                    <div className="table-loading">
                                Finding tables for your selected time...
                    </div>
                    ) : !form.reservationDate ||
                         !form.reservationTime ||
                         !form.guests ? (
                        <div className="table-empty">
                            Select your date, time and number of guests
                                        to find available tables.
                            </div>
                        ) : availableTables.length === 0 ? (
                        <div className="table-empty">
                             No tables are available for this date and time.
                        </div>
                            ) : (
                        <div className="table-grid">

                                {availableTables.map((table) => (
                                    <button
                                        type="button"
                                        key={table.id}
                                        className={
                                            form.cafeTableId ===
                                            String(table.id)
                                                ? "table-option selected"
                                                : "table-option"
                                        }
                                        onClick={() =>
                                            handleTableSelect(table.id)
                                        }
                                    >
                                        <span className="table-number">
                                            {String(table.tableNumber).padStart(
                                                2,
                                                "0"
                                            )}
                                        </span>

                                        <span className="table-info">
                                            Table {table.tableNumber}
                                        </span>

                                        <span className="table-capacity">
                                            Up to {table.capacity} guests
                                        </span>
                                    </button>
                                ))}

                            </div>
                        )}

                    </div>


                    <div className="reservation-field">

                        <label htmlFor="specialRequest">
                            Special request
                            <span> Optional</span>
                        </label>

                        <textarea
                            id="specialRequest"
                            name="specialRequest"
                            value={form.specialRequest}
                            onChange={handleChange}
                            placeholder="Birthday celebration, window seat, dietary request..."
                            rows="4"
                        />

                    </div>


                    <div className="reservation-submit">

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={
                                submitting ||
                                loadingTables ||
                                availableTables.length === 0
                            }
                        >
                            {submitting
                                ? "Creating reservation..."
                                : "Confirm Reservation"}
                        </button>

                    </div>

                </form>


                <aside className="reservation-info">

                    <span className="panel-eyebrow">
                        PREMIUM CAFE
                    </span>

                    <h2>
                        Your table is
                        <br />
                        waiting.
                    </h2>

                    <p>
                        Take your time, choose your table and let us
                        prepare the perfect setting for your visit.
                    </p>

                    <div className="reservation-info-line"></div>

                    <div className="reservation-info-item">
                        <span>01</span>
                        <p>Select your preferred date and time.</p>
                    </div>

                    <div className="reservation-info-item">
                        <span>02</span>
                        <p>Choose a table that suits your party.</p>
                    </div>

                    <div className="reservation-info-item">
                        <span>03</span>
                        <p>Confirm your reservation.</p>
                    </div>

                </aside>

            </section>

        </main>
    );
}

export default Reservation;