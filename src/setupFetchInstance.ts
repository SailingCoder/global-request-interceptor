// Configuration interface for fetch
interface FetchConfig {
  onRequest?: (input: RequestInfo, init?: RequestInit) => RequestInit;
  onResponse?: (response: Response) => Response;
  onError?: (error: any) => void;
}

const setupFetchInstance = (config: FetchConfig = {}): void => {
  const { onRequest, onResponse, onError } = config;

  const originalFetch = fetch;

  const fetchWithInterceptors = async (input: RequestInfo, init?: RequestInit): Promise<Response> => {
    let requestConfig: RequestInit = init || {};

    if (onRequest) {
      requestConfig = onRequest(input, requestConfig);
    }

    try {
      let response = await originalFetch(input, requestConfig);

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
