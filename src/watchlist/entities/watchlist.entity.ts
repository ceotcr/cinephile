import { Column, Entity, PrimaryColumn } from 'typeorm';
@Entity()
export class Watchlist {
    @PrimaryColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ type: 'datetime' })
    nextEpisodeDate: Date;

    @Column()
    imageUrl: string;

    @Column()
    link: string;

    @Column({ default: false })
    isWatched: boolean;
}
