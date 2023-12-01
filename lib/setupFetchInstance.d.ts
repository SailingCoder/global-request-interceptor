interface FetchConfig {
    onRequest?: (input: RequestInfo, init?: RequestInit) => RequestInit;
    onResponse?: (response: Response) => Response;
    onError?: (error: any) => void;
}
declare const setupFetchInstance: (config?: FetchConfig) => void;
export default setupFetchInstance;
