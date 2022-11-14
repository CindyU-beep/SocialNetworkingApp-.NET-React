import { makeAutoObservable, runInAction } from "mobx";
import agent from "../API/agent";
import { User, UserFormValues } from "../Models/user";
import { store } from "./store";
import {history } from "../..";

export default class UserStore{
    user: User | null = null;

    constructor(){
        makeAutoObservable(this)
    }

    get LoggedIn(){
        return !!this.user;
    }

    login = async (credentials: UserFormValues) => {
        try {
            const user = await agent.Account.login(credentials);
            store.utilityStore.setToken(user.token) //set a new token
            runInAction(() => {
                this.user = user; //setting user object
            }); 
           history.push('/activities');//redirect user to activities
           store.modalStore.closeModal(); //close the login after submitted
           
        } catch (error) {
          throw error;
        }
    };

    getUser = async () => {
      try {
        const user = await agent.Account.current();
        runInAction(() => {
          this.user = user;
        });
      } catch (error) {
        console.log(error);
      }
    };

    //logout method, set token to null and remove from local storage, redirect user to home 
    logout = () => { 
      store.utilityStore.setToken(null);
      window.localStorage.removeItem('jwt');
      this.user=null;
      history.push('/');
    }

    register = async (credentials: UserFormValues) => {
      try {
          const user = await agent.Account.register(credentials);
          store.utilityStore.setToken(user.token) //set a new token
          runInAction(() => {
              this.user = user; //setting user object
          }); 
         history.push('/activities');//redirect user to activities
         store.modalStore.closeModal(); //close the register form after submitted 
      } catch (error) {
        throw error;
      }
  }
}