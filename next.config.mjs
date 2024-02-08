/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects(){
        return[
            {
                source:'/',
                destination:'/catalog',
                permanent:true
            }
        ]
    }
};
export default nextConfig;
