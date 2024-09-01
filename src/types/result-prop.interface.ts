import { RrulePropertiesKeysType } from './properties-names.type';

export interface RawProp {
  name: keyof RrulePropertiesKeysType;
  value: string;
}
