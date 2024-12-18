import { DataSource } from 'typeorm';
import { User } from '../modules/user/user.entity';

export async function seedUsers(dataSource: DataSource): Promise<User[]> {
  const userRepository = dataSource.getRepository(User);

  const usersToInsert = [
    {
      name:'fran',
      walletAddress: 'HsAdvNNVWtmnXRMDKYz12JNXq15beZdSkwyJjX7PxtFb'
    },
    {
      name:'nahue',
      walletAddress: '6wKRcxKTjJCWcHdSyeq9SLTDxKSwjR65PvB4ruDGkjjP'
    },
    {
      name:'franactis',
      walletAddress: 'GVin63kayPZ8YrXRMXyZyF2nm9bjctWafbtjkDVVW7Ym'
    },
    {
      name:'dave',
      walletAddress: 'J3DF9fZfWpd5WMucvLk2VjoUcPu12M4nTKupWWMLx4Ge'
    },
    {
      name:'raquel',
      walletAddress: 'ETqMTjGZUj2a3Jhp41X7PtNUMFDVJfnmdXRihy6rTxtG'
    },
    {
      name:'lucho1',
      walletAddress: '7dY73Q3mbHj5VuDKnGXdWfu1Trpt1Nn9MmZ8ZdiM3nM5'
    },
    {
      name:'lucho2',
      walletAddress: '28er48xoHg7jxNfy6eT7gCcVCRZg8QzbPxkMRBhEjSMT'
    }
  ];

  const users: User[] = [];

  for (const userToInsert of usersToInsert) {
    const user = userRepository.create({
      username: userToInsert.name,
      walletAddress: userToInsert.walletAddress,
    });
    await userRepository.save(user);
    users.push(user);
  }

  console.log('Users seeded successfully!');
  return users;
}
