import { useState, useEffect } from "react";

const Team = () => {
  const [team, setTeam] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const teamInfo = [
    {
      id: 1,
      name: "Besnaliz Faria",
      role: "Front-end Developer",
      bio: "Apasionada por crear interfaces atractivas y accesibles.",
      skills: ["React", "Tailwind", "CSS", "JavaScript"],
      currentFocus: "Desarrollando sitios web dinámicos y responsivos.",
      funFact: "Ama los gatos y el café ☕",
      socialLinks: {
        linkedin: "https://linkedin.com/in/besnaliz",
        github: "https://github.com/besnaliz",
      },
    },
    
    {
      id: 3,
  name: "Xiomara Díaz",
  role: "Product Manager",
  bio: "Enfocada en construir productos que combinan creatividad.",
  skills: ["ProductStrategy", "Roadmapping", "UserResearch"],
  currentFocus: "Coordinando equipos multidisciplinarios para lanzar soluciones escalables.",
  funFact: "Organiza su vida con Notion y tiene dashboards para TODO 💗",
  socialLinks: {
    linkedin: "https://www.linkedin.com/in/xiomara-diaz/",
    github: "https://github.com/ximara-dev"},
    },
    {
      id: 4,
      name: "Stefany Vivanco",
      role: "UI/UX Designer",
      bio: "Diseña experiencias digitales intuitivas y memorables.",
      skills: ["Figma", "Adobe XD", "Illustrator", "Photoshop"],
      currentFocus: "Prototipando y testeando interfaces con usuarios.",
      funFact: "Fan de la fotografía urbana 📸",
      socialLinks: {
        linkedin: "https://linkedin.com/in/stefany",
        behance: "https://behance.net/stefany",
      },
    },
    {
      id: 2,
      name: "Sofía Lagos",
      role: "Back-end Developer",
      bio: "Especialista en lógica de servidor y optimización de APIs.",
      skills: ["Node.js", "Express", "MongoDB", "REST API"],
      currentFocus: "Creando sistemas seguros y escalables.",
      funFact: "Colecciona stickers de programación 🩷",
      socialLinks: {
        linkedin: "https://www.linkedin.com/public-profile/settings?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_self_edit_contact-info%3B7qIowolFSgmIKJopB%2B%2B%2B9Q%3D%3D",
        github: "https://github.com/sofía",
      },
    },
  ];

  const testimonialInfo = [
    {
      id: 1,
      name: "Laura Fernández",
      role: "CEO Tech Solutions",
      company: "Tech Solutions",
      project: "Sitio Web Corporativo",
      content:
        "El equipo hizo un trabajo impecable, cumpliendo los plazos y superando nuestras expectativas.",
      rating: 5,
    },
    {
      id: 2,
      name: "Jorge Medina",
      role: "Project Manager",
      company: "Innovatech",
      project: "App Móvil",
      content:
        "Su creatividad y dedicación hicieron que nuestro proyecto fuese un éxito rotundo.",
      rating: 5,
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setTeam(teamInfo);
      setTestimonials(testimonialInfo);
      setIsLoading(false);
    }, 700);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50">
        <div className="text-center text-pink-500">
          <div className="w-16 h-16 border-4 border-pink-300 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Cargando al equipo Kitty Code...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-pink-50 min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-pink-300 to-rose-200 text-white py-20 text-center shadow-md">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4 drop-shadow-sm">
          Conoce a nuestro equipo
        </h1>
        <p className="text-lg text-white/90 max-w-2xl mx-auto">
          Somos un grupo de chicas apasionadas por la tecnología y el diseño,
          creando proyectos llenos de color y propósito 💖
        </p>
      </section>

      {/* Team Members */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-pink-600 mb-10 text-center">
          🌷 Nuestro Equipo
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {team.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white px-6">
        <h2 className="text-3xl font-bold text-pink-600 mb-10 text-center">
          💕 Lo que dicen de nosotras
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </section>
    </div>
  );
};

// 🌸 Tarjeta del equipo
const TeamMemberCard = ({ member }) => (
  <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-6 border border-pink-100 text-center">
    <div className="text-5xl mb-4">👩‍💻</div>
    <h3 className="text-xl font-semibold text-pink-600">{member.name}</h3>
    <p className="text-gray-600 font-medium mb-3">{member.role}</p>
    <p className="text-gray-500 text-sm mb-4">{member.bio}</p>

    <div className="flex flex-wrap justify-center gap-2 mb-4">
      {member.skills.map((skill, i) => (
        <span
          key={i}
          className="bg-pink-100 text-pink-600 px-2 py-1 rounded-full text-xs font-semibold"
        >
          {skill}
        </span>
      ))}
    </div>

    <div className="bg-rose-50 p-3 rounded-lg text-sm text-gray-700 mb-3">
      🎯 <strong>Enfoque actual:</strong> {member.currentFocus}
    </div>
    <div className="bg-pink-50 p-3 rounded-lg text-sm text-gray-700 mb-4">
      ✨ <strong>Dato curioso:</strong> {member.funFact}
    </div>

    <div className="flex justify-center gap-4 text-xl text-pink-500">
      {Object.entries(member.socialLinks).map(([platform, url]) => (
        <a
          key={platform}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-125 transition-transform"
        >
          {getSocialIcon(platform)}
        </a>
      ))}
    </div>
  </div>
);

// 💬 Tarjeta de testimonio
const TestimonialCard = ({ testimonial }) => (
  <div className="bg-pink-50 border border-pink-100 rounded-2xl shadow-sm p-6">
    <p className="text-gray-700 italic mb-4">“{testimonial.content}”</p>
    <div className="text-right">
      <h4 className="font-semibold text-pink-600">{testimonial.name}</h4>
      <p className="text-sm text-gray-600">{testimonial.role}</p>
      <p className="text-xs text-gray-500">{testimonial.company}</p>
      <div className="text-yellow-400 mt-1">
        {"⭐".repeat(testimonial.rating)}
      </div>
    </div>
  </div>
);

// Iconos de redes
const getSocialIcon = (platform) => {
  const icons = {
    linkedin: "💼",
    github: "📚",
    behance: "🎨",
    email: "📧",
  };
  return icons[platform] || "🔗";
};

export default Team;


