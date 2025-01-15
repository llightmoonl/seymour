import React from "react";
import lodash from "lodash";

import CanvasInput from "../../components/canvasInput";
import Button from "../../components/ui/Button";
import TableFormDelta from "../../components/tableFormDelta";
import TableFormObject from "../../components/tableFormObject";
import LearningSetsDelta from "../../components/learningSetsDelta";
import InformationBlock from "../../components/informationBlock";
import PlayButton from "../../components/playButton";

import Styles from "./deltaPage.module.scss";

function delta() {
    const [x, setX] = React.useState(Array.from({ length: 5 }, () => Array.from({ length: 3 }, () => 0)));
    const [w, setW] = React.useState(
        Array.from({ length: 3 }, () => Array.from({ length: 15 }, () => lodash.random(1, 3)))
    );
    const [n, setN] = React.useState(lodash.random(0.05, 1), true);
    const [y, setY] = React.useState([0, 0, 0]);
    const [s, setS] = React.useState([0, 0, 0]);
    const [numberLetter, setNumberLetter] = React.useState([]);
    const [epsilon, setEpsilon] = React.useState(Array.from({ length: 3 }, () => 0));
    const [d, setD] = React.useState([
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
    ]);

    const [isPlay, setIsPlay] = React.useState(false);
    const [step, setStep] = React.useState(0);
    const [stepState, setStepState] = React.useState(Array.from({ length: 15 }, () => 0));

    const [addCheckDelta, setAddCheckDelta] = React.useState(false);
    const [learningSets, setLearningSets] = React.useState([]);

    const [isLearningOver, setIsLearningOver] = React.useState(false);
    const [result, setResult] = React.useState("");

    const saveArray = (x) => {
        let x_value = [];

        x.map((_, i) => {
            x_value.push([]);
            x[i].map((_, j) => {
                x_value[i].push(x[i][j]);
            });
        });

        return x_value;
    };

    const [frameSetsSamples, setFrameSetsSamples] = React.useState([{ w: saveArray(w) }]);

    const clearX = () => {
        setX(Array.from({ length: 5 }, () => Array.from({ length: 3 }, () => 0)));
    };

    const updateSets = (sets, saveData) => {
        const copySets = sets;
        copySets.push(saveData);

        return copySets;
    };

    const activation = (x, w) => {
        const s = Array.from({ length: 3 }, () => 0);
        x = x.flat();
        x.push(1);

        s.map((_, i) => {
            w[i].map((_, j) => {
                s[i] += x[j] * w[i][j];
            });
        });

        return s;
    };

    const singleActivation = (x, w) => {
        let s = 0;
        x = x.flat();
        x.push(1);

        w.map((_, i) => {
            s += x[i] * w[i];
        });

        return s;
    };

    const algorithmDelta = (x, epsilon, w) => {
        const newW = w.slice();
        x = x.flat();
        x.push(1);

        newW.map((_, i) => {
            if (i === 15) {
                (newW[i] += n * epsilon), 2;
            } else {
                (newW[i] += n * epsilon * x[i]), 2;
            }
        });

        return newW;
    };

    const identifyTheLetter = (x, w, number) => {
        let s = activation(x, w);
        let y = [];
        let epsilon = Array(3).fill(0);
        let count = 0;
        setStepState(x.flat());

        s.map((_, i) => {
            if (s[i] >= 0) {
                y.push(1);
            } else {
                y.push(0);
            }
        });

        epsilon.map((_, i) => {
            epsilon[i] = number[i] - y[i];
            if (epsilon[i] !== 0) {
                count++;
                w[i] = algorithmDelta(x, epsilon[i], w[i]);
                s[i] = singleActivation(x, w[i]);
                y[i] = s[i] >= 0 ? 1 : 0;
                epsilon[i] = number[i] - y[i];
                setIsPlay(true);
                setAddCheckDelta(true);
            }
        });
        if (count === 0) {
            setFrameSetsSamples(updateSets(frameSetsSamples, { w: saveArray(w) }));
            setIsPlay(false);
        }
        setS(s);
        setY(y);
        setNumberLetter(number);
        setEpsilon(epsilon);
        setStep(0);
        return w;
    };

    const handlePlayButtonNumber = (x, w, number, learningSets) => {
        setFrameSetsSamples(updateSets(frameSetsSamples, { w: saveArray(w) }));
        let s = activation(x, w);
        let y = [];
        let epsilon = Array(3).fill(0);
        let isCountEpsilon = 0;
        let i = 0;
        let count = 0;

        s.map((_, i) => {
            if (s[i] >= 0) {
                y.push(1);
            } else {
                y.push(0);
            }
        });

        while (i !== epsilon.length) {
            epsilon[i] = number[i] - y[i];

            if (epsilon[i] !== 0) {
                w[i] = algorithmDelta(x, epsilon[i], w[i]);
                s[i] = singleActivation(x, w[i]);
                y[i] = s[i] >= 0 ? 1 : 0;
                epsilon[i] = number[i] - y[i];
                setAddCheckDelta(true);
                setEpsilon(epsilon);
            } else {
                isCountEpsilon++;
                i++;
            }
        }

        if (learningSets.length > 1 && learningSets.length !== step && addCheckDelta && isCountEpsilon === 3) {
            i = 0;

            while (i !== epsilon.length) {
                s[i] = singleActivation(learningSets[step].x, w[i]);
                y[i] = s[i] >= 0 ? 1 : 0;
                epsilon[i] = learningSets[step].number[i] - y[i];
                setStepState(learningSets[step].x.flat());

                if (epsilon[i] !== 0) {
                    w[i] = algorithmDelta(learningSets[step].x, epsilon[i], w[i]);
                    setStep(0);
                    count++;
                } else {
                    i++;
                }
            }
            setStep(step + 1);
            setY(y);

            if (learningSets.length - 1 === step && count === 0) {
                setIsPlay(false);
                clearX();
            }
        }

        if (learningSets.length === 1) {
            setIsPlay(false);
            clearX();
        }

        setS(s);
        setY(y);
        setW(w);
    };

    const handleIdentifyTheLetter = (number, w) => {
        if (x.flat().filter((item) => item === 0).length !== 15) {
            setLearningSets(updateSets(learningSets, { x: saveArray(x), number }));
            w = identifyTheLetter(x, w, number);
            setW(w);
        }
    };

    const handleResognition = (x, w) => {
        if (x.flat().filter((item) => item === 0).length !== 15) {
            let y = [];
            let s = activation(x, w);

            s.map((_, i) => {
                if (s[i] >= 0) {
                    y.push(1);
                } else {
                    y.push(0);
                }
            });

            if (y[0] === d[0][0] && y[0] === 1 && d[0][0] === 1) {
                setResult("Буква A");
            } else if (y[1] === d[1][1] && y[1] === 1 && d[1][1] === 1) {
                setResult("Буква B");
            } else if (y[2] === d[2][2] && y[2] === 1 && d[2][2] === 1) {
                setResult("Буква C");
            } else {
                setResult("Ошибка");
            }
            clearX();
        } else {
            setResult("Нарисуйте любую букву");
        }
    };

    const roundArrayPrint = (arr) => {
        arr = arr.map((value, _) => value.toFixed(2));
        return arr.join(", ");
    };

    return (
        <div className={Styles.delta}>
            <div className={Styles.container}>
                <h1 className={Styles.delta__title}>Дельта-правило</h1>
                <div className={Styles.delta__top}>
                    <div className={Styles.delta__element}>
                        <CanvasInput active={!isPlay} className={Styles.delta__canvas} value={x} setValue={setX} />
                        {isLearningOver && (
                            <Button
                                className={Styles.delta__buttonRecognition}
                                onClick={() => handleResognition(x, w)}
                                title="Распознать"
                            />
                        )}
                    </div>
                    <div className={Styles.delta__element}>
                        <div className={Styles.delta__table}>
                            <TableFormDelta list={frameSetsSamples} index="Шаг" listName="w" />
                        </div>
                    </div>
                    <div className={Styles.delta__element}>
                        <div className={Styles.delta__table}>
                            <TableFormObject list={learningSets} index="" listName="x" />
                        </div>
                    </div>
                    <div className={`${Styles.delta__element} ${Styles.delta__elementColumn}`}>
                        <div className={Styles.delta__information}>
                            <InformationBlock
                                addInfo="Генерируется<br>случайным образом<br>в пределах от 0,05 до 1"
                                title="Скорость обучения (η):"
                                variable="η"
                                value={n.toFixed(2)}
                                isAddInfo={true}
                                isValue={true}
                                isVariable={true}
                            />
                            <InformationBlock
                                addInfo="$S_i = 
                            \sum\limits_{j=1}^N w_{ij}x_j$"
                                title="Взвешенное суммирование входных сигналов:"
                                variable="S"
                                value={`{${roundArrayPrint(s)}}`}
                                isAddInfo={true}
                                isValue={true}
                                isVariable={true}
                            />
                            <InformationBlock
                                title="Входной сигнал"
                                variable="x"
                                value={`{${stepState.join(", ")}}`}
                                isAddInfo={false}
                                isValue={true}
                                isVariable={true}
                            />
                            <InformationBlock
                                addInfo="Условие:<br><br>если $S_i ≥ 0,$ то $y_i = 1$
                            если $S_i < 0,$ то $y_i = 0$"
                                title="Выходной сигнал:"
                                variable="y"
                                value={`{${y.join(", ")}}`}
                                isAddInfo={true}
                                isValue={true}
                                isVariable={true}
                            />
                            {!isLearningOver ? (
                                <InformationBlock
                                    addInfo="$ε_i = d_i-y_i$"
                                    title="Ошибка:"
                                    variable="ε"
                                    value={`{${epsilon.join(", ")}}`}
                                    isAddInfo={true}
                                    isValue={true}
                                    isVariable={true}
                                />
                            ) : (
                                ""
                            )}

                            {isLearningOver ? (
                                <InformationBlock
                                    title="Результат:"
                                    value={result}
                                    isAddInfo={false}
                                    isValue={true}
                                    isVariable={false}
                                />
                            ) : (
                                ""
                            )}
                            <div className={Styles.delta__end}>
                                {learningSets.length >= 3 && !isLearningOver && !isPlay ? (
                                    <Button
                                        onClick={() => {
                                            setIsLearningOver(true);
                                        }}
                                        className={Styles.delta__buttonEnd}
                                        title="Завершить обучение"
                                    />
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {!isLearningOver && (
                    <div className={Styles.delta__controllers}>
                        <div className={Styles.delta__letters}>
                            <Button
                                className={Styles.delta__buttonParity}
                                onClick={() => {
                                    handleIdentifyTheLetter(d[0], w);
                                }}
                                title="A"
                                disabled={isPlay}
                            />
                            <Button
                                className={Styles.delta__buttonParity}
                                onClick={() => {
                                    handleIdentifyTheLetter(d[1], w);
                                }}
                                title="B"
                                disabled={isPlay}
                            />
                            <Button
                                className={Styles.delta__buttonParity}
                                onClick={() => {
                                    handleIdentifyTheLetter(d[2], w);
                                }}
                                title="С"
                                disabled={isPlay}
                            />
                        </div>
                        <div className={Styles.delta__buttonPlay}>
                            <PlayButton
                                disabled={!isPlay}
                                onClick={() => {
                                    handlePlayButtonNumber(x, w, numberLetter, learningSets);
                                }}
                            />
                        </div>
                    </div>
                )}
                <div className={Styles.delta__bottom}>
                    {<LearningSetsDelta value={learningSets} setResult={setResult} w={w} neuron={n} />}
                </div>
            </div>
        </div>
    );
}

export default delta;
