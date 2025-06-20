import { IsDate, IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator";

export class CreateWatchlistDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsUrl()
    imageUrl: string;

    @IsNotEmpty()
    @IsUrl()
    link: string;

    @IsNotEmpty()
    @IsDate()
    nextEpisodeDate: Date;
}
