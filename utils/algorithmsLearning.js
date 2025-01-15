import lodash from 'lodash';

export const neuron = lodash.random(0, 1, true);

export const activation = (x, w) => {
    let s = 0;

    x.flat().map((_, i) => {
        s += x[i] * w[i];
    })

    return s;
}

export const algorithmHebba = (x, y, w) => {
    x.flat().map((_, i) => {
        if (y === 0) {
            w[i] += x[i];
        }
        else {
            w[i] -= x[i];
        }
    })
    
    return w;
}

export const checkParityNumber = (x, w, number) => {
    let s = activation(x, w)
    const y = s >= neuron ? 1 : 0;
    return y === number ? w : algorithmHebba(x, y, w);
}
