import { BaseEntity, BaseEntityProps } from './base.entity';
import { ThumbnailEntity } from './thumbnail.entity';
import { VideoEntity } from './video.entity';

export interface MovieEntityProps extends BaseEntityProps {
  video: VideoEntity;
  thumbnail?: ThumbnailEntity;
}

export class MovieEntity extends BaseEntity {
  private video: MovieEntityProps['video'];
  private thumbnail?: MovieEntityProps['thumbnail'];

  private constructor(data: MovieEntityProps) {
    super(data);
    this.video = data.video;
    this.thumbnail = data.thumbnail;
  }

  static createNew(
    data: Omit<MovieEntityProps, 'id' | 'createdAt' | 'updatedAt'>,
    id = crypto.randomUUID(),
  ): MovieEntity {
    return new MovieEntity({
      id,
      video: data.video,
      thumbnail: data.thumbnail,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static createFrom(data: MovieEntityProps): MovieEntity {
    return new MovieEntity({
      id: data.id,
      video: data.video,
      thumbnail: data.thumbnail,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }

  getVideo(): MovieEntityProps['video'] {
    return this.video;
  }

  addThumbnail(thumbnail: ThumbnailEntity): void {
    this.thumbnail = thumbnail;
  }

  getThumbnail(): MovieEntityProps['thumbnail'] | undefined {
    return this.thumbnail;
  }

  serialize() {
    return {
      id: this.id,
      video: this.video.serialize(),
      thumbnail: this.thumbnail ? this.thumbnail.serialize() : null,
      createdAt: this.getCreatedAt(),
      updatedAt: this.getUpdatedAt(),
    };
  }
}
