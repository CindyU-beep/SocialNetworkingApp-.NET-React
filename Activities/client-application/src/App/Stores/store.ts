import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";

interface Store{
    activityStore: ActivityStore;
}

//add new stores to store object
export const store: Store ={
    activityStore: new ActivityStore()
}

export const StoreContext = createContext(store);

//react hook, setup in index.tsx
export function useStore(){
    return useContext(StoreContext);
}