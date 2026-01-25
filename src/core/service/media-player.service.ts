import { Injectable } from '@nestjs/common';
import { VideoRepository } from '@src/persistence/repository/video.repository';
import { VideoNotFoundException } from '../exception/video-not-found.exception';

@Injectable()
export class MediaPlayerService {
  constructor(private readonly videoRepository: VideoRepository) {}

  async prepareStreaming(videoId: string) {
    const video = await this.videoRepository.findById(videoId);

    if (!video) {
      throw new VideoNotFoundException(`Video with id ${videoId} not found`);
    }

    return video.getUrl();
  }
}
