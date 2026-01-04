import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateContentData } from '../../core/service/content-management.service';
import { PrismaService } from '../prisma/prisma.service';
import { VideoDAO as VideoDAOInterface } from '../../core/dao/video.dao.interface';

@Injectable()
export class VideoDAO implements VideoDAOInterface {
  constructor(private readonly prismaService: PrismaService) {}

  async create(videoData: CreateContentData) {
    const { title, description, url, thumbnailUrl, sizeInKb } = videoData;

    const createdVideo = await this.prismaService.video.create({
      data: {
        id: randomUUID(),
        title,
        description,
        url,
        thumbnailUrl,
        sizeInKb,
        duration: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return createdVideo;
  }
}
