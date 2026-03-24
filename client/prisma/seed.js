const prisma = new PrismaClient();

async function main() {
  await prisma.$connect();

  const languages = [
  {
    "id": 1,
    "name": "русский [russian]",
    "code": "ru",
    "locale": "ru-RU",
    "image": "RU",
    "colorText": "2",
    "colorBackground": "white",
    "sort_order": "black",
    "status": 0,
    "createdAt": "2025-02-04 00:00:00",
    "updatedAt": "2025-02-04 00:00:00"
  },
  {
    "id": 3,
    "name": "english [english]",
    "code": "en",
    "locale": "en-EN",
    "image": "EN",
    "colorText": "2",
    "colorBackground": "white",
    "sort_order": "black",
    "status": 1,
    "createdAt": "2025-02-19 21:13:32.044",
    "updatedAt": "2025-02-19 21:13:32.044"
  },
  {
    "id": 2,
    "name": "белорусский [belarussian]",
    "code": "by",
    "locale": "by-BY",
    "image": "BY",
    "colorText": "2",
    "colorBackground": "white",
    "sort_order": "black",
    "status": 2,
    "createdAt": "2025-02-04 16:05:42.355",
    "updatedAt": "2025-02-04 16:05:42.355"
  }
]

  await Promise.all(
    languages.map(async ({ name, code, locale, image, time, colorText, colorBackground, sort_order, status }) => {
      await prisma.i18n.create({
        data: {
          name,
          code,
          locale,
          image,
          time,
          colorText,
          colorBackground,
          sort_order,
          status,
        },
      });
    }),
  );
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });