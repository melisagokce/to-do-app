export default interface IRequestProps {
    url: string,
    method: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any,
    headers?: any
}