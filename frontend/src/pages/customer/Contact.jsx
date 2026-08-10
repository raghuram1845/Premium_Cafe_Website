import { useState } from "react";
import api from "../../services/api";

function Contact() {

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

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

        setSubmitting(true);
        setError("");
        setSuccess("");

        try {

            await api.post("/contacts", form);

            setSuccess(
                "Thank you. Your message has been sent successfully."
            );

            setForm({
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: "",
            });

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Unable to send your message. Please try again."
            );

        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="contact-page">

            <section className="contact-header">

                <span className="section-eyebrow">
                    GET IN TOUCH
                </span>

                <h1>Contact Us</h1>

                <p>
                    Whether you have a question, a special request,
                    or simply want to say hello, we'd love to hear
                    from you.
                </p>

            </section>


            <section className="contact-container">

                <aside className="contact-info">

                    <span className="panel-eyebrow">
                        PREMIUM CAFE
                    </span>

                    <h2>
                        Let's talk
                        <br />
                        over coffee.
                    </h2>

                    <p>
                        Have a question about our menu, reservations
                        or upcoming events? Send us a message and
                        our team will get back to you.
                    </p>


                    <div className="contact-info-line"></div>


                    <div className="contact-detail">

                        <span>VISIT</span>

                        <p>
                            Premium Cafe<br />
                            Hyderabad, Telangana
                        </p>

                    </div>


                    <div className="contact-detail">

                        <span>CALL</span>

                        <p>
                            +91 98765 43210
                        </p>

                    </div>


                    <div className="contact-detail">

                        <span>HOURS</span>

                        <p>
                            Monday — Sunday<br />
                            9:00 AM — 10:00 PM
                        </p>

                    </div>

                </aside>


                <div className="contact-form-card">

                    <div className="contact-form-heading">

                        <span className="panel-eyebrow">
                            SEND A MESSAGE
                        </span>

                        <h2>
                            How can we help?
                        </h2>

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


                    <form
                        className="contact-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="contact-form-grid">

                            <div className="reservation-field">

                                <label htmlFor="name">
                                    Name
                                </label>

                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Your name"
                                    required
                                />

                            </div>


                            <div className="reservation-field">

                                <label htmlFor="email">
                                    Email
                                </label>

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    required
                                />

                            </div>


                            <div className="reservation-field">

                                <label htmlFor="phone">
                                    Phone
                                </label>

                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={form.phone}
                                    onChange={handleChange}
                                    placeholder="+91"
                                    required
                                />

                            </div>


                            <div className="reservation-field">

                                <label htmlFor="subject">
                                    Subject
                                </label>

                                <input
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    value={form.subject}
                                    onChange={handleChange}
                                    placeholder="How can we help?"
                                    required
                                />

                            </div>

                        </div>


                        <div className="reservation-field">

                            <label htmlFor="message">
                                Message
                            </label>

                            <textarea
                                id="message"
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                placeholder="Tell us what is on your mind..."
                                rows="7"
                                required
                            />

                        </div>


                        <div className="contact-submit">

                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={submitting}
                            >
                                {submitting
                                    ? "Sending..."
                                    : "Send Message"}
                            </button>

                        </div>

                    </form>

                </div>

            </section>

        </main>
    );
}

export default Contact;