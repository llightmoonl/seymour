import React from "react";
import Styles from "./radioButton.module.scss";

function radioButton(props) {
    return (
        <>
            {props.list.map((item, index) => (
                <div key={index} className={Styles.radioButton}>
                    <label htmlFor={Styles.radioButton__elementId} className={Styles.radioButton__elementLabel}>
                        {item.title}
                    </label>
                    <input
                        name={props.name}
                        type="radio"
                        value={item.id}
                        checked={item.id === props.value}
                        onChange={(e) => props.setValue(e.target.value)}
                        id={Styles.radioButton__elementId}
                        className={Styles.radioButton__element}
                    />
                </div>
            ))}
        </>
    );
}

export default radioButton;
