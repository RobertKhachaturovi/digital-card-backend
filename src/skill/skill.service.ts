import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SkillService {
  constructor(private readonly prisma: PrismaService) {}

  async findByProfileId(profileId: string) {
    return this.prisma.skill.findMany({
      where: { profileId },
    });
  }
}
