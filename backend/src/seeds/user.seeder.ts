import { DataSource } from 'typeorm';
import { User } from '../modules/user/user.entity';

export async function seedUsers(dataSource: DataSource): Promise<User[]> {
  const userRepository = dataSource.getRepository(User);

  const userNames = ['fran', 'nahue', 'mike', 'dave', 'lucho', 'raquel'];

  const users: User[] = [];

  for (const userName of userNames) {
    const user = userRepository.create({
      username: userName,
      walletAddress: `${userName}-wallet-address`,
    });
    await userRepository.save(user);
    users.push(user);
  }

  console.log('Users seeded successfully!');
  return users;
}