/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                // hostname:'s3://oafootwearimgs/',
                hostname:'images.unsplash.com',
            }
        ]
    }
};

export default nextConfig;
