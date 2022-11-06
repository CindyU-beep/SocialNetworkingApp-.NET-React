//requests for API
import axios, { AxiosError, AxiosResponse } from 'axios';
import { config } from 'process';
import { toast } from 'react-toastify';
import { history } from '../..';
import { Activity } from '../Models/activity';
import { store } from '../Stores/store';

const sleep = (delay: number) =>{
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    }) 
}

axios.defaults.baseURL="http://localhost:5000/api";

axios.interceptors.response.use(async response => { //loading delay logic 
        await sleep(1000);
        return response;
}, (error: AxiosError) =>{ //Error Handling logic
    const {data, status, config} = error.response!;
    
    switch(status) {
        case 400: //bad request and validation error 
            if(typeof data === 'string'){
                toast.error(data);
            }
            if(config.method === 'get' && data.errors.hasOwnProperty('id')) {
                history.push('/not-found'); //redirect to not found error
            }
            if (data.errors){
                const modalStateErrors =[];
                for (const key in data.errors) {
                    if(data.errors[key]){
                        modalStateErrors.push(data.errors[key]) //loop over array of errors for validation error
                    }
                }
                throw modalStateErrors.flat(); 
            }
            break;
            
        case 401: 
            toast.error('unauthorised');
            break;
        case 404: // not found error
            history.push('/not-found');
            break;
        case 500: //server error
            store.utilityStore.setServerError(data);
            history.push('/server-error');
            break;
    }
    return Promise.reject(error);

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