import React from "react";
import useAuth from "../hooks/useAuth";

const ProfilePage = () => {
  const { user } = useAuth();
  return (
    <div className="p-6 flex justify-center">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-xl border">
        {/* Top Banner */}
        <div className="h-32 rounded-t-xl bg-gradient-to-r from-slate-800 to-slate-900 relative">
          {/* Profile photo circle */}
          <div className="absolute left-6 -bottom-12">
            <div
              className="w-24 h-24 bg-green-100 flex items-center justify-center text-3xl font-bold
             text-slate-700 rounded-full shadow-lg border-4 border-white"
            >
              S
            </div>
          </div>
        </div>

        {/* User Info Section */}
        <div className="pt-16 px-6 pb-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
              <p className="text-gray-500 text-sm">admin@example.com</p>

              {/* Role Badge */}
              <span className="inline-block mt-2 px-3 py-1 text-xs bg-gray-200 text-gray-600 rounded-full">
                ADMIN
              </span>
            </div>

            <button className="flex items-center gap-2 border px-4 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100">
              <span>✏️</span> Edit Profile
            </button>
          </div>

          {/* Account Details Card */}
          <div className="bg-gray-50 mt-6 p-4 rounded-lg border">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Account Details
            </h3>

            <div className="grid grid-cols-2 text-sm text-gray-600">
              <div>
                <p className="font-medium">Member Since:</p>
                <p>11/28/2025</p>
              </div>

              <div>
                <p className="font-medium">User ID:</p>
                <p className="font-mono">admin_1</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
