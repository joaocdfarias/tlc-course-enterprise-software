import { Module } from '@nestjs/common';
import { ContentController } from '@src/http/rest/controller/content.controller';
import { PrismaService } from '@src/persistence/prisma/prisma.service';
import { VideoDAO } from './core/dao/video.dao.interface';
import { ContentManagementService } from './core/service/content-management.service';
import { MediaPlayerService } from './core/service/media-player.service';
import { VideoDAO as VideoDAOImpl } from './persistence/dao/video.dao';

@Module({
  imports: [],
  controllers: [ContentController],
  providers: [
    PrismaService,
    ContentManagementService,
    MediaPlayerService,
    {
      provide: VideoDAO,
      useClass: VideoDAOImpl,
    },
  ],
})
export class AppModule {}
