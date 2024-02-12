class BaseService {
    private baseUrl: string;

    constructor(baseUrl: string = '') {
        this.baseUrl = baseUrl;
    }

    protected async get<T>(url: string): Promise<T> {
        const response = await fetch(this.baseUrl.concat(url), {
            method: 'GET',
        });
        const responseBody = response.json() as T;
        return responseBody;
    }

    protected async post<T, K>(url: string, requestBody: K): Promise<T> {
        const response = await fetch(this.baseUrl.concat(url), {
            method: 'GET',
            body: JSON.stringify(requestBody),
        });
        const responseBody = response.json() as T;
        return responseBody;
    }
}

export default BaseService;
