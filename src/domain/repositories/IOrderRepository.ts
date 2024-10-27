import {IOrder} from '../entities/IOrder'
export interface IOrderRepository {
  saveOrder(orderData: IOrder): Promise<{ success: boolean; message: string }>; 
  // Other method declarations
}
