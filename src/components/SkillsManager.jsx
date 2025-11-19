import React, { useState } from "react";

const SkillsManager = () => {
  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState("");

  const addSkill = () => {
    if (!skill.trim()) return;
    setSkills([...skills, skill]);
    setSkill("");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-pink-600">Habilidades</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border p-2 rounded flex-1"
          placeholder="Nueva habilidad"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />
        <button
          onClick={addSkill}
          className="bg-pink-500 text-white px-4 py-2 rounded"
        >
          Añadir
        </button>
      </div>

      <ul className="list-disc pl-5 text-gray-600">
        {skills.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
    </div>
  );
};

export default SkillsManager;
