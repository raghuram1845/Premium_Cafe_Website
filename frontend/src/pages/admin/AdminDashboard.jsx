import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

function AdminDashboard() {

    const [stats, setStats] = useState({
        menuItems: 0,
        categories: 0,
        tables: 0,
        events: 0,
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchStats = async () => {

            try {

                const [
                    menuResponse,
                    categoryResponse,
                    tableResponse,
                    eventResponse,
                ] = await Promise.all([
                    api.get("/menu-items"),
                    api.get("/categories"),
                    api.get("/tables"),
                    api.get("/events"),
                ]);

                setStats({
                    menuItems: menuResponse.data.length,
                    categories: categoryResponse.data.length,
                    tables: tableResponse.data.length,
                    events: eventResponse.data.length,
                });

            } catch (err) {

                setError(
                    err.response?.data?.message ||
                    "Unable to load dashboard data."
                );

            } finally {
                setLoading(false);
            }
        };

        fetchStats();

    }, []);

    return (
        <main className="admin-page">

            <section className="admin-header">

                <div>
                    <span className="section-eyebrow">
                        ADMINISTRATION
                    </span>

                    <h1>
                        Cafe Overview
                    </h1>

                    <p>
                        Manage your cafe, menu, reservations and
                        customer experience from one place.
                    </p>
                </div>

            </section>


            {error && (
                <div className="admin-error">
                    {error}
                </div>
            )}


            <section className="admin-stats">

                <div className="admin-stat-card">
                    <span>MENU ITEMS</span>

                    <strong>
                        {loading ? "—" : stats.menuItems}
                    </strong>

                    <p>
                        Items currently listed
                    </p>
                </div>


                <div className="admin-stat-card">
                    <span>CATEGORIES</span>

                    <strong>
                        {loading ? "—" : stats.categories}
                    </strong>

                    <p>
                        Menu categories
                    </p>
                </div>


                <div className="admin-stat-card">
                    <span>TABLES</span>

                    <strong>
                        {loading ? "—" : stats.tables}
                    </strong>

                    <p>
                        Cafe tables
                    </p>
                </div>


                <div className="admin-stat-card">
                    <span>EVENTS</span>

                    <strong>
                        {loading ? "—" : stats.events}
                    </strong>

                    <p>
                        Active experiences
                    </p>
                </div>

            </section>


            <section className="admin-management">

    <div className="admin-section-heading">

        <div>
            <span className="section-eyebrow">
                MANAGEMENT
            </span>

            <h2>
                Manage your cafe
            </h2>

            <p>
                Keep your menu, reservations and cafe operations
                organized from one place.
            </p>
        </div>

    </div>


    <div className="admin-management-grid">

        <div className="admin-management-card">

            <span>01</span>

            <h3>
                Menu
            </h3>

            <p>
                Add, edit and remove items from your
                cafe menu.
            </p>

            <Link to="/admin/menu">
                Manage Menu →
            </Link>

        </div>


        <div className="admin-management-card">

            <span>02</span>

            <h3>
                Categories
            </h3>

            <p>
                Organize your menu into clear
                categories.
            </p>

            <Link to="/admin/categories">
                Manage Categories →
            </Link>

        </div>


        <div className="admin-management-card">

            <span>03</span>

            <h3>
                Tables
            </h3>

            <p>
                Manage cafe tables, capacity and
                availability.
            </p>

            <Link to="/admin/tables">
                Manage Tables →
            </Link>

        </div>


        <div className="admin-management-card">

            <span>04</span>

            <h3>
                Reservations
            </h3>

            <p>
                View and manage customer
                reservations.
            </p>

            <Link to="/admin/reservations">
                Manage Reservations →
            </Link>

        </div>


        <div className="admin-management-card">

            <span>05</span>

            <h3>
                Events
            </h3>

            <p>
                Create and manage special offers
                and cafe events.
            </p>

            <Link to="/admin/events">
                Manage Events →
            </Link>

        </div>


        <div className="admin-management-card">

            <span>06</span>

            <h3>
                Messages
            </h3>

            <p>
                Review customer enquiries and
                contact messages.
            </p>

            <Link to="/admin/contacts">
                View Messages →
            </Link>

            </div>

        </div>

        </section>

        </main>
    );
}

export default AdminDashboard;