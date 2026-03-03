import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

// transformation pipe
@Injectable()
export class CustomValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        console.log('type', metadata.type);
        console.log('type', metadata.data);
        console.log('value', value);
        return value
    }
}