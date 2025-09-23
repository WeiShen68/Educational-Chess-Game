// aims to create a default list of rejection code based on specific response code
import { REJECT_CODE } from './enum';

const data = [
  {
    values: ['NotAvailable', 'Unauthorised', 'Forbidden', 'Expired'],
    code: REJECT_CODE.UNAUTHORISED,
  },
];

export default data;
