import React, { useEffect } from 'react';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import { Space } from 'antd';

const UpdateTaskPage = () => {
  const tasks = useSelector((state: RootState) => state.taskReducer.tasks);
  
  useEffect(()=>{
    console.log(tasks)
  },[tasks])

  return (
    <div>
       <Space style={{padding:"1rem"}}>

      </Space>
    </div>
  )
}

export default UpdateTaskPage
