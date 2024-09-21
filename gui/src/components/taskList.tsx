import React, { useEffect, useState } from 'react';
import TaskCard from './card/taskCard';
import ICardProps from '../models/ICardProps';
import { Space } from 'antd';

const TaskList = () => {
  const [cards, setCards] = useState<ICardProps[]>();
  const [selectedCard, setSelectedCard] = useState<ICardProps>();

  const [newDescription, setNewDescription] = useState(''); // Kullanıcıdan gelen yeni açıklama


  useEffect(() => {
    const getCards = async () => {
      const cards = [
        {
          id: "abcd-abcd-abcd-abcd",
          title: "Card-1",
          description: "This is a new card",
          image: "",
          status: true,
          handleUpdateCard: function () { },
          handleDeleteCard: function () { }
        },
        {
          id: "bcad-bcad-bcad-bcad",
          title: "Card-2",
          description: "This is a new card",
          image: "",
          status: true,
          handleUpdateCard: function () { },
          handleDeleteCard: function () { }
        },
      ]
      setCards(cards);
    }

    getCards();
  }, []);

  return (
    <>
      <Space style={{padding:"1rem"}}>
      {cards?.map((card: ICardProps, index: number)=>(
        <TaskCard title={card.title} description={card.description} status={card.status} image={card.image} key={index}/>
      ))}
      </Space>
    </>
  )
}

export default TaskList