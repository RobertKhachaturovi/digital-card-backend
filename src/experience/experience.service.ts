import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExperienceService {
  constructor(private readonly prisma: PrismaService) {}

  async findByProfileId(profileId: string) {
    return this.prisma.experience.findMany({
      where: { profileId },
    });
  }
}
