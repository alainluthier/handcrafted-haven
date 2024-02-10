export type User = {
    id: string;
    email: string;
    role: string;
    password: string;
    name: string;
    image_url: string;
    phone: string;
  };
export type Item = {
  id:string,
  name:string,
  category:string,
  description:string,
  price:number,
  image_url:string,
  published:boolean,
  artisan_id:string
<<<<<<< HEAD
}
export type User = {
    id: string;
    email: string;
    role: 'customer'|'artisan';
    password: string;
    name: string;
    image_url: string;
    phone: string;
    history: string;
};
  


=======
}
>>>>>>> d01525efd3c754cd6e2a7265ba7b66a28c9d44ba
