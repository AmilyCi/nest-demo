import { SetMetadata } from '@nestjs/common';

export const Role = (...args: string[]) => {
  console.log('role', 1);
  return SetMetadata('role', args);
};
