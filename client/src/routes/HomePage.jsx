import { BrowserRouter as Router, Route, Routes, Link, Outlet } from 'react-router-dom';
import { useApplicationData } from '../hooks/useApplicationData';
import MyFavorites from "../components/MyFavorites";
import TopNavBar from '../components/TopNavBar';
import Signup from "../components/Signup";
import Login from '../components/Login';
import Home from '../components/HomeName';
import "../styles/Home.scss";
import InfoPage from '../components/InfoPage';
import Footer from '../components/Footer';


function HomePage() {

  const {
    addToFavorites,
    selectedImage,
    isModalOpen,
    closeModal,
    favorites,
    openModal,
    pets,
    setPets,
    searchPets,
    searchLoading,
    login,
    isLoggedIn
  } = useApplicationData();

  return (
    <div className="bg">
      <Router>
        <TopNavBar favorites={favorites} isLoggedIn={isLoggedIn} login={login} />
        <Routes>
          <Route path="/" element={<Home favorites={favorites} addToFavorites={addToFavorites} isModalOpen={isModalOpen} pets={pets} selectedImage={selectedImage} openModal={openModal} closeModal={closeModal} setPets={setPets} searchPets={searchPets} loading={searchLoading} />} />
          <Route path="/MyFavorites" element={<MyFavorites favorites={favorites} pets={pets} />} />
          <Route path="/login" element={<Login login={login} isLoggedIn={isLoggedIn} />} />
          <Route path="/signup" element={<Signup login={login} isLoggedIn={isLoggedIn} />} />
          <Route path="/info/about" element={<InfoPage infoType="about" />} />
          <Route path="/info/contact" element={<InfoPage infoType="contact" />} />
          <Route path="/info/faq" element={<InfoPage infoType="faq" />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default HomePage;
