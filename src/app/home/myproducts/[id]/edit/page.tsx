import Form from '@/components/myproducts/edit-form';
import Breadcrumbs from '@/components/myproducts/breadcrumbs';
import { fetchProductById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { auth } from '@/auth';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const session = await auth();
  const [product] = await Promise.all([
    fetchProductById(id)
  ]);

  if (!product) {
    notFound();
  }
  
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'My Products', href: '/home/myproducts' },
          {
            label: 'Edit Product',
            href: `/home/myproducts/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form product={product} artisanid={session?.user.id||'-'}/>
    </main>
  );
}