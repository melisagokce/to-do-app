import React, { useEffect, useState } from 'react';
import TaskCard from './card/taskCard';
import ICardProps from '../models/ICardProps';
import { Space } from 'antd';
import TaskManager from '../managers/TaskManager';

const TaskList = () => {
  const [cards, setCards] = useState<ICardProps[]>();
  // const [selectedCard, setSelectedCard] = useState<ICardProps>();

  // const [newDescription, setNewDescription] = useState(''); // Kullanıcıdan gelen yeni açıklama


  useEffect(() => {
    const getCards = async () => {
      const cards = await TaskManager.getAllTask();
      console.log(cards)
      setCards(cards.data);
    }

    getCards();
  }, []);

  return (
    <>
      <Space style={{padding:"1rem"}}>
      {cards?.map((card: ICardProps, index: number)=>(
        <TaskCard id={card.id} title={card.title} description={card.description} status={card.checkStatus} key={index}/>
      ))}
      </Space>
    </>
  )
}

export default TaskList