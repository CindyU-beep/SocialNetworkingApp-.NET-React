import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import ModalStore from "./modalStore";
import UserStore from "./userStore";
import utilityStore from "./utilityStore";

interface Store{
    activityStore: ActivityStore;
    utilityStore: utilityStore;
    userStore: UserStore;
    modalStore: ModalStore;
}

//add new stores to store object
export const store: Store ={
    activityStore: new ActivityStore(),
    utilityStore: new utilityStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore()
}

export const StoreContext = createContext(store);

//react hook, setup in index.tsx
export function useStore(){
    return useContext(StoreContext);
}