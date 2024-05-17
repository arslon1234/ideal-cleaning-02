import request from "../config";
import { Request } from "@services-interface";
const services:Request = {
    get_services: (params)=> request.get("/service/all", {params}),
    create_service: (data)=> request.post("/service", data),
    delete_service: (id)=> request.delete(`/service?id=${id}`),
    update_service: (data)=> request.put("/service", data),
}

export default services