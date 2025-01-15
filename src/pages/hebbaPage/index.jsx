import React from "react";
import lodash from "lodash";

import CanvasInput from "../../components/canvasInput";
import Button from "../../components/ui/Button";
import TableForm from "../../components/tableForm";
import TableFormObject from "../../components/tableFormObject";
import LearningSets from "../../components/learningSets";
import InformationBlock from "../../components/informationBlock";

import { Play } from "lucide-react";
import Styles from "./hebbaPage.module.scss";

function hebba() {
    const [x, setX] = React.useState(Array.from({ length: 5 }, () => Array.from({ length: 3 }, () => 0)));
    const [w, setW] = React.useState(
        Array.from({ length: 5 }, () => Array.from({ length: 3 }, () => lodash.random(1, 3)))
    );
    const [neuron, setNeuron] = React.useState(lodash.random(1, 3));
    const [y, setY] = React.useState(0);
    const [s, setS] = React.useState(0);
    const [numberParity, setNumberParity] = React.useState(0);

    const [isPlay, setIsPlay] = React.useState(false);
    const [step, setStep] = React.useState(0);
    const [stepState, setStepState] = React.useState(Array.from({ length: 15 }, () => 0));

    const [addCheckHebba, setAddCheckHebba] = React.useState(false);
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
        let s = 0;
        x.map((_, i) => {
            x[i].map((_, j) => {
                s += x[i][j] * w[i][j];
            });
        });

        return s;
    };

    const algorithmHebba = (x, y, w) => {
        x.map((_, i) => {
            x[i].map((_, j) => {
                if (y === 0) {
                    w[i][j] += x[i][j];
                } else {
                    w[i][j] -= x[i][j];
                }
            });
        });

        return w;
    };

    const checkParityNumber = (x, w, number) => {
        let s = activation(x, w);
        let y = s >= neuron ? 1 : 0;

        setS(s);
        setY(y);
        setStepState(x.flat());

        if (y !== number) {
            w = algorithmHebba(x, y, w);
            s = activation(x, w);
            y = s >= neuron ? 1 : 0;
            setS(s);
            setY(y);
            setIsPlay(true);
            setAddCheckHebba(true);
        } else {
            setFrameSetsSamples(updateSets(frameSetsSamples, { w: saveArray(w) }));
            clearX();
            setIsPlay(false);
        }

        setNumberParity(number);
        setStep(0);
        return w;
    };

    const handlePlayButtonNumber = (x, w, number, learningSets) => {
        setFrameSetsSamples(updateSets(frameSetsSamples, { w: saveArray(w) }));
        let s = activation(x, w);
        let y = s >= neuron ? 1 : 0;
        setS(s);
        setY(y);

        if (y !== number) {
            w = algorithmHebba(x, y, w);
            s = activation(x, w);
            y = s >= neuron ? 1 : 0;

            setS(s);
            setY(y);
            setW(w);

            setAddCheckHebba(true);
        } else {
            if (learningSets.length > 1 && learningSets.length !== step && addCheckHebba) {
                let checkHebba = false;
                let sLearning = activation(learningSets[step].x, w);
                let yLearning = sLearning >= neuron ? 1 : 0;

                setStepState(learningSets[step].x.flat());

                if (yLearning !== learningSets[step].number) {
                    w = algorithmHebba(learningSets[step].x, yLearning, w);
                    checkHebba = true;
                } else {
                    checkHebba = false;
                }

                setS(sLearning);
                setY(yLearning);
                setW(w);
                setStep(step + 1);

                if (checkHebba) {
                    setStep(0);
                    checkHebba = false;
                }
            } else {
                setIsPlay(false);
                clearX();
            }
        }
    };

    const handleCheckParityNumber = (number, w) => {
        if (x.flat().filter((item) => item === 0).length !== 15) {
            setLearningSets(updateSets(learningSets, { x: saveArray(x), number }));
            w = checkParityNumber(x, w, number);
            setW(w);
        }
    };

    const handleResognition = (x, w) => {
        if (x.flat().filter((item) => item === 0).length !== 15) {
            setResult(activation(x, w) >= neuron ? "Число четное" : "Число нечетное");
            clearX();
        }
    };

    return (
        <div className={Styles.hebba}>
            <div className={Styles.container}>
                <h1 className={Styles.hebba__title}>Правило Хебба</h1>
                <div className={Styles.hebba__top}>
                    <div className={Styles.hebba__element}>
                        <CanvasInput active={!isPlay} className={Styles.hebba__canvas} value={x} setValue={setX} />
                        {isLearningOver && (
                            <Button
                                className={Styles.hebba__buttonRecognition}
                                onClick={() => handleResognition(x, w)}
                                title="Распознать"
                            />
                        )}
                    </div>
                    <div className={Styles.hebba__element}>
                        <div className={Styles.hebba__table}>
                            <TableForm list={frameSetsSamples} index="Шаг" listName="w" />
                        </div>
                    </div>
                    <div className={Styles.hebba__element}>
                        <div className={Styles.hebba__table}>
                            <TableFormObject list={learningSets} index="" listName="x" />
                        </div>
                    </div>
                    <div className={`${Styles.hebba__element} ${Styles.hebba__elementColumn}`}>
                        <div className={Styles.hebba__information}>
                            <InformationBlock
                                tooltipText="Генерируется<br>случайным образом"
                                title="Порог чувствительности нейрона (θ):"
                                variable="θ"
                                value={neuron}
                                isTooltip={true}
                                isValue={true}
                                isVariable={true}
                            />
                            <InformationBlock
                                tooltipText="$S = 
                            \sum\limits_{j=1}^N w_jx_j$"
                                title="Взвешенное суммирование входных сигналов:"
                                variable="S"
                                value={s}
                                isTooltip={true}
                                isValue={true}
                                isVariable={true}
                            />
                            <InformationBlock
                                tooltipText="Входной сигнал"
                                variable="x"
                                value={`{${stepState.join(", ")}}`}
                                isTooltip={false}
                                isValue={true}
                                isVariable={true}
                            />
                            <InformationBlock
                                tooltipText="Условие:<br><br>если S ≥ Θ, то y = 1
                            если S < Θ, то y = 0"
                                title="Выходной сигнал:"
                                variable="y"
                                value={y}
                                isTooltip={true}
                                isValue={true}
                                isVariable={true}
                            />
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
                            <div className={Styles.hebba__end}>
                                {learningSets.length >= 10 && !isLearningOver && !isPlay ? (
                                    <Button
                                        onClick={() => {
                                            setIsLearningOver(true);
                                        }}
                                        className={Styles.hebba__buttonEnd}
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
                    <div className={Styles.hebba__controllers}>
                        <div className={Styles.hebba__parity}>
                            <Button
                                variant="secondary"
                                className={Styles.hebba__buttonParity}
                                onClick={() => {
                                    handleCheckParityNumber(1, w);
                                }}
                                disabled={isPlay}
                            >
                                Четное
                            </Button>
                            <Button
                                variant="secondary"
                                className={Styles.hebba__buttonParity}
                                onClick={() => {
                                    handleCheckParityNumber(0, w);
                                }}
                                disabled={isPlay}
                            >
                                Нечетное
                            </Button>
                        </div>

                        <div className={Styles.hebba__buttonPlay}>
                            <Button
                                className={Styles.button__play}
                                size="icon"
                                disabled={!isPlay}
                                onClick={() => handlePlayButtonNumber(x, w, numberParity, learningSets)}
                            >
                                <Play />
                            </Button>
                        </div>
                    </div>
                )}

                <div className={Styles.hebba__bottom}>
                    {
                        <LearningSets
                            value={learningSets}
                            setResult={setResult}
                            w={w}
                            neuron={neuron}
                            isLearningOver={isLearningOver}
                        />
                    }
                </div>
            </div>
        </div>
    );
}

export default hebba;
