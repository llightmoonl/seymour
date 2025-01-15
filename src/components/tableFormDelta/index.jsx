import React from "react";
import Styles from "./tableForm.module.scss";

function tableFormDelta(props) {
    return (
        <div className={Styles.table}>
            <div className={Styles.table__title}>
                <div className={Styles.title}></div>
                {Array(3)
                    .fill(0)
                    .map((_, i) =>
                        Array(15)
                            .fill(0)
                            .map((_, j) => (
                                <div className={Styles.title}>
                                    <div className={Styles.text}>{props.listName}</div>
                                    <div className={Styles.number}>{`${i + 1},${j + 1}`}</div>
                                </div>
                            ))
                    )}
            </div>

            {props.list.map((element, elementIndex) => (
                <div key={elementIndex} className={Styles.rows}>
                    <div className={Styles.rows__title}>
                        {props.index} {elementIndex}
                    </div>
                    {element[props.listName].flat().map((value, valueIndex) => (
                        <div key={valueIndex} className={Styles.column}>
                            {value.toFixed(2)}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default tableFormDelta;
