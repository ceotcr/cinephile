import { PartialType } from '@nestjs/mapped-types';
import { CreateWatchlistDto } from './create-watchlist.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateWatchlistDto extends PartialType(CreateWatchlistDto) {
    @IsOptional()
    @IsBoolean()
    isWatched?: boolean;
}
