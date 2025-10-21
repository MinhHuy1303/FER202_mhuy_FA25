//LightSwitch component using useReducer to toggle light on and off
import React, { useReducer } from 'react';
import Button from 'react-bootstrap/Button';

// Định nghĩa action types
const TOGGLE_LIGHT = 'TOGGLE_LIGHT';

// Reducer function để quản lý state của đèn
const lightReducer = (state, action) => {
    switch (action.type) {
        case TOGGLE_LIGHT:
            return { ...state, isLightOn: !state.isLightOn };
        default:
            return state;
    }
};

// Initial state
const initialState = {
    isLightOn: false // Đèn tắt ban đầu
};

function LightSwitch() {
    // Sử dụng useReducer thay vì useState
    const [state, dispatch] = useReducer(lightReducer, initialState);
    
    // Hàm để chuyển đổi trạng thái đèn bằng cách dispatch action
    const toggleLight = () => {
        dispatch({ type: TOGGLE_LIGHT });
    };
    // Style chung cho các button
    const buttonStyle = {  
        margin: '5px',
        padding: '10px 20px',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '16px'
    };
    return (
        <div style={{ padding: '20px', border: '1px solid #ccc' }}>     
            <h2>Công Tắc Đèn</h2>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
                Đèn hiện đang: {state.isLightOn ? 'Bật' : 'Tắt'}  
            </p>
            <Button
                onClick={toggleLight}   
                style={{ 
                    ...buttonStyle,
                    background: state.isLightOn ? 'red' : 'green',
                    color: 'white'
                }}  
            >
                {state.isLightOn ? 'Tắt Đèn' : 'Bật Đèn'}  
            </Button>   
        </div>
    );
}
export default LightSwitch;
