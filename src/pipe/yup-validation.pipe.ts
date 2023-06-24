import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { Schema, ValidateOptions, ValidationError } from 'yup';

interface Error {
  path: string;
  message: string;
}

/**
 * Handle Error Message
 * @param err
 */
const serializeValidationError = (err: ValidationError) => {
  const invalid: Error[] = err.inner.map(({ path, message }) => ({
    path,
    message,
  }));

  return invalid;
};

@Injectable()
export class YupValidationPipe implements PipeTransform {
  private validationOptions: ValidateOptions = { abortEarly: true };

  constructor(options: ValidateOptions = {}) {
    this.validationOptions = Object.assign(this.validationOptions, options);
  }

  async transform(value: any, { metatype }: ArgumentMetadata) {
    const { schema } = metatype?.prototype;
    if (!schema) return value;

    try {
      return await (schema as Schema).validate(value, this.validationOptions);
    } catch (err) {
      throw new BadRequestException(serializeValidationError(err as any));
    }
  }
}
