import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Skill } from '../../skill/models/skill.model';
import { Experience } from '../../experience/models/experience.model';
import { Project } from '../../project/models/project.model';

@ObjectType()
export class Profile {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => String, { nullable: true })
  githubUrl?: string | null;

  @Field(() => String, { nullable: true })
  linkedinUrl?: string | null;

  @Field(() => String, { nullable: true })
  portfolioUrl?: string | null;

  @Field(() => [Skill])
  skills: Skill[];

  @Field(() => [Experience])
  experience: Experience[];

  @Field(() => [Project])
  projects: Project[];
}
