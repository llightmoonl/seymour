import {create} from zustand;
import lodash from "lodash";

export const hebbaStore = create((set) => ({
    x: Array.from({ length: 5 }, () => Array.from({ length: 3 }, () => 0)),
    w: Array.from({ length: 5 }, () => Array.from({ length: 3 }, () => lodash.random(1, 3))),
    stepState: Array.from({ length: 15 }, () => 0),
    neuron: lodash.random(1, 3),
    y: 0,
    s: 0,
    numberParity: 0,
    step: 0,
    isPlay: false,
    addCheckHebba: false, 
    isLearningOver: false,
    learningSets: [],
    result: "",
    saveArray: (arr) => {
        const newArr = [...arr];
        set({newArr})
    }
}))