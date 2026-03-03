import { ArgumentMetadata, NotFoundException, PipeTransform } from "@nestjs/common";

const UsersDB = {
    2: {
        name: 'Bhavdeep',
        age: 22
    }
}

export class UserByIdPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        console.log('value', value);
        const id = value;
        const user = UsersDB[id];
        if (!user) {
            throw new NotFoundException()
        }
        return user
    }
}