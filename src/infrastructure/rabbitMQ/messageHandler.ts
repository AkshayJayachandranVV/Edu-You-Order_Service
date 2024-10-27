import {orderController} from '../../interface/controllers/orderController';
import RabbitMQClient from './client';


export default class MessageHandlers{
     static async handle(operations:string,data : any, correlationId:string,replyTo:string){
        let response
        switch(operations){
            case 'order-save' :
                console.log('Handling operation',operations,data);
                response = await orderController.orderSuccess(data)
                console.log("data reached ",response);
                break;

            case 'order-tutor-payouts' :
                console.log('Handling operation',operations,data);
                response = await orderController.tutorPayouts(data)
                console.log("data reached ",response);
                break;
        }

        await RabbitMQClient.produce(response,correlationId,replyTo)
     }
}


