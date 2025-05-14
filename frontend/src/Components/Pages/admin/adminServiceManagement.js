import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminServiceManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    startTime: "07:00",
    endTime: "22:00",
    isActive: true
  });

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const fetchServices = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/services");
      const data = await response.json();
      setServices(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching services:", error);
      setError("Failed to fetch services. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchServices(); }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAddNew = () => {
    setCurrentService(null);
    setFormData({
      name: "",
      description: "",
      price: 0,
      startTime: "07:00",
      endTime: "22:00",
      isActive: true
    });
    setImagePreview(null);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleEdit = (service) => {
    setCurrentService(service);
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price,
      startTime: service.availableTimes?.start || "07:00",
      endTime: service.availableTimes?.end || "22:00",
      isActive: service.isActive
    });
    setImagePreview(service.image || null);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (serviceId) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/services/${serviceId}`, {
          method: "DELETE",
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!response.ok) throw new Error('Failed to delete service');
        
        setServices(services.filter(s => s._id !== serviceId));
        toast.success("Service deleted successfully!");
      } catch (error) {
        console.error("Error deleting service:", error);
        toast.error("Failed to delete service.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formDataToSend = new FormData();
      
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('isActive', formData.isActive);
      
      if (['Breakfast', 'Lunch', 'Dinner'].includes(formData.name)) {
        formDataToSend.append('startTime', formData.startTime);
        formDataToSend.append('endTime', formData.endTime);
      }
      
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }

      const options = {
        method: currentService ? 'PUT' : 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formDataToSend
      };

      const url = currentService 
        ? `http://localhost:5000/api/services/${currentService._id}`
        : 'http://localhost:5000/api/services';
  
      const response = await fetch(url, options);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save service');
      }
  
      toast.success(`Service ${currentService ? 'updated' : 'created'} successfully!`);
      setIsModalOpen(false);
      fetchServices();
    } catch (error) {
      console.error("Error saving service:", error);
      toast.error(error.message || 'Failed to save service.');
    }
  };

  if (loading) return <div className="loading">Loading services...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="dashboard-app">
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="rec-dashboard-content d-flex">
        <Sidebar isOpen={isSidebarOpen} />
        <div className={`rec-dashboard-dashboard-content ${isSidebarOpen ? "active" : ""} w-100 p-4`}>
          <div className="container-fluid">
            <h2 className="service-header">Service Management</h2>

            <button onClick={handleAddNew} className="btn btn-primary">
              Add New Service
            </button>

            <div className="service-table-container mt-4">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Times</th>
                    <th>Image</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.length > 0 ? (
                    services.map(service => (
                      <tr key={service._id}>
                        <td>{service.name}</td>
                        <td>{service.description || "-"}</td>
                        <td>${service.price}</td>
                        <td>
                          {service.requiresTimeSlot 
                            ? `${service.availableTimes.start} - ${service.availableTimes.end}`
                            : 'N/A'}
                        </td>
                        <td>
                          {service.image && (
                            <img src={`http://localhost:5000/${service.image}`} alt={`${service.name} service`} className="service-table-img" />
                          )}
                        </td>
                        <td>
                          <span className={`badge ${service.isActive ? 'badge-success' : 'badge-danger'}`}>
                            {service.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td>
                          <button onClick={() => handleEdit(service)} className="btn btn-warning btn-sm">Edit</button>
                          <button onClick={() => handleDelete(service._id)} className="btn btn-danger btn-sm">Delete</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7">No services available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-conten modal-color">
            <h3>{currentService ? "Edit Service" : "Add New Service"}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Service Name</label>
                <select
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a service</option>
                  {['Breakfast', 'Lunch', 'Dinner', 'Laundry', 'Transport', 'Spa', 'Gym', 'Pool'].map(service => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>Price ($)</label>
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  min="0"
                  required
                />
              </div>

              {formData.name && ['Breakfast', 'Lunch', 'Dinner'].includes(formData.name) && (
                <div className="form-group">
                  <label>Available Times</label>
                  <div className="d-flex">
                    <input
                      type="time"
                      className="form-control mr-2"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleInputChange}
                    />
                    <input
                      type="time"
                      className="form-control"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              )}

              <div className="form-group">
                <label>Status</label>
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                  />
                  <label className="custom-control-label">Active</label>
                </div>
              </div>

              <div className="form-group">
                <label>Service Image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <div className="image-preview mt-3">
                    <img src={imagePreview} alt="Service preview" className="preview-img" />
                  </div>
                )}
              </div>

              <div className="form-group">
                <button type="submit" className="btn btn-primary">
                  {currentService ? "Update Service" : "Add Service"}
                </button>
                <button type="button" className="btn btn-secondary ml-2" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

<Footer />
    </div>
  );
};

export default AdminServiceManagement;
 