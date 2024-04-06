import prisma from '@/lib/prisma';
async function getTypeService() {
  const types = await prisma.type.findMany(); // Find all data in table.
  return types;
}

export { getTypeService };
