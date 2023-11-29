import { setupFetchInterceptor } from './fetchInterceptor';
import { setupAxiosInterceptor } from './axiosInterceptor';
import { setupXhrInterceptor } from './xhrInterceptor';
export { setupFetchInterceptor, setupAxiosInterceptor, setupXhrInterceptor };
export declare function setupGlobalRequestInterceptor({ requestCallback, responseCallback, errorCallback, library }: {
    requestCallback: (request: any) => void;
    responseCallback?: (response: any) => void;
    errorCallback?: (error: any) => void;
    library?: 'axios' | 'fetch';
}): void;
