import { OrderRepository } from "../../domain/repositories/OrderRepository";
import dotenv from 'dotenv';
import Stripe from 'stripe';  // Correct import of Stripe
import { IOrder } from "../../domain/entities/IOrder";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export class OrderService {
  private orderRepo: OrderRepository;

  constructor() {
    this.orderRepo = new OrderRepository();
  }

  async orderSuccess(data: any) {
    try {
      console.log("Processing order in Admin",data);
      const { sessionId } = data;
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      console.log(session.metadata)
       
      if (session.payment_status === 'paid') {
        if (!session.metadata?.userId || !session.metadata?.courseId || !session.metadata?.tutorId) {
          throw new Error("Missing required metadata in the session");
        }
        
        const orderResponse: IOrder = {
          userId: session.metadata.userId,  // Critical fields are guaranteed to be present
          courseId: session.metadata.courseId,
          tutorId: session.metadata.tutorId,
          category: session.metadata?.category || '',  // Optional field with default
          thumbnail: session.metadata?.thumbnail || '',
          title: session.metadata?.title || '',
          price: session.metadata?.price || '',
          discountPrice: session.metadata?.discountPrice || null,
          level: session.metadata?.level || '',
          transactionId: sessionId
        };
        
        const result = await this.orderRepo.saveOrder(orderResponse);
        console.log(result, "Order successfully saved");
        return result;
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error saving order: ${error.message}`);
      }
      throw error;
    }
  }


    async tutorPayouts(data:{tutorId:string}){
      try {
        console.log("service part tutorpay")

        const result =await this.orderRepo.tutorPayouts(data)
        return result
      } catch (error) {
        console.log(error)
      }
    }





}




