import { PrismaClient, Tech } from '@prisma/client';

const prisma = new PrismaClient();

async function seedWorkshops() {
  const workshopsData = [
    { name: 'AI : The power of Language NLP' },
    { name: '.NET : The Day Ai writes your next App (Beginner friendly )' },
    { name: 'BI : Mastering Data Insights Power Bi' },
    { name: 'UI/UX Design' },
  ];

  return prisma.workshop.createMany({
    data: [...workshopsData],
  });
}

async function seedFacs() {
  const facsData = [
    { name: 'ISSAT sousse' },
    { name: 'Pristini' },
    { name: 'ENISO' },
    { name: 'EPI' },
    { name: 'ISET SOUSSE' },
    {
      name: 'ISITCOM',
    },
    { name: 'ISG SOUSSE' },
  ];
  return prisma.fac.createMany({
    data: [...facsData],
  });
}
async function seedDomaines() {
  const domainesData = [
    { name: 'BI' },
    { name: 'Agriculture' },
    { name: 'Health tech' },
    { name: 'industrie 4.0' },
  ];
  return prisma.domaine.createMany({
    data: [...domainesData],
  });
}
async function seedChallenges() {
  const challengesDate = [
    {
      name: 'Challenge 1',
      domaineId: 1,
      description: 'description 1',
      points: 60,
      number: 1,
      tech: Tech.AI,
    },
    {
      name: 'Challenge 2',
      domaineId: 1,
      description: 'description 2',
      points: 40,
      number: 2,
      tech: Tech.MOBILE,
    },
    {
      name: 'Challenge 3',
      domaineId: 2,
      description: 'description 3',
      points: 30,
      number: 3,
      tech: Tech.UI_UX,
    },
    {
      name: 'Challenge 4',
      domaineId: 2,
      description: 'description 4',
      points: 20,
      number: 4,
    },
    {
      name: 'Challenge 5',
      domaineId: 3,
      description: 'description 5',
      points: 10,
      number: 5,
    },
    {
      name: 'Challenge 6',
      domaineId: 3,
      description: 'description 6',
      points: 5,
      number: 6,
    },
    {
      name: 'Challenge 7',
      domaineId: 4,
      description: 'description 7',
      points: 3,
      number: 7,
    },
    {
      name: 'Challenge 8',
      domaineId: 4,
      description: 'description 8',
      points: 2,
      number: 8,
    },
  ];
  return prisma.challenge.createMany({
    data: [...challengesDate],
  });
}

async function main() {
  await seedWorkshops();
  await seedFacs();
  await seedDomaines();
  // await seedChallenges();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
