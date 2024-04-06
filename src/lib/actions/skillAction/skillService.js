import prisma from '@/lib/prisma';
async function getSkillService() {
  const skills = await prisma.skill.findMany(); // Find all data in table.
  return skills;
}

export { getSkillService };
