/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                hostname:'s3://oafootwearimgs/',
            }
        ]
    }
};

export default nextConfig;
