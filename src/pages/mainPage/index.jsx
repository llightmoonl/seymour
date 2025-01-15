import React from "react";
import Styles from "./mainPage.module.scss";

import Banner from "../../components/banner";
import CardPossibillities from "../../components/cardPossibillities";
import CardBlock from "../../components/cardBlock";
import Footer from "../../components/footer";

function mainPage() {
    const cardPossibillitiesList = [
        {
            title: "Быстрый старт",
            pretitle: "Вы можете перейти сразу к изучению теории и практики, которые связаны с нейронными сетями",
            icon: "/quickstart.png",
        },
        {
            title: "Искусственные нейронные сети",
            pretitle: "Вы сможете изучить принципы использование нейросетей при решении задачи распознавания образов",
            icon: "/neuron.png",
        },
        {
            title: "Отслеживание прогресса",
            pretitle: "Вы можете посмотреть прогресс выполненных заданий в своем профиле",
            icon: "/progress.png",
        },
    ];

    const docsList = [
        {
            title: "Быстрый старт",
            pretitle: "Узнайте принципы построения искусственных нейронных сетей",
            image: "/docsCard1.png",
            link: "/docs/start",
        },
        {
            title: "Правило Хебба",
            pretitle: "Начните свой путь с алгоритма обучения нейросети по правилу Хебба",
            image: "/docsCard2.png",
            link: "/docs/hebba",
        },
        {
            title: "Дельта-правило",
            pretitle: "Продолжите изучение алгоритмов обучения нейросети ",
            image: "/docsCard3.png",
            link: "/docs/delta",
        },
    ];

    const practiceList = [
        {
            title: "Правило Хебба",
            pretitle: "Обучите нейросеть классифицировать цифры на четные и нечетные",
            image: "/practiceCard1.png",
            link: "/practice/hebba",
        },
        {
            title: "Дельта-правило",
            pretitle: "Обучите следующую нейронную сеть распознавать буквы латинского алфавита",
            image: "/practiceCard2.png",
            link: "/practice/delta",
        },
    ];
    return (
        <div className={Styles.main}>
            <Banner
                image="/banner.png"
                title="Seymour"
                pretitle="Сделай шаг в мир искусственного интеллекта"
                onClick="/docs/start"
            />
            <div className={Styles.container}>
                <div className={Styles.main__content}>
                    <div className={Styles.possibilities}>
                        <h1 className={Styles.possibilities__title}>Возможности Seymour</h1>
                        <div className={Styles.possibilities__content}>
                            {cardPossibillitiesList.map((card, index) => (
                                <CardPossibillities
                                    key={index}
                                    icon={card.icon}
                                    title={card.title}
                                    pretitle={card.pretitle}
                                />
                            ))}
                        </div>
                    </div>
                    <div className={Styles.docs}>
                        <div className={Styles.docs__top}>
                            <h1 className={Styles.docs__title}>Документация</h1>
                            <div className={Styles.docs__navigation}></div>
                        </div>
                        <div className={Styles.docs__content}>
                            {docsList.map((card, index) => (
                                <CardBlock
                                    key={index}
                                    image={card.image}
                                    title={card.title}
                                    pretitle={card.pretitle}
                                    link={card.link}
                                />
                            ))}
                        </div>
                    </div>
                    <div className={Styles.practice}>
                        <div className={Styles.practice__top}>
                            <h1 className={Styles.practice__title}>Практика</h1>
                            <div className={Styles.practice__navigation}></div>
                        </div>
                        <div className={Styles.practice__content}>
                            {practiceList.map((card, index) => (
                                <CardBlock
                                    key={index}
                                    image={card.image}
                                    title={card.title}
                                    pretitle={card.pretitle}
                                    link={card.link}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer className={Styles.footer} author="Light Moon" />
        </div>
    );
}

export default mainPage;
