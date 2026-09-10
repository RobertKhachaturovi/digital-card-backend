import { Resolver } from '@nestjs/graphql';
import { Experience } from './models/experience.model';
import { ExperienceService } from './experience.service';

@Resolver(() => Experience)
export class ExperienceResolver {
  constructor(private readonly experienceService: ExperienceService) {}
}
