import { create } from "zustand";
import { services } from "@service";
import { ServiceStore } from "@services-interface";
const useServiceStore = create<ServiceStore>((set) => ({
  data: [],
  isLoading: false,
  getData: async (params) => {
    try {
        set({isLoading: true})
      const response = await services.get_services(params);
      if (response.status === 200) {
        response.data.services.forEach((item: any, index: number) => {
          item.index = index + 1;
        });
        set({ data: response?.data?.services });
      }
      set({isLoading: false})
    } catch (error) {
      console.log(error);
    }
  },
  createData: async(data)=>{
    try{
        const response = await services.create_service(data)
        if(response.status === 201){
            set((state)=>({data:[...state.data,response.data]}))
            return response.status
        }
    }catch(error){
        console.log(error)
    }
  },
  deleteData: async(id)=>{
    try{
        const response = await services.delete_service(id)
        console.log(response)
        if(response.status === 200){
            set((state)=>({data: state.data.filter((item)=> item.id !== id)}))
        }
    }catch(error){
        console.log(error)
    }
  },
  updateData: async(data)=>{
    try{
        const response = await services.update_service(data)
        console.log(response)
    }catch(error){
        console.log(error)
    }
  }
}));

export default useServiceStore;
