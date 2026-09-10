import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './profile/profile.module';
import { SkillModule } from './skill/skill.module';
import { ExperienceModule } from './experience/experience.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    PrismaModule,
    ProfileModule,
    SkillModule,
    ExperienceModule,
    ProjectModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault() as any],
    }),
  ],
})
export class AppModule {}
