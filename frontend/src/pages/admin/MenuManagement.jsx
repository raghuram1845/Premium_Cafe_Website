import { useEffect, useState } from "react";
import api from "../../services/api";

const emptyForm = {
    name: "",
    description: "",
    price: "",
    availability: true,
    categoryId: "",
};

function MenuManagement() {

    const [menuItems, setMenuItems] = useState([]);
    const [categories, setCategories] = useState([]);

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


    const fetchData = async () => {

        try {

            setLoading(true);
            setError("");

            const [
                menuResponse,
                categoryResponse,
            ] = await Promise.all([
                api.get("/menu-items"),
                api.get("/categories"),
            ]);

            setMenuItems(menuResponse.data);
            setCategories(categoryResponse.data);

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Unable to load menu data."
            );

        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchData();
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


    const openEditModal = (item) => {

        setEditingId(item.id);

        setForm({
            name: item.name || "",
            description: item.description || "",
            price: item.price || "",
            availability: item.availability ?? true,
            categoryId: item.categoryId || "",
        });

        setImageFile(null);
        setImagePreview(item.imageUrl || "");
        setExistingImageUrl(item.imageUrl || "");

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

        // Validate file type
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

        // Validate file size - 5 MB
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
            "menu-image"
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

        console.log("1. Starting menu item save...");

        const imageUrl = await uploadImage();

        console.log("2. Image URL:", imageUrl);

        if (!imageUrl) {
            throw new Error(
                "Please select an image."
            );
        }

        const request = {
            name: form.name.trim(),
            description: form.description.trim(),
            price: Number(form.price),
            imageUrl: imageUrl,
            availability: form.availability,
            categoryId: Number(form.categoryId),
        };

        console.log("3. Menu item request:", request);

        if (editingId) {

            console.log(
                "4. Updating menu item:",
                editingId
            );

            await api.put(
                `/menu-items/${editingId}`,
                request
            );

            console.log("5. Update successful.");

            setSuccess(
                "Menu item updated successfully."
            );

        } else {

            console.log("4. Creating menu item...");

            await api.post(
                "/menu-items",
                request
            );

            console.log("5. Create successful.");

            setSuccess(
                "Menu item created successfully."
            );
        }

        await fetchData();

        setModalOpen(false);
        setEditingId(null);
        setForm(emptyForm);

        setImageFile(null);
        setImagePreview("");
        setExistingImageUrl("");

    } catch (err) {

        console.error(
            "MENU SAVE ERROR:",
            err
        );

        console.error(
            "SERVER RESPONSE:",
            err.response?.data
        );

        setError(
            err.response?.data?.message ||
            err.message ||
            "Unable to save menu item."
        );

    } finally {
        setSaving(false);
    }
    };


    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this menu item?"
        );

        if (!confirmed) {
            return;
        }

        try {

            setError("");
            setSuccess("");

            await api.delete(`/menu-items/${id}`);

            setMenuItems((previous) =>
                previous.filter(
                    (item) => item.id !== id
                )
            );

            setSuccess(
                "Menu item deleted successfully."
            );

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Unable to delete menu item."
            );
        }
    };


    return (
        <main className="admin-management-page">

            <section className="admin-management-header">

                <div>
                    <span className="section-eyebrow">
                        MENU MANAGEMENT
                    </span>

                    <h1>
                        Menu Items
                    </h1>

                    <p>
                        Manage everything served at Premium Cafe.
                    </p>
                </div>

                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={openAddModal}
                >
                    + Add Menu Item
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


                <div className="admin-menu-panel">

                    <div className="admin-panel-header">

                        <div>
                            <span className="panel-eyebrow">
                                CURRENT MENU
                            </span>

                            <h2>
                                {menuItems.length} Items
                            </h2>
                        </div>

                    </div>


                    {loading ? (

                        <div className="admin-empty-state">
                            Loading menu items...
                        </div>

                    ) : menuItems.length === 0 ? (

                        <div className="admin-empty-state">

                            <span>00</span>

                            <h3>
                                No menu items yet
                            </h3>

                            <p>
                                Add your first menu item to get started.
                            </p>

                        </div>

                    ) : (

                        <div className="admin-menu-list">

                            {menuItems.map((item) => (

                                <article
                                    className="admin-menu-row"
                                    key={item.id}
                                >

                                    <div className="admin-menu-image">

                                        {item.imageUrl ? (
                                            <img
                                                src={item.imageUrl}
                                                alt={item.name}
                                            />
                                        ) : (
                                            <span>
                                                CAFE
                                            </span>
                                        )}

                                    </div>


                                    <div className="admin-menu-info">

                                        <span className="admin-menu-category">
                                            {item.categoryName}
                                        </span>

                                        <h3>
                                            {item.name}
                                        </h3>

                                        <p>
                                            {item.description}
                                        </p>

                                    </div>


                                    <div className="admin-menu-price">
                                        ₹{Number(item.price).toFixed(2)}
                                    </div>


                                    <div
                                        className={
                                            item.availability
                                                ? "admin-status available"
                                                : "admin-status unavailable"
                                        }
                                    >
                                        {item.availability
                                            ? "Available"
                                            : "Unavailable"}
                                    </div>


                                    <div className="admin-menu-actions">

                                        <button
                                            type="button"
                                            onClick={() =>
                                                openEditModal(item)
                                            }
                                        >
                                            Edit
                                        </button>

                                        <button
                                            type="button"
                                            className="danger"
                                            onClick={() =>
                                                handleDelete(item.id)
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
                                        ? "EDIT MENU ITEM"
                                        : "NEW MENU ITEM"}
                                </span>

                                <h2>
                                    {editingId
                                        ? "Update item"
                                        : "Add to menu"}
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

                                    <label htmlFor="name">
                                        Name
                                    </label>

                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Cappuccino"
                                        required
                                    />

                                </div>


                                <div className="admin-form-field">

                                    <label htmlFor="price">
                                        Price
                                    </label>

                                    <input
                                        id="price"
                                        name="price"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={form.price}
                                        onChange={handleChange}
                                        placeholder="180"
                                        required
                                    />

                                </div>


                                <div className="admin-form-field">

                                    <label htmlFor="categoryId">
                                        Category
                                    </label>

                                    <select
                                        id="categoryId"
                                        name="categoryId"
                                        value={form.categoryId}
                                        onChange={handleChange}
                                        required
                                    >

                                        <option value="">
                                            Select category
                                        </option>

                                        {categories.map((category) => (
                                            <option
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </option>
                                        ))}

                                    </select>

                                </div>

                            </div>


                            {/* Image Upload */}

                            <div className="admin-image-upload">

                                <label>
                                    Menu Image
                                </label>

                                <div className="admin-image-upload-box">

                                    {imagePreview ? (

                                        <div className="admin-image-preview">

                                            <img
                                                src={imagePreview}
                                                alt="Menu preview"
                                            />

                                            <div className="admin-image-overlay">

                                                <label
                                                    htmlFor="menu-image"
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
                                            htmlFor="menu-image"
                                            className="admin-image-placeholder"
                                        >

                                            <span className="upload-icon">
                                                ↑
                                            </span>

                                            <strong>
                                                Upload menu image
                                            </strong>

                                            <span>
                                                JPG, PNG or WEBP · Max 5 MB
                                            </span>

                                        </label>

                                    )}

                                </div>


                                <input
                                    id="menu-image"
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


                            <div className="admin-form-field">

                                <label htmlFor="description">
                                    Description
                                </label>

                                <textarea
                                    id="description"
                                    name="description"
                                    rows="4"
                                    value={form.description}
                                    onChange={handleChange}
                                    placeholder="Describe the menu item..."
                                />

                            </div>


                            <label className="admin-checkbox">

                                <input
                                    type="checkbox"
                                    name="availability"
                                    checked={form.availability}
                                    onChange={handleChange}
                                />

                                <span>
                                    Available for customers
                                </span>

                            </label>


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
                                            ? "Update Item"
                                            : "Create Item"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </main>
    );
}

export default MenuManagement;