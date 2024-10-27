import {IOrderRepository} from './IOrderRepository';
import {IOrder} from '../entities/IOrder'
import mongoose from "mongoose";
import { Order} from "../../model/order";

export class OrderRepository implements IOrderRepository {
      
  async saveOrder(orderData: IOrder) {
    try {
        // Calculate admin and tutor shares from discountPrice
        const discountPrice = Number(orderData.discountPrice);
        const adminShare = (discountPrice * 0.4).toFixed(2);  // 40% of discountPrice
        const tutorShare = (discountPrice * 0.6).toFixed(2);  // 60% of discountPrice

        const newOrderData = {
            tutorId: orderData.tutorId,
            userId: orderData.userId,  
            courseId: orderData.courseId,  
            price: Number(orderData.price), 
            discountPrice: discountPrice,
            title: orderData.title,  
            level: orderData.level,  
            category: orderData.category,  
            thumbnail: orderData.thumbnail, 
            transactionId: orderData.transactionId,
            paymentStatus: true,
            adminShare: adminShare,
            tutorShare: tutorShare
        };

        const dataId = {
            tutorId: orderData.tutorId,
            userId: orderData.userId,
            courseId: orderData.courseId
        };

        // Create a new order instance and save it
        const newOrder = new Order(newOrderData);
        await newOrder.save();
        console.log('Order saved successfully');
        return { success: true, dataId: dataId, message: "Order saved successfully" };

    } catch (error) {
        console.log('saveOrder error', error);
        return { success: false, message: "Order couldn't be saved. Please try again" };
    }
}


async tutorPayouts(data: { tutorId: string }) {
  try {
      const { tutorId } = data;
      
      // Fetch orders for the given tutorId excluding specified fields
      const orders = await Order.find({ tutorId })
          .select('-paymentStatus -adminShare -courseId -tutorId -transactionId')
          .exec();
      
      if (!orders.length) {
          console.log("No orders found for this tutor");
          return { success: false, message: "No orders found for this tutor" };
      }

      return { success: true, orders };
      
  } catch (error) {
      console.error("Error in tutorPayouts:", error);
      throw new Error('Failed to fetch tutor payouts');
  }
}


    
}