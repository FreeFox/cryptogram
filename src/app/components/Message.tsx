// components/Message.js
import React from "react";

type MessageProps = {
    errors: number;
    gameOver: boolean;
};

const Message: React.FC<MessageProps> = ({ errors, gameOver }) => {
    return (
        <div className="message">
            {gameOver ? (
                <div>{errors >= 3 ? "Game Over" : "You Win!"}</div>
            ) : (
                <div>Errors: {errors}</div>
            )}
        </div>
    );
};

export default Message;
