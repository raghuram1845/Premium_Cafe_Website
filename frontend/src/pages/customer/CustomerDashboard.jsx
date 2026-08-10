import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function CustomerDashboard() {
    const { user } = useAuth();

    return (
        <div className="customer-dashboard">

            {/* Welcome Header */}
            <section className="dashboard-header">
                <div>
                    <span className="section-eyebrow">
                        CUSTOMER SPACE
                    </span>

                    <h1>
                        Welcome back,
                        <br />
                        {user?.fullName}
                    </h1>

                    <p>
                        Everything you need for your next Premium Cafe
                        experience, all in one place.
                    </p>
                </div>

                <Link
                    to="/reservations"
                    className="btn btn-primary"
                >
                    Reserve a Table
                </Link>
            </section>


            {/* Main Dashboard */}
            <section className="dashboard-main">

                {/* Upcoming Reservation */}
                <div className="reservation-panel">

                    <div className="panel-header">
                        <div>
                            <span className="panel-eyebrow">
                                YOUR NEXT VISIT
                            </span>

                            <h2>Upcoming reservation</h2>
                        </div>

                        <Link
                            to="/my-reservations"
                            className="text-link"
                        >
                            View all →
                        </Link>
                    </div>

                    <div className="reservation-placeholder">

                        <div className="reservation-date">
                            <span>DATE</span>
                            <strong>--</strong>
                        </div>

                        <div className="reservation-details">
                            <span className="reservation-status">
                                NO UPCOMING RESERVATION
                            </span>

                            <h3>Your next visit starts here.</h3>

                            <p>
                                Choose a date, time and table to create
                                your next Premium Cafe experience.
                            </p>

                            <Link
                                to="/reservations"
                                className="text-link"
                            >
                                Make a reservation →
                            </Link>
                        </div>

                    </div>

                </div>


                {/* Quick Actions */}
                <aside className="quick-actions">

                    <span className="panel-eyebrow">
                        QUICK ACTIONS
                    </span>

                    <h2>What would you like to do?</h2>

                    <div className="quick-action-list">

                        <Link
                            to="/reservations"
                            className="quick-action"
                        >
                            <span className="quick-action-number">
                                01
                            </span>

                            <div>
                                <strong>Reserve a table</strong>
                                <p>
                                    Plan your next visit.
                                </p>
                            </div>

                            <span className="quick-action-arrow">
                                →
                            </span>
                        </Link>

                        <Link
                            to="/menu"
                            className="quick-action"
                        >
                            <span className="quick-action-number">
                                02
                            </span>

                            <div>
                                <strong>Explore the menu</strong>
                                <p>
                                    Discover our latest flavours.
                                </p>
                            </div>

                            <span className="quick-action-arrow">
                                →
                            </span>
                        </Link>

                        <Link
                            to="/events"
                            className="quick-action"
                        >
                            <span className="quick-action-number">
                                03
                            </span>

                            <div>
                                <strong>See what's happening</strong>
                                <p>
                                    Explore events and offers.
                                </p>
                            </div>

                            <span className="quick-action-arrow">
                                →
                            </span>
                        </Link>

                    </div>

                </aside>

            </section>


            {/* Experience Section */}
            <section className="dashboard-experience">

                <div className="experience-intro">
                    <span className="section-eyebrow">
                        THE PREMIUM EXPERIENCE
                    </span>

                    <h2>
                        Make every visit
                        <br />
                        worth remembering.
                    </h2>

                    <p>
                        From your first coffee of the morning to an evening
                        with friends, Premium Cafe is designed around the
                        moments that matter.
                    </p>
                </div>

                <div className="experience-features">

                    <div className="experience-feature">
                        <span>01</span>
                        <h3>Freshly prepared</h3>
                        <p>
                            Quality ingredients and carefully prepared dishes.
                        </p>
                    </div>

                    <div className="experience-feature">
                        <span>02</span>
                        <h3>Made for you</h3>
                        <p>
                            A comfortable space for every kind of visit.
                        </p>
                    </div>

                    <div className="experience-feature">
                        <span>03</span>
                        <h3>Easy reservations</h3>
                        <p>
                            Find a table and plan your visit in just a few clicks.
                        </p>
                    </div>

                </div>

            </section>

        </div>
    );
}

export default CustomerDashboard;