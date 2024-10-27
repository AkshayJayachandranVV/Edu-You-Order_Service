export interface IOrder {
    userId: string;
    transactionId: string;
    tutorId: string;
    category:string;
    level:string;
    discountPrice:string  | null; 
    courseId: string;
    title: string;
    thumbnail: string;
    price: string;
    adminShare?: string;
    tutorShare?: string; 
    createdAt?: Date; 
    paymentStatus?: boolean; 
  }
  