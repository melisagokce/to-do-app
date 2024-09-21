import React from 'react'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Avatar, Card, Space } from 'antd';
import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';
import {makeStyles} from '@mui/styles'
const { Meta } = Card;

const useStyles = makeStyles({
    statusCheckbox:{
        position:"absolute",
        right:"1px",
        top:"1px"
    }
})
const taskCard = ({title,description,status}:{title:string; description:string; status: boolean; image:string}) => {
    const styles = useStyles();
    const onChange: CheckboxProps['onChange'] = (e) => {
        console.log(`checked = ${e.target.checked}`);
      };

    return (
    <Card
    style={{ width: 300}}
    cover={
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        style={{userSelect:"none"}}
      />
    }
    actions={[
      <EditOutlined key="edit" />,
      <DeleteOutlined key="delete" />,
    //   <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <Card style={{position:"relative", width:"100%"}}>
    <Meta
      avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
      title={title}
      description={description}
    />
    <Checkbox checked={status} onChange={onChange} className={styles.statusCheckbox}/>
    </Card>
  </Card>
  )
}

export default taskCard
