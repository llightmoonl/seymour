import React from "react";
import Styles from "./tableFormObject.module.scss";

function tableFormObject(props) {
    return (
        <div className={Styles.table}>
            <div className={Styles.table__title}>
                <div className={Styles.title}></div>
                {Array(15)
                    .fill(0)
                    .map((_, index) => (
                        <div key={index} className={Styles.title}>
                            <div className={Styles.text}>{props.listName}</div>
                            <div className={Styles.number}>{index + 1}</div>
                        </div>
                    ))}
            </div>

            {props.list.map((element, elementIndex) => (
                <div key={elementIndex} className={Styles.rows}>
                    <div className={Styles.rows__title}>
                        {props.index} {elementIndex + 1}
                    </div>
                    {element.x.flat().map((value, valueIndex) => (
                        <div key={valueIndex} className={Styles.column}>
                            {value}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default tableFormObject;
