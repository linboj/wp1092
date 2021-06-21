import { Typography, Space } from 'antd';

const { Text } = Typography;
const Message = ({ me, sender, body }) => {
    let align = ""
    if (sender === me) { align = "right" }
    else { align = "left" }

    return (

        <div style={align === "right" ? { float: 'right' } : { float: 'left' }}>
            <Space align="center">
                <Text >{sender} </Text>
                <Text keyboard> {body}</Text>
            </Space>
        </div>
    )
}
export default Message