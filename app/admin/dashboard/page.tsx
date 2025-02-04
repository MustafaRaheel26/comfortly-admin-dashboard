"use client";

import React, { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";

import Swal from "sweetalert2";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { motion } from "framer-motion";

interface OrderItem {
  product?: { _ref: string };
  quantity?: number;
  price?: number;
}

interface Order {
  _id: string;
  customerName?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  zipCode?: string;
  totalAmount?: number;
  totalItems?: number;
  orderDate?: string;
  status?: string;
  items?: OrderItem[];
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    client
      .fetch(
        `*[_type == "order"]{
          _id,
          customerName,
          phone,
          email,
          address,
          city,
          zipCode,
          totalAmount,
          totalItems,
          orderDate,
          status,
          items[] {
            product->{ _id, title, mainImage },
            quantity,
            price
          }
        }`
      )
      .then((data) => {
        if (Array.isArray(data)) {
          console.log("Fetched orders:", data);
          setOrders(data);
        } else {
          console.error("Unexpected API response:", data);
          setOrders([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setOrders([]);
      });
  }, []);

  const filteredOrders =
    filter === "All" ? orders : orders.filter((order) => order.status === filter);

  const handleDelete = async (orderId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action is irreversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await client.delete(orderId);
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
      Swal.fire("Deleted!", "Your order has been removed.", "success");
    } catch (error) {
      console.error("Error deleting order:", error);
      Swal.fire("Error!", "Something went wrong while deleting.", "error");
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await client.patch(orderId).set({ status: newStatus }).commit();

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );

      Swal.fire("Updated!", `Order marked as ${newStatus}.`, "success");
    } catch (error) {
      console.error("Error updating order status:", error);
      Swal.fire("Error!", "Failed to update status.", "error");
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col h-screen bg-gradient-to-br from-white to-gray-100">
        {/* Navbar */}
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gradient-to-r from-green-500 to-green-700 text-white p-4 shadow-lg flex justify-between rounded-b-xl"
        >
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
          <div className="flex space-x-3">
            {["All", "Pending", "Shipped", "Delivered"].map((status) => (
              <button
                key={status}
                className={`px-4 py-2 rounded-lg transition-all ${
                  filter === status ? "bg-white text-green-600 font-bold" : "text-white"
                }`}
                onClick={() => setFilter(status)}
              >
                {status}
              </button>
            ))}
          </div>
        </motion.nav>

        {/* Orders Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-1 p-6 overflow-y-auto"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-green-600">Orders</h2>
          <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
            <table className="min-w-full divide-y divide-gray-200 text-sm lg:text-base">
              <thead className="bg-green-500 text-white">
                <tr>
                  <th className="p-3">ID</th>
                  <th>Customer</th>
                  <th>Address</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <motion.tr
                      key={order._id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="cursor-pointer hover:bg-green-50 transition-all"
                    >
                      <td className="p-3">{order._id.slice(-6)}</td>
                      <td>{order.customerName || "Unknown"}</td>
                      <td>{order.address || "N/A"}</td>
                      <td>
                        {order.orderDate
                          ? new Date(order.orderDate).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td>${(order.totalAmount ?? 0).toFixed(2)}</td>
                      <td>
                        <select
                          value={order.status || "Pending"}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          className="bg-gray-200 p-1 rounded-md"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                      <td>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(order._id);
                          }}
                          className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition-all"
                        >
                          Delete
                        </button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center py-4">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </ProtectedRoute>
  );
}
