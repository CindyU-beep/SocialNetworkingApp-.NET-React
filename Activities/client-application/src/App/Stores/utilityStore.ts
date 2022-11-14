import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../Models/serverError";

export default class utilityStore{
    error: ServerError | null = null;
    token: string | null = window.localStorage.getItem('jwt'); //persist login token
    Loaded = false;


    constructor(){
        makeAutoObservable(this);
        reaction( //reaction only runs when token changes
            () => this.token, //set reaction to token changing 
            token => {
                if (token) { //if these is a token, store the token
                    window.localStorage.setItem('jwt', token);
                } else { //otherwise remove the token
                    window.localStorage.removeItem('jwt')
                }
            }
        )
}

    //setting token as jwt object in local storage 
    setToken = (token: string | null) =>{
        if(token) window.localStorage.setItem('jwt', token);
        this.token = token;
    }

    setServerError = (error: ServerError) => {
        this.error = error;
    }

    setAppLoaded = ()=>{
        this.Loaded=true;
    }
    
}