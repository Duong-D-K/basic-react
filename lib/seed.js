const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();

const main = () => {
    prisma.gender.create({
        data: {
            name: 'Other'
        }
    }).then(async () => {
        await prisma.$disconnect();
        console.log('seed success')
    })
        .catch(async (e) => {
            console.error(e);
            await prisma.$disconnect();
            process.exit(1);
        });
}


main();
