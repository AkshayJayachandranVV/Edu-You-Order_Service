import {OrderService} from "../../application/use-case/order"

class OrderController {
    private orderService:  OrderService

    constructor() {
        this.orderService = new OrderService()
    }


    async orderSuccess(data: any){
        try{
            console.log(data, "order session");

            const result = await this.orderService.orderSuccess(data)

            return result
        }catch(error){
            console.log("error in  order ordercontroller", error);
        }

    }



    async tutorPayouts(data: { tutorId: string }){
        try{
            console.log(data, "order session");

            const result = await this.orderService.tutorPayouts(data)

            return result
        }catch(error){
            console.log("error in  order ordercontroller", error);
        }

    }


}

export const orderController = new OrderController()

