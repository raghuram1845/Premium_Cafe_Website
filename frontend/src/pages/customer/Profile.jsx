import { useEffect, useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

function Profile() {

    const { user, updateUser } = useAuth();

    const [profile, setProfile] = useState({
        fullName: "",
        email: "",
        phone: "",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    const fetchProfile = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await api.get(
                `/users/${user.userId}/profile`
            );

            setProfile({
                fullName: response.data.fullName || "",
                email: response.data.email || "",
                phone: response.data.phone || "",
            });

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Unable to load profile."
            );

        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {

        if (user?.userId) {
            fetchProfile();
        } else {
            setError("User information not found.");
            setLoading(false);
        }

    }, [user]);


    const handleChange = (event) => {

        const { name, value } = event.target;

        setProfile((previous) => ({
            ...previous,
            [name]: value,
        }));

        setError("");
        setSuccess("");
    };


    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            setSaving(true);
            setError("");
            setSuccess("");

            const request = {
                fullName: profile.fullName.trim(),
                email: profile.email.trim(),
                phone: profile.phone.trim(),
            };

            const response = await api.put(
                `/users/${user.userId}/profile`,
                request
            );

            updateUser(response.data);

            setProfile({
                fullName: response.data.fullName || "",
                email: response.data.email || "",
                phone: response.data.phone || "",
            });

            setSuccess(
                "Profile updated successfully."
            );

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Unable to update profile."
            );

        } finally {
            setSaving(false);
        }
    };


    if (loading) {

        return (
            <main className="profile-page">

                <div className="profile-loading">
                    Loading profile...
                </div>

            </main>
        );
    }


    return (
        <main className="profile-page">

            <section className="profile-container">

                <div className="profile-heading">

                    <span className="profile-eyebrow">
                        MY ACCOUNT
                    </span>

                    <h1>
                        My Profile
                    </h1>

                    <p>
                        Manage your personal information and
                        account details.
                    </p>

                </div>


                <div className="profile-summary">

                    <div className="profile-avatar">
                        {profile.fullName
                            ? profile.fullName
                                .charAt(0)
                                .toUpperCase()
                            : "U"}
                    </div>

                    <div className="profile-summary-info">

                        <h2>
                            {profile.fullName}
                        </h2>

                        <p>
                            {profile.email}
                        </p>

                    </div>

                </div>


                {error && (
                    <div className="profile-message profile-message-error">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="profile-message profile-message-success">
                        {success}
                    </div>
                )}


                <section className="profile-card">

                    <div className="profile-card-header">

                        <span className="profile-card-eyebrow">
                            PERSONAL INFORMATION
                        </span>

                        <h2>
                            Your details
                        </h2>

                    </div>


                    <form
                        className="profile-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="profile-form-field">

                            <label htmlFor="fullName">
                                Full Name
                            </label>

                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                value={profile.fullName}
                                onChange={handleChange}
                                maxLength={100}
                                placeholder="Your full name"
                                required
                            />

                        </div>


                        <div className="profile-form-field">

                            <label htmlFor="email">
                                Email Address
                            </label>

                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={profile.email}
                                onChange={handleChange}
                                placeholder="your@email.com"
                                required
                            />

                        </div>


                        <div className="profile-form-field">

                            <label htmlFor="phone">
                                Phone Number
                            </label>

                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={profile.phone}
                                onChange={handleChange}
                                maxLength={10}
                                pattern="[0-9]{10}"
                                placeholder="10-digit phone number"
                                required
                            />

                        </div>


                        <div className="profile-actions-final">

                            <button
                                type="submit"
                                className="profile-save-final"
                                disabled={saving}
                            >
                                {saving
                                    ? "Saving..."
                                    : "Save Changes"}
                            </button>

                        </div>

                    </form>

                </section>

            </section>

        </main>
    );
}

export default Profile;