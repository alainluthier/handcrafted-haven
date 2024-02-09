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
}