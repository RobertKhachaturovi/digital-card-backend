import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile() {
    const profile = await this.prisma.profile.findFirst({
      include: {
        skills: true,
        experiences: true,
        projects: true,
      },
    });

    if (!profile) {
      return null;
    }

    return {
      ...profile,
      experience: profile.experiences,
    };
  }
}
