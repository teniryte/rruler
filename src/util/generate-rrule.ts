import { RruleGenerateInterface } from '../types/generate.interface';
import { compileRrule } from './compile-rrule';
import { createRrule } from './create-rrule';

export const generateRrule = (data: RruleGenerateInterface): string => {
  return compileRrule(createRrule(data));
};
