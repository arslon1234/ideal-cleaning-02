
export interface GetParams {
    limit: number,
    page: number
}
export interface OrdersStore {
    data: any[],
    isLoading: boolean,
    totalCount: number,
    getData: (params:GetParams)=> Promise<any>,
    createData: (data:CreateOrder)=> Promise<any>,
}
export interface CreateOrder {
    client_full_name: string,
    client_phone_number: string,
    amount: number | string,
    service_id: string
}
export interface Request {
    get_orders:(params:GetParams)=> Promise<any>,
    create_order:(data:CreateOrder)=> Promise<any>,
}
