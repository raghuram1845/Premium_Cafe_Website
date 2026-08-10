import { useEffect, useState } from "react";
import api from "../services/api";

function Menu() {
    const [menuItems, setMenuItems] = useState([]);
    const [categories, setCategories] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState("ALL");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchMenuData = async () => {
            try {
                setLoading(true);
                setError("");

                const [menuResponse, categoryResponse] =
                    await Promise.all([
                        api.get("/menu-items"),
                        api.get("/categories"),
                    ]);

                setMenuItems(menuResponse.data);
                setCategories(categoryResponse.data);

            } catch (err) {
                setError(
                    err.response?.data?.message ||
                    "Unable to load the menu."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchMenuData();
    }, []);

    const filteredItems =
        selectedCategory === "ALL"
            ? menuItems
            : menuItems.filter(
                  (item) =>
                      item.categoryId ===
                      Number(selectedCategory)
              );

    return (
        <main className="menu-page">

            {/* Page Header */}

            <section className="menu-page-header">

                <span className="section-eyebrow">
                    FROM OUR KITCHEN
                </span>

                <h1>Our Menu</h1>

                <p>
                    Carefully prepared favourites, made with quality
                    ingredients and served with the Premium Cafe touch.
                </p>

            </section>


            {/* Category Filter */}

            <section className="menu-section">

                <div className="category-filter">

                    <button
                        className={
                            selectedCategory === "ALL"
                                ? "category-button active"
                                : "category-button"
                        }
                        onClick={() => setSelectedCategory("ALL")}
                    >
                        All
                    </button>

                    {categories.map((category) => (
                        <button
                            key={category.id}
                            className={
                                selectedCategory ===
                                String(category.id)
                                    ? "category-button active"
                                    : "category-button"
                            }
                            onClick={() =>
                                setSelectedCategory(
                                    String(category.id)
                                )
                            }
                        >
                            {category.name}
                        </button>
                    ))}

                </div>


                {/* Loading */}

                {loading && (
                    <div className="menu-state">
                        <span>Preparing the menu...</span>
                    </div>
                )}


                {/* Error */}

                {!loading && error && (
                    <div className="menu-state menu-error">
                        <h3>Something went wrong</h3>
                        <p>{error}</p>
                    </div>
                )}


                {/* Empty */}

                {!loading &&
                    !error &&
                    filteredItems.length === 0 && (
                        <div className="menu-state">
                            <h3>No items available</h3>
                            <p>
                                There are no menu items in this category
                                right now.
                            </p>
                        </div>
                    )}


                {/* Menu Grid */}

                {!loading &&
                    !error &&
                    filteredItems.length > 0 && (
                        <div className="menu-grid">

                            {filteredItems.map((item) => (
                                <article
                                    className="menu-item-card"
                                    key={item.id}
                                >

                                    <div className="menu-item-image">

                                        {item.imageUrl ? (
                                            <img
                                                src={item.imageUrl}
                                                alt={item.name}
                                            />
                                        ) : (
                                            <div className="menu-image-placeholder">
                                                <span>
                                                    PREMIUM CAFE
                                                </span>
                                            </div>
                                        )}

                                        <span className="menu-category">
                                            {item.categoryName}
                                        </span>

                                        {!item.availability && (
                                            <span className="menu-unavailable">
                                                Currently unavailable
                                            </span>
                                        )}

                                    </div>


                                    <div className="menu-item-content">

                                        <div className="menu-item-top">

                                            <h2>{item.name}</h2>

                                            <span className="menu-item-price">
                                                ₹{item.price}
                                            </span>

                                        </div>

                                        <p>
                                            {item.description ||
                                                "Prepared fresh at Premium Cafe."}
                                        </p>

                                    </div>

                                </article>
                            ))}

                        </div>
                    )}

            </section>

        </main>
    );
}

export default Menu;