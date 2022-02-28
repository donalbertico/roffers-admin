// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Roffers } = initSchema(schema);

export {
  Roffers
};