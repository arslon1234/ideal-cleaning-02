import { create } from "zustand";
import { orders } from "@service";
import { OrdersStore } from "@orders-interface";
const useOrderStore = create<OrdersStore>((set) => ({
  data: [],
  isLoading: false,
  totalCount: 1,
  getData: async (params) => {
    try {
      set({ isLoading: true });
      const response = await orders.get_orders(params);
      if (response.status === 200) {
        // const updatedData = response?.data?.orders_list.map((item, index) => ({
        //   ...item,
        //   index: params.page * params.limit - (params.limit - 1) + index
        // }));
        set((state) => {
          const newData = response?.data?.orders_list.map((item, index) => ({
            ...item,
            index: params.page * params.limit - (params.limit - 1) + index,
          }));
        return {...state, data: newData}
        });
        // set((state) => ({
        //   data: [...state.data, response?.data?.orders_list],
        // }));
        // set((state) => {
        //   const newData = state.data.map((item, index) => ({
        //     ...item,
        //     index: params.page * params.limit - (params.limit - 1) + index,
        //   }));
        //   return {...state, data: newData}
        // });
        set({ totalCount: Math.ceil(response.data.total / params.limit) });
      }
      set({ isLoading: false });
    } catch (error) {
      console.log(error);
    }
  },

  createData: async (data) => {
    try {
      const response = await orders.create_order(data);
      if (response.status === 201) {
        set((state) => ({
          data:
            state.data.length < 10
              ? [...state.data, response.data]
              : [...state.data],
        }));
        return response.status;
      }
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useOrderStore;
