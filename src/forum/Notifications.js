import React, { useState, useEffect, useCallback } from 'react';
import './Notifications.css';

// Notification context to manage notifications throughout the app
export const NotificationContext = React.createContext({
  notify: () => {},
  notifications: [],
});

// Individual notification component
const Notification = ({ id, type, message, onDismiss }) => {
  useEffect(() => {
    // Auto-dismiss after 4 seconds
    const timeout = setTimeout(() => {
      onDismiss(id);
    }, 4000);

    return () => clearTimeout(timeout);
  }, [id, onDismiss]);

  return (
    <div className={`notification notification-${type}`}>
      <div className="notification-icon">
        {type === 'success' && '✓'}
        {type === 'error' && '✕'}
        {type === 'info' && 'ℹ'}
        {type === 'warning' && '⚠'}
      </div>
      <div className="notification-message">{message}</div>
      <button className="notification-close" onClick={() => onDismiss(id)}>
        ✕
      </button>
    </div>
  );
};

// Notification provider component to wrap the app
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Remove a notification by id
  const dismissNotification = useCallback((id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  }, []);

  // Add a new notification
  const notify = useCallback((type, message) => {
    const id = Date.now();
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      { id, type, message },
    ]);
    return id;
  }, []);

  // Context value
  const contextValue = {
    notify,
    notifications,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      <div className="notifications-container">
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            id={notification.id}
            type={notification.type}
            message={notification.message}
            onDismiss={dismissNotification}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

// Custom hook to use notifications in components
export const useNotifications = () => {
  const context = React.useContext(NotificationContext);
  
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  
  return {
    notifications: context.notifications,
    notifySuccess: (message) => context.notify('success', message),
    notifyError: (message) => context.notify('error', message),
    notifyInfo: (message) => context.notify('info', message),
    notifyWarning: (message) => context.notify('warning', message),
  };
};

export default NotificationProvider; 