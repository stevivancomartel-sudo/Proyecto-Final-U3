import { useState, useEffect } from "react";
import {
  SiReact,
  SiNodedotjs,
  SiPython,
  SiTailwindcss,
  SiPostgresql,
  SiFigma,
} from "react-icons/si";
import { FaCode, FaLightbulb, FaUsers } from "react-icons/fa";

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    // Simula carga de datos
    setTimeout(() => {
      setSkills([
        {
          id: 1,
          categoria: "Frontend",
          habilidades: [
            {
              nombre: "React",
              nivel: 85,
              descripcion: "Creamos interfaces modernas y rápidas.",
            },
            {
              nombre: "TailwindCSS",
              nivel: 80,
              descripcion: "Diseños elegantes con estilos sencillos.",
            },
          ],
        },
        {
          id: 2,
          categoria: "Backend",
          habilidades: [
            { nombre: "Node.js", nivel: 75, descripcion: "Aplicaciones rápidas y seguras." },
            { nombre: "PostgreSQL", nivel: 70, descripcion: "Gestión confiable de bases de datos." },
          ],
        },
        {
          id: 3,
          categoria: "Habilidades Blandas",
          habilidades: [
            {
              nombre: "Trabajo en equipo",
              nivel: 90,
              descripcion: "Colaboración y comunicación constante.",
            },
            {
              nombre: "Creatividad",
              nivel: 85,
              descripcion: "Buscamos soluciones únicas e innovadoras.",
            },
          ],
        },
      ]);
    }, 800);
  }, []);

  return (
    <div className="py-16 bg-pink-50">
      {/* Encabezado */}
      <section className="bg-pink-300 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-6">Habilidades de Kitty Code 💻</h1>
        <p className="text-xl max-w-2xl mx-auto">
          Aquí mostramos las competencias de nuestro equipo en desarrollo y diseño, 
          combinando creatividad y tecnología para entregar los mejores proyectos 💕.
        </p>
      </section>

      {/* Cartillas */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 mt-12">
        {skills.map((categoria) => (
          <div
            key={categoria.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-6 border border-pink-100 transform hover:-translate-y-2 hover:scale-105"
          >
            {/* Título de categoría resaltado */}
            <h2 className="text-2xl font-semibold text-pink-600 mb-4 text-center bg-pink-100 rounded-xl py-2 px-4 inline-block">
              {categoria.categoria}
            </h2>

            {categoria.habilidades.map((hab) => (
              <div key={hab.nombre} className="mb-5">
                <div className="flex items-center gap-2 mb-1">
                  {getIcono(hab.nombre)}
                  <h3 className="font-semibold text-gray-800">{hab.nombre}</h3>
                </div>

                <div className="w-full bg-pink-100 rounded-full h-3 mb-2 overflow-hidden">
                  <div
                    className="bg-pink-400 h-3 rounded-full transition-all duration-1000 ease-in-out"
                    style={{ width: `${hab.nivel}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">{hab.descripcion}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Pie */}
      <section className="mt-16 text-center">
        <p className="text-gray-700 text-lg">
          💕 Siempre aprendiendo, mejorando y creando con pasión.
        </p>
      </section>
    </div>
  );
};

// Iconos para habilidades
const getIcono = (nombre) => {
  const iconProps = { size: 24, className: "text-pink-500" };
  const iconos = {
    React: <SiReact {...iconProps} />,
    TailwindCSS: <SiTailwindcss {...iconProps} />,
    "Node.js": <SiNodedotjs {...iconProps} />,
    PostgreSQL: <SiPostgresql {...iconProps} />,
    Python: <SiPython {...iconProps} />,
    Figma: <SiFigma {...iconProps} />,
    Creatividad: <FaLightbulb {...iconProps} />,
    "Trabajo en equipo": <FaUsers {...iconProps} />,
  };
  return iconos[nombre] || <FaCode {...iconProps} />;
};

export default Skills;

