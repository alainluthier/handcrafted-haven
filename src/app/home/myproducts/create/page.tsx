import CreateProductForm from '@/components/myproducts/create-form';
import Breadcrumbs from '@/components/myproducts/breadcrumbs';
import { auth } from '@/auth';
export default async function Page() {
  //const customers = await fetchCustomers();
  const session = await auth();
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'My Products', href: '/home/myproducts' },
          {
            label: 'Create Product',
            href: '/home/myproducts/create',
            active: true,
          },
        ]}
      />
      <CreateProductForm artisanid={session?.user.id||'-'} />
    </main>
  );
}