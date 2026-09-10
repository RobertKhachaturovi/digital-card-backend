import { Resolver } from '@nestjs/graphql';
import { Skill } from './models/skill.model';
import { SkillService } from './skill.service';

@Resolver(() => Skill)
export class SkillResolver {
  constructor(private readonly skillService: SkillService) {}
}
