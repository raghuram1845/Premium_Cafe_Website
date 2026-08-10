import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Menu from "./pages/Menu";
import Reservation from "./pages/customer/Reservation";
import MyReservations from "./pages/customer/MyReservations";
import Events from "./pages/customer/Events";
import Contact from "./pages/customer/Contact";
import AdminDashboard from "./pages/admin/AdminDashboard";
import MenuManagement from "./pages/admin/MenuManagement";
import CategoryManagement from "./pages/admin/CategoryManagement";
import ReservationManagement from "./pages/admin/ReservationManagement";
import TableManagement from "./pages/admin/TableManagement";
import EventManagement from "./pages/admin/EventManagement";
import ContactManagement from "./pages/admin/ContactManagement";
import Profile from "./pages/customer/Profile";


function App() {
    return (
        <BrowserRouter>

            <Navbar />

            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />}
                     />
                    <Route path="/register" element={<Register />} />
                    <Route
                          path="/dashboard"
                          element={
                              <ProtectedRoute allowedRoles={["CUSTOMER"]}>
                              <CustomerDashboard />
                                      </ProtectedRoute>
                                                      }/>
                    <Route path="/menu" element={<Menu />} />
                    <Route
                            path="/reservations"
                                  element={
                                  <ProtectedRoute allowedRoles={["CUSTOMER"]}>
                                      <Reservation />
                                  </ProtectedRoute>
                            }
                    />
                    <Route
                            path="/my-reservations"
                            element={
                                <ProtectedRoute allowedRoles={["CUSTOMER"]}>
                                    <MyReservations />
                                </ProtectedRoute>
                            }
                    />
                    <Route
                            path="/my-reservations"
                              element={
                              <ProtectedRoute allowedRoles={["CUSTOMER"]}>
                                    <MyReservations />
                               </ProtectedRoute>
                              }
                    />

                    <Route
                        path="/menu"
                        element={<Menu />}
                    />
                    <Route
                        path="/events"
                        element={<Events />}
                    />
                    <Route
                        path="/contact"
                        element={<Contact />}
                    />

                    <Route
                            path="/admin"
                            element={
                        <ProtectedRoute allowedRoles={["ADMIN"]}>
                            <AdminDashboard />
                        </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/admin/menu"
                        element={
                        <ProtectedRoute allowedRoles={["ADMIN"]}>
                            <MenuManagement />
                        </ProtectedRoute>
                    }
                    />
                    <Route
                        path="/admin/categories"
                        element={
                            <ProtectedRoute allowedRoles={["ADMIN"]}>
                                <CategoryManagement />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/admin/reservations"
                        element={
                            <ProtectedRoute allowedRoles={["ADMIN"]}>
                                <ReservationManagement />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/admin/tables"
                        element={
                            <ProtectedRoute allowedRoles={["ADMIN"]}>
                                <TableManagement />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/admin/events"
                        element={
                            <ProtectedRoute allowedRoles={["ADMIN"]}>
                                <EventManagement />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/contacts"
                        element={
                        <ProtectedRoute allowedRoles={["ADMIN"]}>
                            <ContactManagement />
                        </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute allowedRoles={["CUSTOMER", "ADMIN"]}>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </main>

            <Footer />

        </BrowserRouter>
    );
}

export default App;