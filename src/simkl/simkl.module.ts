import { Module } from "@nestjs/common";
import { SimklService } from "./simkl.service";

@Module({
    imports: [],
    providers: [SimklService],
    exports: [SimklService],
})
export class SimklModule { }