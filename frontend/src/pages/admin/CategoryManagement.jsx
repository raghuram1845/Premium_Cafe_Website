import { useEffect, useState } from "react";
import api from "../../services/api";

const emptyForm = {
    name: "",
    description: "",
};

function CategoryManagement() {

    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [form, setForm] = useState(emptyForm);


    const fetchCategories = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await api.get("/categories");

            setCategories(response.data);

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Unable to load categories."
            );

        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchCategories();
    }, []);


    const openAddModal = () => {

        setEditingId(null);
        setForm(emptyForm);

        setError("");
        setSuccess("");

        setModalOpen(true);
    };


    const openEditModal = (category) => {

        setEditingId(category.id);

        setForm({
            name: category.name || "",
            description: category.description || "",
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

            const request = {
                name: form.name.trim(),
                description: form.description.trim(),
            };


            if (!request.name) {

                setError(
                    "Category name cannot be empty."
                );

                setSaving(false);
                return;
            }


            if (request.name.length > 100) {

                setError(
                    "Category name cannot exceed 100 characters."
                );

                setSaving(false);
                return;
            }


            if (request.description.length > 500) {

                setError(
                    "Description cannot exceed 500 characters."
                );

                setSaving(false);
                return;
            }


            if (editingId) {

                await api.put(
                    `/categories/${editingId}`,
                    request
                );

                setSuccess(
                    "Category updated successfully."
                );

            } else {

                await api.post(
                    "/categories",
                    request
                );

                setSuccess(
                    "Category created successfully."
                );
            }


            await fetchCategories();

            setModalOpen(false);
            setEditingId(null);
            setForm(emptyForm);

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Unable to save category."
            );

        } finally {
            setSaving(false);
        }
    };


    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this category?"
        );

        if (!confirmed) {
            return;
        }

        try {

            setError("");
            setSuccess("");

            await api.delete(`/categories/${id}`);

            setCategories((previous) =>
                previous.filter(
                    (category) => category.id !== id
                )
            );

            setSuccess(
                "Category deleted successfully."
            );

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Unable to delete category."
            );
        }
    };


    return (
        <main className="admin-management-page">

            <section className="admin-management-header">

                <div>

                    <span className="section-eyebrow">
                        CATEGORY MANAGEMENT
                    </span>

                    <h1>
                        Categories
                    </h1>

                    <p>
                        Organize the menu into clear and elegant categories.
                    </p>

                </div>


                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={openAddModal}
                >
                    + Add Category
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


                <div className="admin-category-panel">

                    <div className="admin-panel-header">

                        <div>

                            <span className="panel-eyebrow">
                                CURRENT CATEGORIES
                            </span>

                            <h2>
                                {categories.length} Categories
                            </h2>

                        </div>

                    </div>


                    {loading ? (

                        <div className="admin-empty-state">
                            Loading categories...
                        </div>

                    ) : categories.length === 0 ? (

                        <div className="admin-empty-state">

                            <span>00</span>

                            <h3>
                                No categories yet
                            </h3>

                            <p>
                                Add your first category to organize the menu.
                            </p>

                        </div>

                    ) : (

                        <div className="admin-category-list">

                            {categories.map((category) => (

                                <article
                                    className="admin-category-row"
                                    key={category.id}
                                >

                                    <div className="admin-category-number">
                                        {String(category.id).padStart(2, "0")}
                                    </div>


                                    <div className="admin-category-info">

                                        <h3>
                                            {category.name}
                                        </h3>

                                        <p>
                                            {category.description ||
                                                "No description provided."}
                                        </p>

                                    </div>


                                    <div className="admin-category-date">

                                        Created

                                        <strong>
                                            {new Date(
                                                category.createdAt
                                            ).toLocaleDateString()}
                                        </strong>

                                    </div>


                                    <div className="admin-category-actions">

                                        <button
                                            type="button"
                                            onClick={() =>
                                                openEditModal(category)
                                            }
                                        >
                                            Edit
                                        </button>

                                        <button
                                            type="button"
                                            className="danger"
                                            onClick={() =>
                                                handleDelete(category.id)
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
                                        ? "EDIT CATEGORY"
                                        : "NEW CATEGORY"}
                                </span>

                                <h2>
                                    {editingId
                                        ? "Update category"
                                        : "Add category"}
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

                                <label htmlFor="category-name">
                                    Category Name
                                </label>

                                <input
                                    id="category-name"
                                    name="name"
                                    type="text"
                                    value={form.name}
                                    onChange={handleChange}
                                    maxLength={100}
                                    placeholder="Coffee"
                                    required
                                />

                                <span className="admin-character-count">
                                    {form.name.length}/100
                                </span>

                            </div>


                            <div className="admin-form-field">

                                <label htmlFor="category-description">
                                    Description
                                </label>

                                <textarea
                                    id="category-description"
                                    name="description"
                                    rows="5"
                                    value={form.description}
                                    onChange={handleChange}
                                    maxLength={500}
                                    placeholder="Specialty coffee, espresso and handcrafted beverages..."
                                />

                                <span className="admin-character-count">
                                    {form.description.length}/500
                                </span>

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
                                            ? "Update Category"
                                            : "Create Category"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </main>
    );
}

export default CategoryManagement;