import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const TeamMemberManager = () => {
  const [team, setTeam] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    bio: "",
    skills: "",
    socialLinks: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Load team members
  const fetchTeam = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "teamMembers"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTeam(data);
    } catch (error) {
      console.error("Error loading team:", error);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  // Handle create/update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name.trim(),
      role: formData.role.trim(),
      bio: formData.bio.trim(),
      skills: formData.skills.split(",").map((s) => s.trim()),
      socialLinks: formData.socialLinks.split(",").map((s) => s.trim()),
    };

    try {
      if (editingId) {
        await updateDoc(doc(db, "teamMembers", editingId), payload);
        setEditingId(null);
      } else {
        await addDoc(collection(db, "teamMembers"), payload);
      }

      setFormData({
        name: "",
        role: "",
        bio: "",
        skills: "",
        socialLinks: "",
      });

      fetchTeam();
    } catch (error) {
      console.error("Error saving member:", error);
    }
  };

  // Delete member
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "teamMembers", id));
      fetchTeam();
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  // Fill form to edit
  const handleEdit = (member) => {
    setEditingId(member.id);
    setFormData({
      name: member.name,
      role: member.role,
      bio: member.bio,
      skills: member.skills.join(", "),
      socialLinks: member.socialLinks.join(", "),
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold text-center mb-4">
        Team Manager 🐾
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          required
          className="w-full p-3 border rounded-lg"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Role"
          required
          className="w-full p-3 border rounded-lg"
          value={formData.role}
          onChange={(e) =>
            setFormData({ ...formData, role: e.target.value })
          }
        />

        <textarea
          placeholder="Bio"
          required
          className="w-full p-3 border rounded-lg"
          rows={3}
          value={formData.bio}
          onChange={(e) =>
            setFormData({ ...formData, bio: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Skills (comma separated)"
          className="w-full p-3 border rounded-lg"
          value={formData.skills}
          onChange={(e) =>
            setFormData({ ...formData, skills: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Social Links (comma separated)"
          className="w-full p-3 border rounded-lg"
          value={formData.socialLinks}
          onChange={(e) =>
            setFormData({ ...formData, socialLinks: e.target.value })
          }
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          {editingId ? "Update Member" : "Add Member"}
        </button>
      </form>

      {/* List */}
      <ul className="mt-8 space-y-4">
        {team.map((member) => (
          <li
            key={member.id}
            className="p-4 border rounded-lg flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{member.name}</p>
              <p className="text-sm text-gray-600">{member.role}</p>
              <p className="text-xs mt-1">{member.bio}</p>
            </div>

            <div className="space-x-2">
              <button
                onClick={() => handleEdit(member)}
                className="px-3 py-1 bg-yellow-400 rounded-lg text-black"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(member.id)}
                className="px-3 py-1 bg-red-600 rounded-lg text-white"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamMemberManager;
