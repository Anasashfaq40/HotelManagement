import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const ServicesRequest = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [serviceBookings, setServiceBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const fetchServiceBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch("http://localhost:5000/api/services/bookings", {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch data");
      }
      
      const data = await response.json();
      setServiceBookings(Array.isArray(data) ? data : []);
      setError(null);
    } catch (error) {
      console.error("Error fetching service bookings:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

 const updateServiceStatus = async (bookingId, serviceIndex, newStatus) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(
      `http://localhost:5000/api/services/bookings/${bookingId}/update-status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          serviceIndex: Number(serviceIndex),
          status: newStatus 
        }),
      }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to update status');
    }

    // Verify the total amount is correct
    const expectedTotal = result.booking.services.reduce((sum, service) => {
      return service.status !== 'cancelled' ? 
        sum + (service.priceAtBooking * service.quantity) : 
        sum;
    }, 0);

    if (Math.abs(result.booking.totalServiceAmount - expectedTotal) > 0.01) {
      console.warn('Total amount discrepancy detected', {
        calculated: expectedTotal,
        stored: result.booking.totalServiceAmount
      });
    }

    setServiceBookings(prevBookings =>
      prevBookings.map(booking =>
        booking._id === result.booking._id ? result.booking : booking
      )
    );

    return true;
  } catch (error) {
    console.error("Error updating service status:", error);
    alert(`Error: ${error.message}`);
    await fetchServiceBookings();
    return false;
  }
};

  useEffect(() => {
    fetchServiceBookings();
    const intervalId = setInterval(fetchServiceBookings, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const activeServiceBookings = Array.isArray(serviceBookings) 
    ? serviceBookings.filter(booking => 
        booking.status === 'active' || 
        (booking.status === 'completed' && 
         booking.services.some(s => s.status === 'completed'))
      )
    : [];

  if (loading) return <div className="dashboard-loading-spinner">Loading service requests...</div>;
  if (error) return <div className="dashboard-error-message">Error: {error}</div>;

  return (
    <div className="dashboard-app">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="rec-dashboard-content">
        <Sidebar isOpen={isSidebarOpen} />
        <div className={`rec-dashboard-dashboard-content ${isSidebarOpen ? "active" : ""}`}>
          <h2>Service Requests</h2>
          <p>Manage guest service requests and their statuses.</p>

          <div className="table-responsive">
            <table className="booking-table">
              <thead>
                <tr>
                  <th>Room</th>
                  <th>Guest</th>
                  <th>Services</th>
                  <th>Time</th>
                  <th>Service Status</th>
                  <th>Booking Status</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {activeServiceBookings.length > 0 ? (
                  activeServiceBookings.map((booking) => (
                    <React.Fragment key={booking._id}>
                      {booking.services.map((service, index) => (
                        <tr key={`${booking._id}-${index}`}>
                          <td>{booking.booking?.room?.roomNumber || 'N/A'}</td>
                          <td>{booking.guest?.name || "Guest"}</td>
                          <td>
                            {service.service?.name} 
                            {service.quantity > 1 && ` (x${service.quantity})`}
                            {service.specialInstructions && (
                              <div className="special-instructions">
                                <small>{service.specialInstructions}</small>
                              </div>
                            )}
                          </td>
                          <td>
                            {service.scheduledTime 
                              ? new Date(service.scheduledTime).toLocaleString() 
                              : "ASAP"}
                          </td>
                          <td>
                            <span className={`status-badge ${service.status}`}>
                              {service.status}
                            </span>
                          </td>
                          <td>
                            <span className={`status-badge ${booking.status}`}>
                              {booking.status}
                            </span>
                          </td>
                          <td>${(service.service?.price || 0) * (service.quantity || 1)}</td>
                          <td className="action-buttons">
                            {service.status === "requested" && (
                              <>
                                <button
                                  onClick={() => updateServiceStatus(booking._id, index, "confirmed")}
                                  className="confirm-btn"
                                >
                                  Confirm
                                </button>
                                <button
                                  onClick={() => updateServiceStatus(booking._id, index, "cancelled")}
                                  className="cancel-btn"
                                >
                                  Cancel
                                </button>
                              </>
                            )}
                            {service.status === "confirmed" && (
                              <button
                                onClick={() => updateServiceStatus(booking._id, index, "in-progress")}
                                className="progress-btn btn btn-danger"
                              >
                                Start
                              </button>
                            )}
                            {service.status === "in-progress" && (
                              <>
                                <button
                                  onClick={() => updateServiceStatus(booking._id, index, "completed")}
                                  className="complete-btn"
                                >
                                  Complete
                                </button>
                                <button
                                  onClick={() => updateServiceStatus(booking._id, index, "cancelled")}
                                  className="cancel-btn"
                                >
                                  Cancel
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">No active service requests</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ServicesRequest;