import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient;
}

const prismadb = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "production") global.prisma = prisma;

export default prismadb;


// import { PrismaClient } from "@prisma/client"

// declare global {
//   var prisma: PrismaClient | undefined
// }

// const prismadb = global.prisma || new PrismaClient()
// if (process.env.NODE_ENV !== "production") global.prisma = prismadb

// export default prismadb;