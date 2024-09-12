// Configuration interface for fetch
interface FetchConfig {
  onRequest?: (config?: any) => RequestInit | Promise<RequestInit>;
  onResponse?: (response: Response) => Response | Promise<Response>;
  onError?: (error: any) => void;
}

const setupFetchInstance = (config: FetchConfig = {}): void => {
  const { onRequest, onResponse, onError } = config;

  const originalFetch = fetch;

  const fetchWithInterceptors = async (url: RequestInfo, options?: RequestInit): Promise<Response> => {
    let requestConfig: RequestInit = options || {};

    if (onRequest) {
      let { url: requestUrl, ...requestOptions } :any = await onRequest({
        url: url,
        ...requestConfig
      });

      url = requestUrl
      requestConfig = { ...requestOptions }
    }

    try {
      let response:any = await originalFetch(url, requestConfig);

      if (onResponse) {
        response = onResponse(response);
      }

      return response;
    } catch (error) {
      if (onError) {
        onError(error);
      }
      throw error;
    }
  };

  (window as any).fetch = fetchWithInterceptors;
};

export default setupFetchInstance

// Example usage:
// setupFetchInterceptors({
//   onRequest: (input, init) => {
//     // Your request interceptor logic
//     return init;
//   },
//   onResponse: (response) => {
//     // Your response interceptor logic
//     return response;
//   },
//   onError: (error) => {
//     // Your error callback logic
//     console.error('An error occurred:', error);
//   },
// });

// Use the fetch function as usual
// fetch('/endpoint1').then(response => console.log(response));
