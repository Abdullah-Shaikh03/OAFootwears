
declare module "next-auth" {
  interface user {
    id: string;
    role: string;
  }

  interface Session {
    id: string;
    user: User;
    role: string;
  }
  export interface product {
    _id: string;
    brandName: string;
    article: string;
    price: number;
  }
}

