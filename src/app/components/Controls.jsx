// src/app/components/Controls.jsx
import React from "react";

const Controls = ({ onReset }) => {
    return (
        <button className="reset-button" onClick={onReset}>
            Reset
        </button>
    );
};

export default Controls;
