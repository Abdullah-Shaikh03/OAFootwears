import { Protocol } from "@aws-sdk/client-s3";
import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        protocol:'https',
        hostname:"**"
      }
    ]
  }
};

export default nextConfig;
