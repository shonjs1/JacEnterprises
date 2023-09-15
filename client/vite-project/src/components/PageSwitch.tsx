import { Routes , Route } from 'react-router-dom';
import HomePage from '../pages/Home/Home';
import AboutUsPage from '../pages/AboutUs/Aboutus';
import ContactPage from '../pages/Contact/Contact';
import TempPage from '../pages/TempAPI/Temp';

const PageSwitch = () => {
    return (
    <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/about-us" element={<AboutUsPage/>} />
        <Route path="/contact" element={<ContactPage/>} />
        <Route path="/temp" element={<TempPage/>} />
    </Routes>
    );
};

export default PageSwitch;