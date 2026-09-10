import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}

  async findByProfileId(profileId: string) {
    return this.prisma.project.findMany({
      where: { profileId },
    });
  }
}
