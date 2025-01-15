import React from 'react';
import Styles from './selectInput.module.scss';

function selectInput(props) {
    const [select, setSelect] = React.useState(false);
    const selectRef = React.useRef();

    window.addEventListener("click", () => {
        document.activeElement === selectRef.current ? setSelect(true) : setSelect(false)
    })

    return (
        <div className={Styles.selectInput}>
            <input ref={selectRef} value={props.value} onChange={(event) => props.setValue(event.target.value)} type={props.type} placeholder=' ' />
            <div className={props.error ? `${Styles.title} ${Styles.title__error}` : `${Styles.title}`}>{props.title}</div>
            {
                props.error ? (
                    <div className={Styles.error}>{props.error}</div>
                ) : ""
            }
            <svg className={Styles.selectInput__arrow} id="Layer_1" viewBox="0 0 512 512"><polygon points="396.6,160 416,180.7 256,352 96,180.7 115.3,160 256,310.5 "/></svg>
            {
                select ? (
                    <ul className={Styles.select}>
                        {
                            props.data.map((value, id) => (
                                <li onClick={() => props.setValue(value)} className={Styles.select__element} key={id}>{value}</li>
                            ))
                        }
                    </ul>
                ) : ""
            }
        </div>
    )
}

export default selectInput;