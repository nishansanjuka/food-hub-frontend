/** @type {import('next').NextConfig} */
const nextConfig = {
    images :{
        remotePatterns :[
            {
                hostname :'img.freepik.com'
            }
        ],
        formats :[
            'image/avif',
            'image/webp'
        ]
    }
};

export default nextConfig;
