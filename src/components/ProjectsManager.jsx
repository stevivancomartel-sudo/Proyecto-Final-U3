import React, { useState } from "react";

const ProjectsManager = () => {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");

  const addProject = () => {
    if (!name.trim()) return;
    setProjects([...projects, name]);
    setName("");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-pink-600">Proyectos</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border p-2 rounded flex-1"
          placeholder="Nombre del proyecto"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={addProject}
          className="bg-pink-500 text-white px-4 py-2 rounded"
        >
          Añadir
        </button>
      </div>

      <ul className="list-disc pl-5 text-gray-600">
        {projects.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsManager;
