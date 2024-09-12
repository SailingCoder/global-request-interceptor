interface FetchConfig {
    onRequest?: (config?: any) => RequestInit | Promise<RequestInit>;
    onResponse?: (response: Response) => Response | Promise<Response>;
    onError?: (error: any) => void;
}
declare const setupFetchInstance: (config?: FetchConfig) => void;
export default setupFetchInstance;
