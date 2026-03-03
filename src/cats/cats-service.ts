import { Inject, Injectable } from "@nestjs/common";
import { Cat } from "./cats-interface";

// Provider
// token value -> dependency injection managed by IOC
// {
//     provide: 'token value', string, className over riding previous instance of injectable
//     useClass: CatsService for class
//     useValue: constant, literal objects or class objects
// }

// @Injectable()
export class CatsService {
    constructor(@Inject('ConfigOptions') private readonly config: any) { }
    private readonly cats: Cat[] = [];

    @Inject('database_connection')
    private readonly dbConnection: any;

    create(cat: Cat) {
        this.cats.push(cat);
        return 'Cat created!'
    }

    findAll(): Cat[] {
        console.log('dbConnection', this.dbConnection);
        return this.cats;
    }
}