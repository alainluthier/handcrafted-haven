
export type Item = {
  id:string,
  name:string,
  category:string,
  description:string,
  price:number,
  image_url:string,
  published:boolean,
  artisan_id:string
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
  


