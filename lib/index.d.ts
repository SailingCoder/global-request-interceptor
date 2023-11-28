import { setupFetchInterceptor } from './fetchInterceptor';
import { setupAxiosInterceptor } from './axiosInterceptor';
export { setupFetchInterceptor, setupAxiosInterceptor };
export declare function setupGlobalRequestInterceptor({ requestCallback, responseCallback, errorCallback, library }: {
    requestCallback: (request: any) => void;
    responseCallback: (response: any) => void;
    errorCallback: (error: any) => void;
    library?: 'axios' | 'fetch';
}): void;
