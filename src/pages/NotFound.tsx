
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { BackgroundDecoration } from "@/components/DecorativeElements";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="app-container">
      <BackgroundDecoration />
      
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center neon-box p-8 md:p-12 max-w-md">
          <h1 className="text-6xl font-bold mb-4 neon-text">404</h1>
          <p className="text-xl text-purple-light mb-8">Oops! Page not found</p>
          <Button asChild className="pill-button">
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
