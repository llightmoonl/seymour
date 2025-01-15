import React from "react";
import Styles from "./canvasInput.module.scss";

function canvasInput(props) {
    const handleSetCanvasInputValue = (i, j) => {
        const copyValue = [...props.value];
        copyValue[i][j] = copyValue[i][j] === 0 ? 1 : 0;
        props.setValue(copyValue);
    };

    return (
        <React.Fragment>
            <table className={props.className ? `${Styles.canvas} ${props.className}` : Styles.canvas}>
                <tbody>
                    {props.value.map((rows, rowsIndex) => (
                        <tr className={Styles.canvas__row} key={rowsIndex}>
                            {rows.map((columns, columnsIndex) => (
                                <td
                                    onClick={() => {
                                        props.active ? handleSetCanvasInputValue(rowsIndex, columnsIndex) : "";
                                    }}
                                    className={
                                        columns === 1
                                            ? `${Styles.canvas__column} ${Styles.column__active}`
                                            : Styles.canvas__column
                                    }
                                    key={columnsIndex}
                                ></td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </React.Fragment>
    );
}

export default canvasInput;
