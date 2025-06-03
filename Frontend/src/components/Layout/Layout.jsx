import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useNotification } from "../../contexts/NotificationContext";

const Layout = ({ children, showSidebar = true }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { notifications, removeNotification } = useNotification();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header onToggleSidebar={toggleSidebar} />

      <div className="flex flex-1">
        {showSidebar && (
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        )}

        <main
          className={`flex-1 transition-all duration-300 ${
            showSidebar && sidebarOpen ? "lg:ml-64" : ""
          }`}
        >
          <div className="container mx-auto px-4 py-6">{children}</div>
        </main>
      </div>

      <Footer />

      {/* Overlay для мобільного сайдбару */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Система повідомлень */}
      <div className="fixed top-4 right-4 space-y-2 z-50 max-w-sm">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg shadow-lg text-white transform transition-all duration-300 ${
              notification.type === "success"
                ? "bg-green-500"
                : notification.type === "error"
                ? "bg-red-500"
                : notification.type === "warning"
                ? "bg-yellow-500"
                : "bg-blue-500"
            }`}
            onClick={() => removeNotification(notification.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="mr-2">
                  {notification.type === "success"
                    ? "✅"
                    : notification.type === "error"
                    ? "❌"
                    : notification.type === "warning"
                    ? "⚠️"
                    : "ℹ️"}
                </span>
                <span className="text-sm">{notification.message}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeNotification(notification.id);
                }}
                className="ml-2 text-white hover:text-gray-200"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Layout;
