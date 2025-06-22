import { IsDate, IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator";

export class CreateWatchlistDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsUrl()
    imageUrl: string;

    @IsNotEmpty()
    @IsDate()
    nextEpisodeDate: Date;
}
