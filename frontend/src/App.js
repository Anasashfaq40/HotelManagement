import { Route, Routes } from 'react-router-dom';
import React from 'react';
import './App.css';

import Index from './Components/Pages/index';
import Index2 from './Components/Pages/index2';
import Index3 from './Components/Pages/index3';
import About from './Components/Pages/about';
import Contact from './Components/Pages/contact';
import FaQs from './Components/Pages/faqs';
import Gallery from './Components/Pages/gallery';
import BlogDetail from './Components/Pages/blog-details';
import Blog from './Components/Pages/blog';
import Shop from './Components/Pages/shop';
import Service from './Components/Pages/services';
import RoomList from './Components/Pages/room-list';
import RoomGrid from './Components/Pages/room-grid';
import RoomDetail from './Components/Pages/room-details';
import Room2Columns from './Components/Pages/room-2columns';
import ProductDetail from './Components/Pages/product-details';
import Login from './Components/Pages/Login';
import Signup from './Components/Pages/Signup';
import Dashboard from './Components/Pages/admin/Dashboard';
import RoomManagement from './Components/Pages/admin/RoomManagement';
import Reception from './Components/Pages/Reception/RecDashboard';
import ProtectedRoute from "./Components/ProtectedRoute";
import Reservation from './Components/Pages/admin/Resevation';
import BookedUser from './Components/Pages/Reception/BookedUsers';
import RecReservation from './Components/Pages/Reception/RecReservation';
import Room from './Components/Pages/room';
import Profile from './Components/Pages/Profile';
import BookedGuest from './Components/Pages/admin/BookedGuest';
import CheckedIn from './Components/Pages/admin/ChackedIn';
import RecCheckedIn from './Components/Pages/Reception/CheckedInRec';
import AdminServiceManagement from './Components/Pages/admin/adminServiceManagement';
import ServicesRequest from './Components/Pages/Reception/ServicesRequest';
import UserManagement from './Components/Pages/admin/UserManagement';
import Reviews from './Components/Pages/admin/guestReviews';
import RecCheckedOut from './Components/Pages/Reception/CheckedOutRec';
import Housekeeping from './Components/Pages/Reception/housekeeping';
import CheckedOut from './Components/Pages/admin/CheckedOut';
import AdminHousekeeping from './Components/Pages/admin/Housekeeping';
import ReportIssues from './Components/Pages/admin/ReportIssues';
import Feedback from './Components/Pages/admin/Feedback';
import Reporting from './Components/Pages/admin/Reporting';
import Maintenance from './Components/Pages/admin/Maintenance';
import MaintenanceRec from './Components/Pages/Reception/MaintainenceRec';
import ReportingIssues from './Components/Pages/Reception/ReportingIssues';


function App() {
  return (
    <div className="App">
<Routes>
    <Route path='/' element={<Index/>}/>
    <Route path='/index2' element={<Index2/>}/>
    <Route path='/index3' element={<Index3/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/contact' element={<Contact/>}/>
    <Route path='/faqs' element={<FaQs/>}/>
    <Route path='/gallery' element={<Gallery/>}/>
    <Route path='/blog-details' element={<BlogDetail/>}/>
    <Route path='/blog' element={<Blog/>}/>
    <Route path='/shop' element={<Shop/>}/>
    <Route path='/services' element={<Service/>}/>
    <Route path='/room-list' element={<RoomList/>}/>
    <Route path='/room' element={<Room/>}/>
    <Route path='/room-grid' element={<RoomGrid/>}/>
    <Route path='/room-details/:id' element={<RoomDetail/>}/>
    <Route path='/room-2columns' element={<Room2Columns/>}/>
    <Route path='/product-details' element={<ProductDetail/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/reservation' element={<Reservation/>}/>
    <Route path='/bookedguest' element={<BookedGuest/>}/>
    <Route path='/checkedin' element={<CheckedIn/>}/>
    <Route path='/adminservice' element={<AdminServiceManagement/>}/>
    <Route path='/usermanagement' element={<UserManagement/>}/>
    <Route path='/adminreview' element={<Reviews/>}/>
    <Route path='/checked-out' element={<CheckedOut/>}/>
    <Route path='/house' element={<AdminHousekeeping/>}/>
    <Route path='/reportissues' element={<ReportIssues/>}/>
    <Route path='/feedback' element={<Feedback/>}/>
    <Route path="/room-management" element={<RoomManagement />} />
    <Route path="/reporting" element={<Reporting />} />
    <Route path="/maintenance" element={<Maintenance />} />
    </Route>
    <Route element={<ProtectedRoute allowedRoles={["receptionist","admin"]} />}>
    <Route path='/reception' element={<Reception/>}/>
    <Route path='/servicerequest' element={<ServicesRequest/>}/>
    <Route path='/bookeduser' element={<BookedUser/>}/>
    <Route path='/recreservation' element={<RecReservation/>}/>
    <Route path='/reccheckedin' element={<RecCheckedIn/>}/>
    <Route path='/reccheckedout' element={<RecCheckedOut/>}/>
    <Route path='/housekeeping' element={<Housekeeping/>}/>
    <Route path='/recmaintenence' element={<MaintenanceRec/>}/>
    <Route path='/reportingissue' element={<ReportingIssues/>}/>
       </Route>

    <Route path='/profile' element={<Profile/>}/>



    </Routes>
    </div>
  );
}

export default App; 