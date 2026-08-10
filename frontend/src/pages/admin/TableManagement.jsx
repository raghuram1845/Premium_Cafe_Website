import { useEffect, useState } from "react";
import api from "../../services/api";

const emptyForm = {
    tableNumber: "",
    capacity: "",
    status: "AVAILABLE",
};

function TableManagement() {

    const [tables, setTables] = useState([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [form, setForm] = useState(emptyForm);


    const fetchTables = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await api.get("/tables");

            setTables(response.data);

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Unable to load tables."
            );

        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchTables();
    }, []);


    const openAddModal = () => {

        setEditingId(null);

        setForm({
            tableNumber: "",
            capacity: "",
            status: "AVAILABLE",
        });

        setError("");
        setSuccess("");

        setModalOpen(true);
    };


    const openEditModal = (table) => {

        setEditingId(table.id);

        setForm({
            tableNumber: table.tableNumber || "",
            capacity: table.capacity || "",
            status: table.status || "AVAILABLE",
        });

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
    };


    const handleChange = (event) => {

        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));

        setError("");
        setSuccess("");
    };


    const handleSubmit = async (event) => {

        event.preventDefault();

        setSaving(true);
        setError("");
        setSuccess("");

        try {

            const tableNumber = Number(form.tableNumber);
            const capacity = Number(form.capacity);

            if (!tableNumber || tableNumber <= 0) {

                setError(
                    "Table number must be greater than zero."
                );

                setSaving(false);
                return;
            }

            if (!capacity || capacity <= 0) {

                setError(
                    "Capacity must be greater than zero."
                );

                setSaving(false);
                return;
            }


            const request = {
                tableNumber,
                capacity,
                status: form.status,
            };


            if (editingId) {

                await api.put(
                    `/tables/${editingId}`,
                    request
                );

                setSuccess(
                    "Table updated successfully."
                );

            } else {

                await api.post(
                    "/tables",
                    request
                );

                setSuccess(
                    "Table created successfully."
                );
            }


            await fetchTables();

            setModalOpen(false);
            setEditingId(null);
            setForm(emptyForm);

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Unable to save table."
            );

        } finally {
            setSaving(false);
        }
    };


    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this table?"
        );

        if (!confirmed) {
            return;
        }

        try {

            setError("");
            setSuccess("");

            await api.delete(`/tables/${id}`);

            setTables((previous) =>
                previous.filter(
                    (table) => table.id !== id
                )
            );

            setSuccess(
                "Table deleted successfully."
            );

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Unable to delete table."
            );
        }
    };


    const getStatusClass = (status) => {

        if (status === "AVAILABLE") {
            return "available";
        }

        if (status === "RESERVED") {
            return "reserved";
        }

        if (status === "MAINTENANCE") {
            return "maintenance";
        }

        return "default";
    };


    return (
        <main className="admin-management-page">

            <section className="admin-management-header">

                <div>

                    <span className="section-eyebrow">
                        TABLE MANAGEMENT
                    </span>

                    <h1>
                        Cafe Tables
                    </h1>

                    <p>
                        Manage table numbers, capacity and availability.
                    </p>

                </div>


                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={openAddModal}
                >
                    + Add Table
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


                <div className="admin-table-panel">

                    <div className="admin-panel-header">

                        <div>

                            <span className="panel-eyebrow">
                                CURRENT TABLES
                            </span>

                            <h2>
                                {tables.length} Tables
                            </h2>

                        </div>

                    </div>


                    {loading ? (

                        <div className="admin-empty-state">
                            Loading tables...
                        </div>

                    ) : tables.length === 0 ? (

                        <div className="admin-empty-state">

                            <span>00</span>

                            <h3>
                                No tables yet
                            </h3>

                            <p>
                                Add your first cafe table to get started.
                            </p>

                        </div>

                    ) : (

                        <div className="admin-table-list">

                            {tables.map((table) => (

                                <article
                                    className="admin-table-row"
                                    key={table.id}
                                >

                                    <div className="admin-table-number">

                                        <span>
                                            TABLE
                                        </span>

                                        <strong>
                                            {String(
                                                table.tableNumber
                                            ).padStart(2, "0")}
                                        </strong>

                                    </div>


                                    <div className="admin-table-capacity">

                                        <span className="admin-table-label">
                                            CAPACITY
                                        </span>

                                        <strong>
                                            {table.capacity}
                                        </strong>

                                        <p>
                                            {table.capacity === 1
                                                ? "Guest"
                                                : "Guests"}
                                        </p>

                                    </div>


                                    <div className="admin-table-status">

                                        <span className="admin-table-label">
                                            STATUS
                                        </span>

                                        <span
                                            className={`admin-table-status-badge ${getStatusClass(
                                                table.status
                                            )}`}
                                        >
                                            {table.status}
                                        </span>

                                    </div>


                                    <div className="admin-table-actions">

                                        <button
                                            type="button"
                                            onClick={() =>
                                                openEditModal(table)
                                            }
                                        >
                                            Edit
                                        </button>

                                        <button
                                            type="button"
                                            className="danger"
                                            onClick={() =>
                                                handleDelete(table.id)
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </article>

                            ))}

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
                                        ? "EDIT TABLE"
                                        : "NEW TABLE"}
                                </span>

                                <h2>
                                    {editingId
                                        ? "Update table"
                                        : "Add table"}
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

                            <div className="admin-form-grid">

                                <div className="admin-form-field">

                                    <label htmlFor="tableNumber">
                                        Table Number
                                    </label>

                                    <input
                                        id="tableNumber"
                                        name="tableNumber"
                                        type="number"
                                        min="1"
                                        value={form.tableNumber}
                                        onChange={handleChange}
                                        placeholder="1"
                                        required
                                    />

                                </div>


                                <div className="admin-form-field">

                                    <label htmlFor="capacity">
                                        Capacity
                                    </label>

                                    <input
                                        id="capacity"
                                        name="capacity"
                                        type="number"
                                        min="1"
                                        value={form.capacity}
                                        onChange={handleChange}
                                        placeholder="4"
                                        required
                                    />

                                </div>

                            </div>


                            <div className="admin-form-field">

                                <label htmlFor="status">
                                    Status
                                </label>

                                <select
                                    id="status"
                                    name="status"
                                    value={form.status}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="AVAILABLE">
                                        Available
                                    </option>

                                    <option value="RESERVED">
                                        Reserved
                                    </option>

                                    <option value="MAINTENANCE">
                                        Maintenance
                                    </option>

                                </select>

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
                                            ? "Update Table"
                                            : "Create Table"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </main>
    );
}

export default TableManagement;