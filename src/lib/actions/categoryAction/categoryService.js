import prisma from '@/lib/prisma';
async function getCategoryService() {
  const categories = await prisma.category.findMany(); // Find all data in table.
  return categories;
}

export { getCategoryService };
