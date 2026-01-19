"use client"

import { useState, useEffect } from "react";
import Pusher from "pusher-js";

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export default function NotificationButton() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Initialize Pusher
    const pusher = new Pusher("d6153f5d379f974890d0", {
      cluster: "mt1",
    });

    const channel = pusher.subscribe("notice-channel");
    channel.bind("notice-event", (data: any) => {
      //  backend subject & message
      addNotification({
        title: data.subject, 
        message: data.message,
      });
    });

    return () => {
      pusher.unsubscribe("notice-channel");
    };
  }, []);

  const addNotification = (notification: { title: string; message: string }) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      title: notification.title,
      message: notification.message,
      timestamp: new Date(),
      read: false,
    };
    setNotifications(prev => [newNotification, ...prev]);
    setUnreadCount(prev => prev + 1);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  const getTimeAgo = (timestamp: Date) => {
    const diff = Math.floor((new Date().getTime() - timestamp.getTime()) / 1000);
    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} h ago`;
    return `${Math.floor(diff / 86400)} d ago`;
  };

  return (
    <div className="relative">
      {/* Notification Button */}
      <button
        className="btn btn-ghost btn-circle relative"
        onClick={() => setShowNotifications(!showNotifications)}
      >
        🔔
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 badge badge-xs badge-error">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 max-h-96 bg-white border rounded shadow overflow-y-auto z-50">
          <div className="p-2 border-b flex justify-between items-center">
            <span className="font-bold">Notifications</span>
            {unreadCount > 0 && (
              <button onClick={markAllAsRead} className="text-xs text-blue-500">
                Mark all as read
              </button>
            )}
          </div>
          {notifications.length === 0 ? (
            <div className="text-center text-gray-500 p-4">No notifications</div>
          ) : (
            <ul>
              {notifications.map(n => (
                <li
                  key={n.id}
                  className={`p-3 border-b cursor-pointer ${n.read ? 'bg-gray-50' : 'bg-blue-50'}`}
                  onClick={() => markAsRead(n.id)}
                >
                  <div className="text-lg font-bold text-gray-900">{n.title}</div>
                  <div className="text-sm text-gray-700 mt-1">{n.message}</div>
                  <div className="text-xs text-gray-500 mt-2">{getTimeAgo(n.timestamp)}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
