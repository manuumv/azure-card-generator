import Schema from 'async-validator';
import { User } from 'common/entities';

const userSchema = new Schema({
  name: { type: 'email', required: true },
  token: { type: 'string', required: true },
  organization: { type: 'string', required: true },
})

export const validateUser = async (user: User) => await userSchema.validate(user, { suppressWarning: true });
