import { useEffect, useState } from "react";
import api from "../../services/api";

const emptyForm = {
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    discount: "",
    active: true,
};

function EventManagement() {

    const [events, setEvents] = useState([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [form, setForm] = useState(emptyForm);

    // Image state
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [existingImageUrl, setExistingImageUrl] = useState("");


    const fetchEvents = async () => {

        try {

            setLoading(true);
            setError("");

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


    useEffect(() => {
        fetchEvents();
    }, []);


    const openAddModal = () => {

        setEditingId(null);
        setForm(emptyForm);

        setImageFile(null);
        setImagePreview("");
        setExistingImageUrl("");

        setError("");
        setSuccess("");

        setModalOpen(true);
    };


    const openEditModal = (event) => {

        setEditingId(event.id);

        setForm({
            title: event.title || "",
            description: event.description || "",
            startDate: event.startDate || "",
            endDate: event.endDate || "",
            discount: event.discount ?? "",
            active: event.active ?? true,
        });

        setImageFile(null);
        setImagePreview(event.imageUrl || "");
        setExistingImageUrl(event.imageUrl || "");

        setError("");
        setSuccess("");

        setModalOpen(true);
    };


    const closeModal = () => {

        if (saving) {
            return;
        }

        setModalOpen(false);
        setEditingId(null);
        setForm(emptyForm);

        setImageFile(null);
        setImagePreview("");
        setExistingImageUrl("");
    };


    const handleChange = (event) => {

        const { name, value, type, checked } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: type === "checkbox"
                ? checked
                : value,
        }));

        setError("");
        setSuccess("");
    };


    const handleImageChange = (event) => {

        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        setError("");
        setSuccess("");

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
        ];

        if (!allowedTypes.includes(file.type)) {

            setError(
                "Please choose a JPG, PNG or WEBP image."
            );

            event.target.value = "";
            return;
        }

        if (file.size > 5 * 1024 * 1024) {

            setError(
                "Image size must be less than 5 MB."
            );

            event.target.value = "";
            return;
        }

        setImageFile(file);

        const previewUrl = URL.createObjectURL(file);

        setImagePreview(previewUrl);
    };


    const removeSelectedImage = () => {

        setImageFile(null);

        if (existingImageUrl) {
            setImagePreview(existingImageUrl);
        } else {
            setImagePreview("");
        }

        const input = document.getElementById(
            "event-image"
        );

        if (input) {
            input.value = "";
        }
    };


    const uploadImage = async () => {

        if (!imageFile) {
            return existingImageUrl;
        }

        const formData = new FormData();

        formData.append("file", imageFile);

        const response = await api.post(
            "/uploads/image",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return response.data.imageUrl;
    };


    const handleSubmit = async (event) => {

        event.preventDefault();

        setSaving(true);
        setError("");
        setSuccess("");

        try {

            const startDate = form.startDate;
            const endDate = form.endDate;
            const discount = Number(form.discount);

            if (!form.title.trim()) {

                setError(
                    "Event title cannot be empty."
                );

                setSaving(false);
                return;
            }

            if (!startDate) {

                setError(
                    "Start date is required."
                );

                setSaving(false);
                return;
            }

            if (!endDate) {

                setError(
                    "End date is required."
                );

                setSaving(false);
                return;
            }

            if (endDate < startDate) {

                setError(
                    "End date cannot be before start date."
                );

                setSaving(false);
                return;
            }

            if (discount < 0 || discount > 100) {

                setError(
                    "Discount must be between 0 and 100."
                );

                setSaving(false);
                return;
            }


            const imageUrl = await uploadImage();


            const request = {
                title: form.title.trim(),
                description: form.description.trim(),
                imageUrl: imageUrl || "",
                startDate,
                endDate,
                discount,
                active: form.active,
            };


            if (editingId) {

                await api.put(
                    `/events/${editingId}`,
                    request
                );

                setSuccess(
                    "Event updated successfully."
                );

            } else {

                await api.post(
                    "/events",
                    request
                );

                setSuccess(
                    "Event created successfully."
                );
            }


            await fetchEvents();

            setModalOpen(false);
            setEditingId(null);
            setForm(emptyForm);

            setImageFile(null);
            setImagePreview("");
            setExistingImageUrl("");

        } catch (err) {

            console.error(
                "EVENT SAVE ERROR:",
                err
            );

            console.error(
                "SERVER RESPONSE:",
                err.response?.data
            );

            setError(
                err.response?.data?.message ||
                err.message ||
                "Unable to save event."
            );

        } finally {
            setSaving(false);
        }
    };


    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this event?"
        );

        if (!confirmed) {
            return;
        }

        try {

            setError("");
            setSuccess("");

            await api.delete(`/events/${id}`);

            setEvents((previous) =>
                previous.filter(
                    (event) => event.id !== id
                )
            );

            setSuccess(
                "Event deleted successfully."
            );

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Unable to delete event."
            );
        }
    };


    const getEventStatus = (event) => {

        if (!event.active) {
            return "INACTIVE";
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const start = new Date(
            `${event.startDate}T00:00:00`
        );

        const end = new Date(
            `${event.endDate}T23:59:59`
        );

        if (today < start) {
            return "UPCOMING";
        }

        if (today > end) {
            return "ENDED";
        }

        return "ACTIVE";
    };


    const getStatusClass = (status) => {

        if (status === "ACTIVE") {
            return "active";
        }

        if (status === "UPCOMING") {
            return "upcoming";
        }

        if (status === "ENDED") {
            return "ended";
        }

        return "inactive";
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


    return (
        <main className="admin-management-page">

            <section className="admin-management-header">

                <div>

                    <span className="section-eyebrow">
                        EVENT MANAGEMENT
                    </span>

                    <h1>
                        Events
                    </h1>

                    <p>
                        Create and manage special offers and cafe experiences.
                    </p>

                </div>


                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={openAddModal}
                >
                    + Add Event
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


                <div className="admin-event-panel">

                    <div className="admin-panel-header">

                        <div>

                            <span className="panel-eyebrow">
                                CAFE EVENTS
                            </span>

                            <h2>
                                {events.length} Events
                            </h2>

                        </div>

                    </div>


                    {loading ? (

                        <div className="admin-empty-state">
                            Loading events...
                        </div>

                    ) : events.length === 0 ? (

                        <div className="admin-empty-state">

                            <span>00</span>

                            <h3>
                                No events yet
                            </h3>

                            <p>
                                Add your first event to get started.
                            </p>

                        </div>

                    ) : (

                        <div className="admin-event-list">

                            {events.map((event) => {

                                const status =
                                    getEventStatus(event);

                                return (
                                    <article
                                        className="admin-event-row"
                                        key={event.id}
                                    >

                                        <div className="admin-event-image">

                                            {event.imageUrl ? (
                                                <img
                                                    src={event.imageUrl}
                                                    alt={event.title}
                                                />
                                            ) : (
                                                <span>
                                                    EVENT
                                                </span>
                                            )}

                                        </div>


                                        <div className="admin-event-info">

                                            <span className="admin-event-label">
                                                EVENT
                                            </span>

                                            <h3>
                                                {event.title}
                                            </h3>

                                            <p>
                                                {event.description ||
                                                    "No description provided."}
                                            </p>

                                        </div>


                                        <div className="admin-event-dates">

                                            <span className="admin-event-label">
                                                DATES
                                            </span>

                                            <strong>
                                                {formatDate(
                                                    event.startDate
                                                )}
                                            </strong>

                                            <p>
                                                to{" "}
                                                {formatDate(
                                                    event.endDate
                                                )}
                                            </p>

                                        </div>


                                        <div className="admin-event-discount">

                                            <span className="admin-event-label">
                                                DISCOUNT
                                            </span>

                                            <strong>
                                                {event.discount}%
                                            </strong>

                                        </div>


                                        <div className="admin-event-status">

                                            <span
                                                className={`admin-event-status-badge ${getStatusClass(
                                                    status
                                                )}`}
                                            >
                                                {status}
                                            </span>

                                        </div>


                                        <div className="admin-event-actions">

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    openEditModal(event)
                                                }
                                            >
                                                Edit
                                            </button>

                                            <button
                                                type="button"
                                                className="danger"
                                                onClick={() =>
                                                    handleDelete(
                                                        event.id
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </article>
                                );
                            })}

                        </div>

                    )}

                </div>

            </section>


            {modalOpen && (

                <div
                    className="admin-modal-overlay"
                    onMouseDown={(event) => {

                        if (
                            event.target === event.currentTarget &&
                            !saving
                        ) {
                            closeModal();
                        }

                    }}
                >

                    <div className="admin-modal">

                        <div className="admin-modal-header">

                            <div>

                                <span className="panel-eyebrow">
                                    {editingId
                                        ? "EDIT EVENT"
                                        : "NEW EVENT"}
                                </span>

                                <h2>
                                    {editingId
                                        ? "Update event"
                                        : "Add event"}
                                </h2>

                            </div>


                            <button
                                type="button"
                                className="admin-modal-close"
                                onClick={closeModal}
                                disabled={saving}
                            >
                                ×
                            </button>

                        </div>


                        <form
                            className="admin-form"
                            onSubmit={handleSubmit}
                        >

                            <div className="admin-form-field">

                                <label htmlFor="event-title">
                                    Event Title
                                </label>

                                <input
                                    id="event-title"
                                    name="title"
                                    type="text"
                                    value={form.title}
                                    onChange={handleChange}
                                    maxLength={150}
                                    placeholder="Weekend Coffee Tasting"
                                    required
                                />

                            </div>


                            <div className="admin-form-field">

                                <label htmlFor="event-description">
                                    Description
                                </label>

                                <textarea
                                    id="event-description"
                                    name="description"
                                    rows="4"
                                    value={form.description}
                                    onChange={handleChange}
                                    maxLength={1000}
                                    placeholder="Describe the event..."
                                />

                            </div>


                            {/* Event Image Upload */}

                            <div className="admin-image-upload">

                                <label>
                                    Event Image
                                </label>

                                <div className="admin-image-upload-box">

                                    {imagePreview ? (

                                        <div className="admin-image-preview">

                                            <img
                                                src={imagePreview}
                                                alt="Event preview"
                                            />

                                            <div className="admin-image-overlay">

                                                <label
                                                    htmlFor="event-image"
                                                    className="admin-image-change"
                                                >
                                                    Change Image
                                                </label>

                                                {imageFile && (
                                                    <button
                                                        type="button"
                                                        onClick={removeSelectedImage}
                                                    >
                                                        Remove
                                                    </button>
                                                )}

                                            </div>

                                        </div>

                                    ) : (

                                        <label
                                            htmlFor="event-image"
                                            className="admin-image-placeholder"
                                        >

                                            <span className="upload-icon">
                                                ↑
                                            </span>

                                            <strong>
                                                Upload event image
                                            </strong>

                                            <span>
                                                JPG, PNG or WEBP · Max 5 MB
                                            </span>

                                        </label>

                                    )}

                                </div>


                                <input
                                    id="event-image"
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={handleImageChange}
                                    className="admin-image-input"
                                />


                                {imageFile && (
                                    <p className="admin-image-selected">
                                        Selected: {imageFile.name}
                                    </p>
                                )}

                            </div>


                            <div className="admin-form-grid">

                                <div className="admin-form-field">

                                    <label htmlFor="startDate">
                                        Start Date
                                    </label>

                                    <input
                                        id="startDate"
                                        name="startDate"
                                        type="date"
                                        value={form.startDate}
                                        onChange={handleChange}
                                        min={
                                            new Date()
                                                .toISOString()
                                                .split("T")[0]
                                        }
                                        required
                                    />

                                </div>


                                <div className="admin-form-field">

                                    <label htmlFor="endDate">
                                        End Date
                                    </label>

                                    <input
                                        id="endDate"
                                        name="endDate"
                                        type="date"
                                        value={form.endDate}
                                        onChange={handleChange}
                                        min={
                                            form.startDate ||
                                            new Date()
                                                .toISOString()
                                                .split("T")[0]
                                        }
                                        required
                                    />

                                </div>

                            </div>


                            <div className="admin-form-grid">

                                <div className="admin-form-field">

                                    <label htmlFor="discount">
                                        Discount (%)
                                    </label>

                                    <input
                                        id="discount"
                                        name="discount"
                                        type="number"
                                        min="0"
                                        max="100"
                                        step="0.01"
                                        value={form.discount}
                                        onChange={handleChange}
                                        placeholder="10"
                                        required
                                    />

                                </div>


                                <div className="admin-form-field">

                                    <label htmlFor="active">
                                        Status
                                    </label>

                                    <select
                                        id="active"
                                        name="active"
                                        value={
                                            form.active
                                                ? "true"
                                                : "false"
                                        }
                                        onChange={(event) =>
                                            setForm((previous) => ({
                                                ...previous,
                                                active:
                                                    event.target.value ===
                                                    "true",
                                            }))
                                        }
                                    >

                                        <option value="true">
                                            Active
                                        </option>

                                        <option value="false">
                                            Inactive
                                        </option>

                                    </select>

                                </div>

                            </div>


                            <div className="admin-modal-actions">

                                <button
                                    type="button"
                                    className="btn btn-light"
                                    onClick={closeModal}
                                    disabled={saving}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="btn btn-dark"
                                    disabled={saving}
                                >
                                    {saving
                                        ? "Saving..."
                                        : editingId
                                            ? "Update Event"
                                            : "Create Event"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </main>
    );
}

export default EventManagement;