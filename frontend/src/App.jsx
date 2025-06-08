import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import Start from "./pages/start";
import UserProtectedWrapper from "./pages/UserProtectedWrapper";
import UserLogout from "./pages/UserLogout";
import CaptainLogout from "./pages/CaptainLogout";
import CaptainHome from "./pages/CaptainHome";
import CaptainProtectedWrapper from "./pages/CaptainProtectedWrapper";

const App = () => {
  const location = useLocation();

  return (
    <div className=" ">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <Start />
              </PageTransition>
            }
          />
          <Route
            path="/login"
            element={
              <PageTransition>
                <UserLogin />
              </PageTransition>
            }
          />
          <Route
            path="/signup"
            element={
              <PageTransition>
                <UserSignup />
              </PageTransition>
            }
          />
          <Route
            path="/captain-login"
            element={
              <PageTransition>
                <CaptainLogin />
              </PageTransition>
            }
          />
          <Route
            path="/captain-signup"
            element={
              <PageTransition>
                <CaptainSignup />
              </PageTransition>
            }
          />
          <Route
            path="/terms"
            element={
              <PageTransition>
                <Terms />
              </PageTransition>
            }
          />
          <Route
            path="/privacy"
            element={
              <PageTransition>
                <Privacy />
              </PageTransition>
            }
          />
          <Route
            path="/home"
            element={
              <UserProtectedWrapper>
                <Home />
              </UserProtectedWrapper>
            }
          />
          <Route
            path="/user/logout"
            element={
              <UserProtectedWrapper>
                <UserLogout />
              </UserProtectedWrapper>
            }
          />
          <Route
            path="/captain-home"
            element={
              <CaptainProtectedWrapper>
                <CaptainHome />
              </CaptainProtectedWrapper>
            }
          />
          <Route
            path="/captain/logout"
            element={
              <CaptainProtectedWrapper>
                <CaptainLogout />
              </CaptainProtectedWrapper>
            }
          />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

// PageTransition component for animation
const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 1.02 }}
    transition={{ duration: 0.22, ease: "easeOut" }}
    style={{ height: "100%" }}
  >
    {children}
  </motion.div>
);

export default App;

//03:48:00
