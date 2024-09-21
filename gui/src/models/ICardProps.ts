export default interface ICardProps {
    id: string;
    title: string;
    description: string;
    image: string;
    status: boolean;
    handleUpdateCard: () => void;
    handleDeleteCard: () => void;
}