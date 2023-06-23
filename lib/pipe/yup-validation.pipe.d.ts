import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { ValidateOptions } from 'yup';
export declare class YupValidationPipe implements PipeTransform {
    private validationOptions;
    constructor(options?: ValidateOptions);
    transform(value: any, { metatype }: ArgumentMetadata): Promise<any>;
}
