// src/app/components/Controls.jsx
import React from "react";
import ctrlStyles from "../styles/Controls.module.css";

const Controls = ({ onReset }) => {
    return (
        <div className="controls">
            <button className={ctrlStyles["reset-button"]} onClick={onReset}>
                Reset
            </button>
        </div>
    );
};

export default Controls;
