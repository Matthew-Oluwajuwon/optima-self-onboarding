export class API<T> {
    responseCode: string = '';
    responseMessage: string = '';
    data: T | undefined
}