import prisma from '@/lib/prisma';
async function getRoleService() {
  const roles = await prisma.role.findMany(); // Find all data in table.
  return roles;
}

export { getRoleService };
