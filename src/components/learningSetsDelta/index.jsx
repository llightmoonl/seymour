import React from "react";
import Styles from "./learningSets.module.scss";

function learningSetsDelta(props) {
    const activation = (x, w) => {
        let s = Array(3).fill(0);
        x = x.flat();
        x.push(1);
        s.map((_, i) => {
            w[i].map((_, j) => {
                s[i] += x[j] * w[i][j];
            });
        });

        return s;
    };

    const handleLearningElement = (x, d) => {
        let y = [];
        let s = activation(x, props.w);

        s.map((_, i) => {
            if (s[i] >= 0) {
                y.push(1);
            } else {
                y.push(0);
            }
        });

        if (y[0] === d[0] && y[0] === 1 && d[0] === 1) {
            props.setResult(`Буква A`);
        } else if (y[1] === d[1] && y[1] === 1 && d[1] === 1) {
            props.setResult(`Буква B`);
        } else if (y[2] === d[2] && y[2] === 1 && d[2] === 1) {
            props.setResult(`Буква C`);
        } else {
            props.setResult("Ошибка");
        }
    };

    return (
        <div className={props.className ? `${Styles.sets} ${props.className}` : Styles.sets}>
            {props.value.map((element, elementIndex) => (
                <table
                    onClick={() => {
                        handleLearningElement(element.x, element.number);
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

export default learningSetsDelta;
