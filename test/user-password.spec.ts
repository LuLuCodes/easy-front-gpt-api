import { encryptPassword, uuid, makeSalt } from '../src/libs/cryptogram';

describe('create user password', () => {
  it('create user password', async () => {
    const code = uuid();
    const password = 'Myun@123jx';
    const salt = makeSalt(4);
    const encryptedPassword = encryptPassword(password, salt);
    console.log(`code: ${code}`);
    console.log(`salt: ${salt}`);
    console.log(`encryptedPassword: ${encryptedPassword}`);
  });
});
