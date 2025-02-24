import prismadb from "@/lib/prismadb";

const getActiveLanguages = async () => {
  const languagesActive = await prismadb.l18n.findMany({
    where: {      
      status: true,
    }
  });
  return languagesActive;
};
export {getActiveLanguages}