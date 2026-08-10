import { Link } from "react-router-dom";

import signatureCoffee from "../assets/images/signature-coffee.jpg";
import chocolateDelight from "../assets/images/chocolate-delight.jpg";
import classicBreakfast from "../assets/images/classic-breakfast.jpg";

function Home() {

    return (
        <div>

            {/* Hero */}

            <section className="hero-section">

                <div className="hero-overlay">

                    <div className="hero-content">

                        <span className="hero-eyebrow">
                            WELCOME TO PREMIUM CAFE
                        </span>

                        <h1>
                            Crafted with passion.
                            <br />
                            Served with warmth.
                        </h1>

                        <p>
                            A refined cafe experience where exceptional coffee,
                            fresh flavours and beautiful moments come together.
                        </p>

                        <div className="hero-actions">

                            <Link
                                to="/menu"
                                className="btn btn-primary"
                            >
                                Explore Our Menu
                            </Link>

                            <Link
                                to="/reservations"
                                className="btn btn-outline"
                            >
                                Reserve a Table
                            </Link>

                        </div>

                    </div>

                </div>

            </section>


            {/* Introduction */}

            <section className="intro-section section-container">

                <div className="intro-content">

                    <span className="section-eyebrow">
                        THE PREMIUM EXPERIENCE
                    </span>

                    <h2>
                        More than coffee.
                        <br />
                        It's your place to unwind.
                    </h2>

                    <p>
                        From carefully brewed coffee to thoughtfully prepared
                        dishes, every detail at Premium Cafe is designed to
                        make your visit memorable.
                    </p>

                    <Link
                        to="/menu"
                        className="text-link"
                    >
                        Discover our menu →
                    </Link>

                </div>


                <div className="intro-highlight">

                    <div className="highlight-card">

                        <span>01</span>

                        <h3>
                            Fresh Ingredients
                        </h3>

                        <p>
                            Quality ingredients selected for flavour and freshness.
                        </p>

                    </div>


                    <div className="highlight-card">

                        <span>02</span>

                        <h3>
                            Crafted Daily
                        </h3>

                        <p>
                            Every cup and plate is prepared with attention to detail.
                        </p>

                    </div>


                    <div className="highlight-card">

                        <span>03</span>

                        <h3>
                            Warm Atmosphere
                        </h3>

                        <p>
                            A comfortable space made for conversations and moments.
                        </p>

                    </div>

                </div>

            </section>


            {/* Featured Menu */}

            <section className="featured-section">

                <div className="section-container">

                    <div className="section-heading">

                        <div>

                            <span className="section-eyebrow">
                                FROM OUR KITCHEN
                            </span>

                            <h2>
                                Customer favourites
                            </h2>

                        </div>

                        <Link
                            to="/menu"
                            className="text-link"
                        >
                            View full menu →
                        </Link>

                    </div>


                    <div className="menu-preview-grid">


                        {/* Signature Coffee */}

                        <div className="menu-preview-card">

                            <div className="menu-card-image">

                                <img
                                    src={signatureCoffee}
                                    alt="Signature Coffee"
                                />

                                <span>
                                    COFFEE
                                </span>

                            </div>


                            <div className="menu-card-content">

                                <div>

                                    <h3>
                                        Signature Coffee
                                    </h3>

                                    <p>
                                        Rich, smooth and carefully brewed.
                                    </p>

                                </div>

                                <span className="menu-price">
                                    ₹180
                                </span>

                            </div>

                        </div>


                        {/* Chocolate Delight */}

                        <div className="menu-preview-card">

                            <div className="menu-card-image">

                                <img
                                    src={chocolateDelight}
                                    alt="Chocolate Delight"
                                />

                                <span>
                                    DESSERT
                                </span>

                            </div>


                            <div className="menu-card-content">

                                <div>

                                    <h3>
                                        Chocolate Delight
                                    </h3>

                                    <p>
                                        Indulgent chocolate with a delicate finish.
                                    </p>

                                </div>

                                <span className="menu-price">
                                    ₹220
                                </span>

                            </div>

                        </div>


                        {/* Classic Breakfast */}

                        <div className="menu-preview-card">

                            <div className="menu-card-image">

                                <img
                                    src={classicBreakfast}
                                    alt="Classic Breakfast"
                                />

                                <span>
                                    BREAKFAST
                                </span>

                            </div>


                            <div className="menu-card-content">

                                <div>

                                    <h3>
                                        Classic Breakfast
                                    </h3>

                                    <p>
                                        A satisfying start to your day.
                                    </p>

                                </div>

                                <span className="menu-price">
                                    ₹250
                                </span>

                            </div>

                        </div>


                    </div>

                </div>

            </section>


            {/* Experience */}

            <section className="experience-section section-container">

                <div className="experience-number">
                    10+
                </div>

                <div className="experience-content">

                    <span className="section-eyebrow">
                        MADE FOR EVERY MOMENT
                    </span>

                    <h2>
                        Your morning coffee,
                        <br />
                        your evening escape.
                    </h2>

                    <p>
                        Whether you're catching up with friends, getting some
                        work done or simply enjoying a quiet cup of coffee,
                        Premium Cafe is designed around you.
                    </p>

                    <Link
                        to="/contact"
                        className="btn btn-dark"
                    >
                        Visit Premium Cafe
                    </Link>

                </div>

            </section>


            {/* Reservation CTA */}

            <section className="reservation-cta">

                <div className="reservation-cta-content">

                    <span className="section-eyebrow">
                        PLAN YOUR VISIT
                    </span>

                    <h2>
                        Good food deserves
                        <br />
                        good company.
                    </h2>

                    <p>
                        Reserve your table and make your next cafe experience
                        something worth remembering.
                    </p>

                    <Link
                        to="/reservations"
                        className="btn btn-light"
                    >
                        Reserve a Table
                    </Link>

                </div>

            </section>

        </div>
    );
}

export default Home;