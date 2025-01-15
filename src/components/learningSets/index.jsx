import React from "react";
import Styles from "./learningSets.module.scss";

function learningSets(props) {
    const activation = (x, w) => {
        let s = 0;

        x.map((_, i) => {
            x[i].map((_, j) => {
                s += x[i][j] * w[i][j];
            });
        });

        return s;
    };

    const handleLearningElement = (x) => {
        props.setResult(activation(x, props.w) >= props.neuron ? "Число четное" : "Число нечетное");
    };

    return (
        <div className={props.className ? `${Styles.sets} ${props.className}` : Styles.sets}>
            {props.value.map((element, elementIndex) => (
                <table
                    onClick={() => {
                        handleLearningElement(element.x);
                    }}
                    key={elementIndex}
                    className={
                        props.isLearningOver
                            ? `${Styles.sets__element} ${Styles.sets__element__active}`
                            : Styles.sets__element
                    }
                >
                    <tbody>
                        {element.x.map((rows, rowsIndex) => (
                            <tr className={Styles.sets__row} key={rowsIndex}>
                                {rows.map((columns, columnsIndex) => (
                                    <td
                                        className={
                                            columns === 1
                                                ? `${Styles.sets__column} ${Styles.sets__active}`
                                                : Styles.sets__column
                                        }
                                        key={columnsIndex}
                                    ></td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ))}
        </div>
    );
}

export default learningSets;
