import { useEffect, useState } from "react";
import api from "../../services/api";

function ContactManagement() {

    const [contacts, setContacts] = useState([]);

    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    const fetchContacts = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await api.get("/contacts");

            setContacts(response.data);

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Unable to load messages."
            );

        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchContacts();
    }, []);


    const handleStatusChange = async (contact, status) => {

    try {

        setUpdatingId(contact.id);
        setError("");
        setSuccess("");

        const response = await api.patch(
            `/contacts/${contact.id}/status`,
            {
                status: status,
            }
        );

        setContacts((previous) =>
            previous.map((item) =>
                item.id === contact.id
                    ? response.data
                    : item
            )
        );

        setSuccess(
            "Message status updated successfully."
        );

    } catch (err) {

        setError(
            err.response?.data?.message ||
            "Unable to update message status."
        );

    } finally {
        setUpdatingId(null);
    }
};


    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this message?"
        );

        if (!confirmed) {
            return;
        }

        try {

            setError("");
            setSuccess("");

            await api.delete(`/contacts/${id}`);

            setContacts((previous) =>
                previous.filter(
                    (contact) => contact.id !== id
                )
            );

            setSuccess(
                "Message deleted successfully."
            );

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Unable to delete message."
            );
        }
    };


    const formatDate = (date) => {

        if (!date) {
            return "—";
        }

        return new Date(date)
            .toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
            });
    };


    const getStatusClass = (status) => {

        if (status === "NEW") {
            return "pending";
        }

        if (status === "IN_PROGRESS") {
            return "confirmed";
        }

        if (status === "RESOLVED") {
            return "active";
        }

        return "default";
    };


    const getStatusTitle = (status) => {

        if (status === "NEW") {
            return "New Messages";
        }

        if (status === "IN_PROGRESS") {
            return "In Progress";
        }

        if (status === "RESOLVED") {
            return "Resolved";
        }

        return status;
    };


    const getStatusDescription = (status) => {

        if (status === "NEW") {
            return "Messages waiting for your attention.";
        }

        if (status === "IN_PROGRESS") {
            return "Messages currently being handled.";
        }

        if (status === "RESOLVED") {
            return "Messages that have been completed.";
        }

        return "";
    };


    const groupedContacts = {
        NEW: contacts.filter(
            (contact) => contact.status === "NEW"
        ),

        IN_PROGRESS: contacts.filter(
            (contact) => contact.status === "IN_PROGRESS"
        ),

        RESOLVED: contacts.filter(
            (contact) => contact.status === "RESOLVED"
        ),
    };


    const renderContact = (contact) => {

        return (
            <article
                className="admin-contact-card"
                key={contact.id}
            >

                {/* Card Header */}

                <div className="admin-contact-card-header">

                    <div className="admin-contact-customer">

                        <div className="admin-contact-avatar">
                            {contact.name
                                ? contact.name
                                    .charAt(0)
                                    .toUpperCase()
                                : "?"}
                        </div>

                        <div>

                            <h3>
                                {contact.name}
                            </h3>

                            <p>
                                {contact.email}
                            </p>

                        </div>

                    </div>


                    <div className="admin-contact-meta">

                        <span
                            className={`admin-status-badge ${getStatusClass(
                                contact.status
                            )}`}
                        >
                            {contact.status}
                        </span>

                        <span className="admin-contact-date">
                            {formatDate(contact.createdAt)}
                        </span>

                    </div>

                </div>


                {/* Contact Information */}

                <div className="admin-contact-details">

                    <div className="admin-contact-detail">

                        <span>
                            PHONE
                        </span>

                        <strong>
                            {contact.phone || "—"}
                        </strong>

                    </div>


                    <div className="admin-contact-detail">

                        <span>
                            SUBJECT
                        </span>

                        <strong>
                            {contact.subject}
                        </strong>

                    </div>

                </div>


                {/* Message */}

                <div className="admin-contact-message">

                    <span>
                        MESSAGE
                    </span>

                    <p>
                        {contact.message}
                    </p>

                </div>


                {/* Actions */}

                <div className="admin-contact-card-actions">

                    <div className="admin-contact-status-control">

                        <label htmlFor={`status-${contact.id}`}>
                            Update status
                        </label>

                        <select
                            id={`status-${contact.id}`}
                            value={contact.status}
                            disabled={
                                updatingId === contact.id
                            }
                            onChange={(event) =>
                                handleStatusChange(
                                    contact,
                                    event.target.value
                                )
                            }
                        >

                            <option value="NEW">
                                New
                            </option>

                            <option value="IN_PROGRESS">
                                In Progress
                            </option>

                            <option value="RESOLVED">
                                Resolved
                            </option>

                        </select>

                    </div>


                    <button
                        type="button"
                        className="danger"
                        onClick={() =>
                            handleDelete(contact.id)
                        }
                    >
                        Delete
                    </button>

                </div>

            </article>
        );
    };


    const renderSection = (status) => {

        const sectionContacts =
            groupedContacts[status];

        return (
            <section
                className="admin-contact-section"
                key={status}
            >

                <div className="admin-contact-section-header">

                    <div>

                        <span className="panel-eyebrow">
                            {status.replace("_", " ")}
                        </span>

                        <h2>
                            {getStatusTitle(status)}
                        </h2>

                        <p>
                            {getStatusDescription(status)}
                        </p>

                    </div>


                    <strong className="admin-contact-count">
                        {sectionContacts.length}
                    </strong>

                </div>


                {sectionContacts.length === 0 ? (

                    <div className="admin-contact-section-empty">

                        <span>
                            00
                        </span>

                        <p>
                            No {status
                                .toLowerCase()
                                .replace("_", " ")}{" "}
                            messages.
                        </p>

                    </div>

                ) : (

                    <div className="admin-contact-cards">

                        {sectionContacts.map(
                            renderContact
                        )}

                    </div>

                )}

            </section>
        );
    };


    return (
        <main className="admin-management-page">

            {/* Page Header */}

            <section className="admin-management-header">

                <div>

                    <span className="section-eyebrow">
                        MESSAGE MANAGEMENT
                    </span>

                    <h1>
                        Customer Messages
                    </h1>

                    <p>
                        View and manage customer enquiries
                        and contact messages.
                    </p>

                </div>


                <button
                    type="button"
                    className="btn btn-light admin-refresh-button"
                    onClick={fetchContacts}
                    disabled={loading}
                >
                    {loading
                        ? "Refreshing..."
                        : "Refresh"}
                </button>

            </section>


            {/* Messages */}

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


                {loading ? (

                    <div className="admin-empty-state">

                        <span>
                            ...
                        </span>

                        <h3>
                            Loading messages
                        </h3>

                        <p>
                            Fetching customer enquiries.
                        </p>

                    </div>

                ) : contacts.length === 0 ? (

                    <div className="admin-empty-state">

                        <span>
                            00
                        </span>

                        <h3>
                            No messages
                        </h3>

                        <p>
                            Customer messages will appear here.
                        </p>

                    </div>

                ) : (

                    <div className="admin-contact-sections">

                        {renderSection("NEW")}

                        {renderSection("IN_PROGRESS")}

                        {renderSection("RESOLVED")}

                    </div>

                )}

            </section>

        </main>
    );
}

export default ContactManagement;