export default interface IActionProps<T = any> {
    type: string;
    payload: T;
}