//requests for API
import axios, { AxiosResponse } from 'axios';
import { Activity } from '../Models/activity';

const sleep = (delay: number) =>{
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    }) 
}

axios.defaults.baseURL="http://localhost:5000/api";

axios.interceptors.response.use(async response => { //loading delay logic 
    try {
        await sleep(1000);
        return response;

    } catch (error){
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data; //use generics for type safety

const requests = { //data object
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),  
    post:<T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody), 
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody), 
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody), 
}

const Activities ={
    list: () => requests.get<Activity[]>('/activities'), //returns promise of type Activity 
    details: (id: string) => requests.get<Activity>(`/activities/${id}`), //pull data from API 
    create: (activity: Activity) => axios.post('/activities', activity),
    update: (activity: Activity) => axios.put(`/activities/${activity.id}`,activity),
    delete: (id: string) => axios.delete(`/activities/${id}`)

}

const agent = {
    Activities
}

export default agent;