import ICardProps from "./ICardProps";

export default interface ITaskProps {
    selectedTask: ICardProps | null,
    tasks: ICardProps[]
}