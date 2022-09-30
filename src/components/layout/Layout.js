import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import { Navigation, HomePage, Footer, ContactPage, LoginPage, AboutUsPage, AccommodationPage, DashboardPage } from "../index";

import Container from "./Container";
import WrapperMain from "./WrapperMain";

const Layout = () => {
  return (
    <Container>
      <WrapperMain>
        <AuthProvider>
          <Router>
            <Navigation />
            <Routes>
              <Route path="/" exact="true" element={<HomePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/detail/:id" element={<AccommodationPage />} />
              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/admin" element={<DashboardPage />} />
            </Routes>
          </Router>
        </AuthProvider>
      </WrapperMain>
      <Footer />
    </Container>
  );
};

export default Layout;
