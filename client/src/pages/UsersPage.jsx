import React, { useEffect } from "react";
import api from "../api";

const UsersPage = () => {
  const [users, setUsers] = useState("");
  const getAllUsers = async () => {
    try {
      const res = await api.get("/admin/getUsers");
      // console.log(res.data);
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="p-6">
      {/* Container */}
      <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-200">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">All Users</h2>

          <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition">
            <span className="text-lg">+</span> Add User
          </button>
        </div>

        {/* Table */}
        <table className="w-full">
          <thead>
            <tr className="text-gray-500 text-sm border-b">
              <th className="text-left py-3">Name</th>
              <th className="text-left py-3">Role</th>
              <th className="text-left py-3">Created</th>
              <th className="text-left py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {/* Row */}
            <tr className="text-gray-800 border-b">
              {/* Name + email */}
              <td className="py-4">
                <div className="font-semibold">Super Admin</div>
                <div className="text-sm text-gray-500">admin@example.com</div>
              </td>

              {/* Role */}
              <td className="py-4">
                <span className="px-3 py-1 text-sm rounded-full bg-purple-100 text-purple-700">
                  Admin
                </span>
              </td>

              {/* Created Date */}
              <td className="py-4 text-gray-600">11/28/2025</td>

              {/* Actions */}
              <td className="py-4">
                <button className="text-blue-600 hover:underline text-sm">
                  Edit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;
