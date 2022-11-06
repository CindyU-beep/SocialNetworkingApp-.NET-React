import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import utilityStore from "./utilityStore";

interface Store{
    activityStore: ActivityStore;
    utilityStore: utilityStore;
}

//add new stores to store object
export const store: Store ={
    activityStore: new ActivityStore(),
    utilityStore: new utilityStore()
}

export const StoreContext = createContext(store);

//react hook, setup in index.tsx
export function useStore(){
    return useContext(StoreContext);
}