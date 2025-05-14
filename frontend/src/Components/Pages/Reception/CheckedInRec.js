import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const RecCheckedIn = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const fetchCheckedInBookings = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/bookingdata/checked-in");
      setBookings(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching checked-in bookings:", error);
      setError(error.response?.data?.message || "Failed to fetch checked-in bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCheckedInBookings();
    const intervalId = setInterval(fetchCheckedInBookings, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const handleCheckOut = async (bookingId) => {
    if (window.confirm("Are you sure you want to check out?")) {
      try {
        const token = localStorage.getItem('token');
        
        // 1. First update status to checked-out
        const checkoutResponse = await axios.put(
          `http://localhost:5000/api/bookingsuser/${bookingId}/checkout`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
  
        if (!checkoutResponse.data.success) {
          throw new Error(checkoutResponse.data.message || 'Checkout failed');
        }
  
        // 2. Generate invoice
        const invoiceResponse = await axios.post(
          `http://localhost:5000/api/invoices/generate/${bookingId}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
  
        // 3. Validate response
        if (!invoiceResponse.data?.success || !invoiceResponse.data.data) {
          throw new Error('Invalid invoice data received from server');
        }
  
        const invoiceData = invoiceResponse.data.data;
  
        // 4. Safely render invoice HTML with null checks
        const invoiceHtml = `
          <!DOCTYPE html>
          <html>
          <head>
            <title>Invoice ${invoiceData.invoiceNumber || ''}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .invoice-container { max-width: 800px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; }
              .header { text-align: center; margin-bottom: 30px; }
              .section { margin-bottom: 20px; }
              table { width: 100%; border-collapse: collapse; margin: 15px 0; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
              .text-right { text-align: right; }
              .total { font-weight: bold; margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="invoice-container">
              <div class="header">
                <h1>Hotel Invoice</h1>
                <p>Invoice #${invoiceData.invoiceNumber || ''}</p>
                <p>Date: ${new Date(invoiceData.issueDate || Date.now()).toLocaleDateString()}</p>
              </div>
              
              <div class="section">
                <h3>Guest Details</h3>
                <p><strong>Name:</strong> ${invoiceData.guestDetails?.name || 'Guest'}</p>
                <p><strong>Email:</strong> ${invoiceData.guestDetails?.email || ''}</p>
                <p><strong>Contact:</strong> ${invoiceData.guestDetails?.contact || ''}</p>
                <p><strong>Booking ID:</strong> ${invoiceData.bookingId || ''}</p>
                <p><strong>Check-in:</strong> ${new Date(invoiceData.checkInDate || Date.now()).toLocaleDateString()}</p>
                <p><strong>Check-out:</strong> ${new Date(invoiceData.checkOutDate || Date.now()).toLocaleDateString()}</p>
              </div>
              
              <div class="section">
                <h3>Room Charges</h3>
                <table>
                  <tr>
                    <th>Room Number</th>
                    <th>Type</th>
                    <th>Rate/Night</th>
                    <th>Nights</th>
                    <th class="text-right">Total</th>
                  </tr>
                  <tr>
                    <td>${invoiceData.roomCharges?.roomNumber || ''}</td>
                    <td>${invoiceData.roomCharges?.roomType || ''}</td>
                    <td>$${(invoiceData.roomCharges?.ratePerNight || 0).toFixed(2)}</td>
                    <td>${invoiceData.roomCharges?.nights || 0}</td>
                    <td class="text-right">$${(invoiceData.roomCharges?.subtotal || 0).toFixed(2)}</td>
                  </tr>
                </table>
              </div>
              
              ${(invoiceData.serviceCharges?.length || 0) > 0 ? `
              <div class="section">
                <h3>Service Charges</h3>
                <table>
                  <tr>
                    <th>Service</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th class="text-right">Total</th>
                  </tr>
                  ${(invoiceData.serviceCharges || []).map(service => `
                    <tr>
                      <td>${service?.name || 'Service'}</td>
                      <td>${service?.quantity || 1}</td>
                      <td>$${(service?.unitPrice || 0).toFixed(2)}</td>
                      <td class="text-right">$${(service?.total || 0).toFixed(2)}</td>
                    </tr>
                  `).join('')}
                </table>
              </div>
              ` : ''}
              
              <div class="total">
                <p>Subtotal: $${((invoiceData.roomCharges?.subtotal || 0) + (invoiceData.serviceCharges?.reduce((sum, s) => sum + (s?.total || 0), 0) || 0)).toFixed(2)}</p>
                <p>Tax (${((invoiceData.tax?.rate || 0) * 100)}%): $${(invoiceData.tax?.amount || 0).toFixed(2)}</p>
                <p><strong>Grand Total: $${(invoiceData.totalAmount || 0).toFixed(2)}</strong></p>
              </div>
            </div>
          </body>
          </html>
        `;
  
        // 5. Open invoice in new window
        const invoiceWindow = window.open('', '_blank');
        if (invoiceWindow) {
          invoiceWindow.document.open();
          invoiceWindow.document.write(invoiceHtml);
          invoiceWindow.document.close();
        } else {
          throw new Error('Popup window was blocked. Please allow popups for this site.');
        }
  
        // 6. Update state
        setBookings(prev => prev.map(b => 
          b._id === bookingId ? {
            ...b,
            status: 'checked-out',
            room: { ...b.room, status: 'available' },
            invoice: invoiceData
          } : b
        ));
  
        toast.success("Checked out successfully! Invoice generated.");
      } catch (error) {
        console.error('Checkout error:', error);
        toast.error(error.response?.data?.message || error.message || 'Failed to complete checkout');
      }
    }
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-danger">{error}</div>;

  return (
    <div className="dashboard-app">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="rec-dashboard-content">
        <Sidebar isOpen={isSidebarOpen} />
        <div className={`rec-dashboard-dashboard-content ${isSidebarOpen ? "active" : ""}`}>
          <h2>Checked-In Guests</h2>
          
          <div className="table-responsive">
            <table className="table table-striped">
              <thead className="thead-dark">
                <tr>
                  <th>Guest</th>
                  <th>Room</th>
                  <th>Check-In</th>
                  <th>Check-Out</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length > 0 ? (
                  bookings.map(booking => (
                    <tr key={booking._id}>
                      <td>{booking.user?.name || 'N/A'}</td>
                      <td>{booking.room?.roomNumber} ({booking.room?.type})</td>
                      <td>{new Date(booking.checkInDate).toLocaleString()}</td>
                      <td>{new Date(booking.checkOutDate).toLocaleString()}</td>
                      <td>
                        <span className={`badge ${
                          booking.status === 'checked-in' ? 'bg-success' : 'bg-secondary'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => handleCheckOut(booking._id)}
                          className="btn btn-sm btn-warning"
                        >
                          Check Out
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">No checked-in guests</td>
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

export default RecCheckedIn;