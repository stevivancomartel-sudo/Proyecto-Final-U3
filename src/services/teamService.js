// src/services/teamService.js

// GET
export const getTeamMembers = () => {
  const data = localStorage.getItem("teamMembers");
  return data ? JSON.parse(data) : [];
};

// ADD
export const addTeamMember = (member) => {
  const team = getTeamMembers();
  const newTeam = [...team, { ...member, id: Date.now() }];
  localStorage.setItem("teamMembers", JSON.stringify(newTeam));
};

// UPDATE
export const updateTeamMember = (updatedMember) => {
  const team = getTeamMembers();
  const newTeam = team.map((m) =>
    m.id === updatedMember.id ? updatedMember : m
  );
  localStorage.setItem("teamMembers", JSON.stringify(newTeam));
};

// DELETE
export const deleteTeamMember = (id) => {
  const team = getTeamMembers();
  const newTeam = team.filter((m) => m.id !== id);
  localStorage.setItem("teamMembers", JSON.stringify(newTeam));
};

// SEED DEFAULT TEAM
export const seedTeamIfEmpty = (defaultTeam) => {
  const existing = localStorage.getItem("teamMembers");
  if (!existing) {
    localStorage.setItem("teamMembers", JSON.stringify(defaultTeam));
  }
};
