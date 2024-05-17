import request from "../config";
import { Request } from "@orders-interface";
const orders:Request = {
    get_orders: (params)=> request.get("/order/all", {params}),
    create_order: (data)=> request.post("/order", data)
}

export default orders