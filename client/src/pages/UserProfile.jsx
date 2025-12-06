import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import api from "../api";

const UserProfile = () => {
  const { user } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  console.log(profile);
  const [formData, setFormData] = useState({
    designation: "",
    pincode: "",
    state: "",
    address: "",
    gender: "",
    image: null,
    profileExists: false,
  });

  // -----------------------------
  // Handle Text Input Change
  // -----------------------------
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // -----------------------------
  // Handle Image Change + Live Preview
  // -----------------------------
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      setFormData({ ...formData, image: file });

      // Live preview for new image
      setProfile((prev) => ({
        ...prev,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  // -----------------------------
  // Submit (Create or Update)
  // -----------------------------
  const HandleSubmit = async (e) => {
    e.preventDefault();

    const formPayload = new FormData();
    formPayload.append("designation", formData.designation);
    formPayload.append("pincode", formData.pincode);
    formPayload.append("state", formData.state);
    formPayload.append("address", formData.address);
    formPayload.append("gender", formData.gender);
    if (formData.image) formPayload.append("image", formData.image);
    formPayload.append("userId", user._id);

    try {
      let res;

      if (formData.profileExists) {
        res = await api.put(`/user/${user._id}`, formPayload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        res = await api.post("/user", formPayload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      // Refresh updated data

      await fetchProfile();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  // -----------------------------
  // Fetch User Profile
  // -----------------------------
  const fetchProfile = async () => {
    try {
      const res = await api.get(`/user/profile/${user._id}`);
      console.log(res);

      if (res.data) {
        setProfile(res.data);

        setFormData((prev) => ({
          ...prev,
          ...res.data,
          profileExists: true,
        }));
      }
    } catch (err) {
      console.log("No profile found");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  return (
    <div className="p-6 flex justify-center">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-xl border">
        {/* Top Banner */}
        <div className="h-32 rounded-t-xl bg-gradient-to-r from-slate-800 to-slate-900 relative">
          <div className="absolute left-6 -bottom-12">
            <div className="w-24 h-24 rounded-full shadow-lg border-4 border-white overflow-hidden bg-green-100 flex items-center justify-center">
              {profile?.imagePreview ? (
                <img
                  src={profile.imagePreview}
                  className="w-full h-full object-cover"
                  alt="Profile Preview"
                />
              ) : profile?.image ? (
                <img
                  src={`http://localhost:3100/uploads/profileImages/${profile?.image}`}
                  className="w-full h-full object-cover"
                  alt="Profile"
                />
              ) : (
                <span className="text-3xl font-bold text-slate-700">
                  {user?.name?.charAt(0)?.toUpperCase()}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="pt-16 px-6 pb-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">{user?.name}</h2>
              <p className="text-gray-500">{user?.email}</p>
              <p className="text-gray-500">{user?.contact}</p>

              <span className="inline-block px-3 text-m bg-gray-200 text-gray-600 rounded-full">
                {user?.role}
              </span>
            </div>

            <button
              className="flex items-center gap-2 border px-4 py-2 rounded-lg text-sm"
              onClick={() => setIsModalOpen(true)}
            >
              ✏️ {formData.profileExists ? "Edit Profile" : "Add Profile"}
            </button>
          </div>

          {/* Account Details */}
          <div className="bg-gray-50 mt-6 p-4 rounded-lg border">
            <h3 className="text-sm font-semibold mb-4">Account Details</h3>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">Address:</p>
                <p>{formData.address || "---------"}</p>
              </div>

              <div>
                <p className="font-medium">Designation:</p>
                <p>{formData.designation || "------"}</p>
              </div>

              <div>
                <p className="font-medium">Member Since:</p>
                <p>
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "---"}
                </p>
              </div>

              <div>
                <p className="font-medium">Pincode:</p>
                <p>{formData.pincode || "---------"}</p>
              </div>

              <div>
                <p className="font-medium">State:</p>
                <p>{formData.state || "--------"}</p>
              </div>

              <div>
                <p className="font-medium">Gender:</p>
                <p>{formData.gender || "-----"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex justify-center items-center backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white w-full max-w-md p-4 rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={HandleSubmit} className="space-y-3">
              <div>
                <label className="block text-sm font-medium">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Designation</label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Profile Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-900 text-white py-2 rounded-lg text-lg font-bold"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
