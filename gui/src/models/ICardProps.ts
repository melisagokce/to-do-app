export default interface ICardProps {
    taskId: string;
    title: string;
    description: string;
    images: any,
    imageFile?: any;
    checkStatus: boolean;
    createdAt: string;
    updatedAt: string;
}