import React, { useEffect, useState } from "react";
import axios from "axios";
import UserRoleModal from "../components/UserRoleModal";
import { useNavigate } from "react-router-dom";

export default function ManageUserRoles() {
  const [userRoles, setUserRoles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserRoles();
  }, []);

  const fetchUserRoles = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/user-roles");
      setUserRoles(res.data);
    } catch (error) {
      console.error("Error fetching user roles:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/user-roles/${id}`);
      fetchUserRoles();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleSave = async (formData) => {
    try {
      if (editingUser) {
        await axios.put(
          `http://localhost:8080/api/user-roles/${editingUser.id}`,
          formData
        );
      } else {
        await axios.post("http://localhost:8080/api/user-roles", formData);
      }
      setIsModalOpen(false);
      fetchUserRoles();
    } catch (error) {
      console.error("Error saving user role:", error);
    }
  };

  return (
    <div className="p-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
      >
        ← Back
      </button>
      <h2 className="text-2xl font-bold mb-6 text-center">Manage User Roles</h2>
      <div className="border rounded overflow-hidden">
        <div className="max-h-96 overflow-y-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Email ID</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Program</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Market</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userRoles.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="px-4 py-2">{user.id}</td>
                  <td className="px-4 py-2">{user.emailId}</td>
                  <td className="px-4 py-2">{user.role}</td>
                  <td className="px-4 py-2">{user.program}</td>
                  <td className="px-4 py-2">{user.status}</td>
                  <td className="px-4 py-2">{user.market}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-6 text-center">
        <button
          onClick={handleAdd}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add New User Role
        </button>
      </div>

      <UserRoleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingUser}
      />
    </div>
  );
}
