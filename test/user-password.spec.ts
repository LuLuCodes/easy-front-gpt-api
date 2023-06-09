import { encryptPassword } from '../src/libs/cryptogram';

describe('create user password', () => {
  it('create user password', async () => {
    const password = 'Myun@123jx';
    const salt = 'NNJt';
    const encryptedPassword = encryptPassword(password, salt);
    console.log(`encryptedPassword: ${encryptedPassword}`);
  });
});
