import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const profileData = {
  name: 'Robert Khachaturov',
  description:
    'Frontend Developer focused on building modern, responsive web applications with TypeScript, React, Angular and Next.js.',
  githubUrl: 'https://github.com/RobertKhachaturovi',
  linkedinUrl: 'https://www.linkedin.com/in/robertkhachaturovi/',
  portfolioUrl: 'https://portfolio-seven-eosin-c0oglcbone.vercel.app/',
  skills: [
    'TypeScript',
    'JavaScript',
    'HTML',
    'CSS',
    'React',
    'Next.js',
    'Angular',
    'NgRx',
    'NGXS',
    'Zustand',
    'React Context',
    'RxJS',
    'REST APIs',
    'HTTP/HTTPS',
    'JSON',
    'API Integration',
    'Git',
    'Vite',
    'Tailwind CSS',
    'SCSS',
    'Jest',
    'Unit Testing',
    'Debugging & Error Handling',
    'Frontend Architecture',
    'Performance Optimization',
    'Caching Strategies',
    'Prompt Engineering',
    'Cursor IDE',
    'AI-assisted Development',
    'Claude Code',
  ],
  experiences: [
    {
      company: 'Koober Coders IT Studio',
      position: 'Web Developer Intern',
      period: 'January 2026 – July 2026',
      description:
        'Worked on commercial and internal web projects, contributing to frontend development with Angular and React. Built responsive web applications, integrated backend APIs, worked with application architecture and performance optimization, participated in team sprints, code reviews and technical discussions.',
    },
  ],
  projects: [
    {
      name: 'Adre – Restaurant Website',
      projectUrl: 'https://restaurantadre.ge/',
    },
    {
      name: 'IT STEP – Events Platform',
      projectUrl: null,
    },
    {
      name: 'Mercedes-AMG C63',
      projectUrl: null,
    },
  ],
};

async function main() {
  let profile = await prisma.profile.findFirst({
    where: { githubUrl: profileData.githubUrl },
  });

  if (profile) {
    await prisma.skill.deleteMany({ where: { profileId: profile.id } });
    await prisma.experience.deleteMany({ where: { profileId: profile.id } });
    await prisma.project.deleteMany({ where: { profileId: profile.id } });

    profile = await prisma.profile.update({
      where: { id: profile.id },
      data: {
        name: profileData.name,
        description: profileData.description,
        githubUrl: profileData.githubUrl,
        linkedinUrl: profileData.linkedinUrl,
        portfolioUrl: profileData.portfolioUrl,
        skills: {
          create: profileData.skills.map((name) => ({ name })),
        },
        experiences: {
          create: profileData.experiences,
        },
        projects: {
          create: profileData.projects,
        },
      },
    });
  } else {
    profile = await prisma.profile.create({
      data: {
        name: profileData.name,
        description: profileData.description,
        githubUrl: profileData.githubUrl,
        linkedinUrl: profileData.linkedinUrl,
        portfolioUrl: profileData.portfolioUrl,
        skills: {
          create: profileData.skills.map((name) => ({ name })),
        },
        experiences: {
          create: profileData.experiences,
        },
        projects: {
          create: profileData.projects,
        },
      },
    });
  }

  console.log(`Database seeded successfully for profile: ${profile.name} (ID: ${profile.id})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
