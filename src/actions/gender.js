import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const getAllGenders = async () => {
    const data = await prisma.gender.findMany();

    return data;
}