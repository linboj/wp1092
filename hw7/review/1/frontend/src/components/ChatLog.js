// import { Modal, Form, Input } from 'antd';

const ChatLog = ({ name, msg, isSelf }) => {
    const msgStyle = { 
        background: '#E6E6E6', 
        padding: '5px',
        borderRadius: '5px',
        margin: '4px',
        color: 'gray'
    };

    return (
        isSelf ? ( // align right
            <div style={{ padding: '4px', display: 'flex', justifyContent: 'flex-end' }}>
                <span style={msgStyle}>{msg}</span>
                <span style={{ marginTop: '4px', paddingTop: '5px' }}>{name}</span>
            </div>
        ) : ( // align left
            <div style={{ padding: '4px', display: 'flex', justifyContent: 'flex-start' }}>
                <span style={{ marginTop: '4px', paddingTop: '5px' }}>{name}</span>
                <span style={msgStyle}>{msg}</span>
            </div>
        )
    );
};

export default ChatLog;