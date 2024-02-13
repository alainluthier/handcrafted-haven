import { auth } from '@/auth';
import { getUserById } from '../lib/data';
import HomePage from '@/components/home/home';

export  default async function Page() {
  const session = await auth();
  const [User] = await Promise.all([
    getUserById(session?.user.id||'-')
  ]);
  <HomePage user={User}></HomePage>
  
}