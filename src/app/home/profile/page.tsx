import EditProfileForm from '@/components/profile/profile-form';
import Breadcrumbs from '@/components/myproducts/breadcrumbs';
import { auth } from '@/auth';
import { getUserById } from '@/app/lib/data';
export default async function Page() {
  //const customers = await fetchCustomers();
  const session = await auth();
  const [User] = await Promise.all([
    getUserById(session?.user.id||'-')
  ]);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Home', href: '/home' },
          {
            label: 'Create Product',
            href: '/home/profile',
            active: true,
          },
        ]}
      />
      <EditProfileForm user={User}/>
    </main>
  );
}