export type User = {
    id: string;
    email: string;
    role: 'customer'|'artisan';
    password: string;
    name: string;
    image_url: string;
    phone: string;
  };