import { Injectable } from "@nestjs/common";

@Injectable()
export class MyOptionsProvider {
    get() {
        return { localhost: "3000" }
    }
}