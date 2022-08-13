import PhotoToName from "../components/photoToName";
import NameToPhoto from "../components/nameToPhoto";
import TextQuestion from "../components/textQuestion";
import EndOfQuiz from "../components/endOfQuiz";

import axios from 'axios';
import { useState, useEffect } from "react";

const getLearnedMineralsURL = (activeLearner) => {
    const activeLearnerID = activeLearner.id;
    return process.env.REACT_APP_BACKEND_URL
    + "/learners"
    + "/" + activeLearnerID
    + "/learnedMinerals";
};

const getLearnedMinerals = (activeLearner) => {
    return axios.get(getLearnedMineralsURL(activeLearner)).then((response) => {
        return response.data;
    }).catch((err) => {
        console.log(err);
    });
};

const Quiz = ({activeLearner}) => {

    const [learnedMinerals, setLearnedMinerals] = useState(null);
    const [questionIndex, setQuestionIndex] = useState(null);
    const [score, setScore] = useState(0);

    useEffect(() => {
        if (learnedMinerals === null && activeLearner !== null) {
            getLearnedMinerals(activeLearner).then((learnedMinerals) => {
                setLearnedMinerals(learnedMinerals);
            });
        };
    }, [learnedMinerals, activeLearner]);

    useEffect(() => {
        if (learnedMinerals !== null && questionIndex === null) {
            setQuestionIndex(0);
        } 
    }, [learnedMinerals, questionIndex]);

    if (learnedMinerals === null || questionIndex === null) {
        return <div><p>{activeLearner === null ? "Please log in" : "Loading quiz..."}</p></div>
    }

    if ((new Set(learnedMinerals.map((mineral) => mineral.formula))).size < 4 ||
        (new Set(learnedMinerals.map((mineral) => mineral.hardness))).size < 4) {
        return <div><p>Please learn more minerals before attempting the quiz</p></div>
    }

    const markCorrect = () => {
        setScore(score + 1);
    };

    const quizComponents = [
        <TextQuestion activeLearner={activeLearner}
        learnedMinerals={learnedMinerals}
        answerKey="name"
        promptKey="formula"
        question="What mineral does this chemical formula describe?"
        markCorrect={markCorrect}
        >                        
        </TextQuestion>, 
        <TextQuestion activeLearner={activeLearner}
        learnedMinerals={learnedMinerals}
        answerKey="formula"
        promptKey="name"
        question="What is the chemical formula for this mineral?"
        markCorrect={markCorrect}
        >                        
        </TextQuestion>,
        <TextQuestion activeLearner={activeLearner}
        learnedMinerals={learnedMinerals}
        answerKey="specificGravity"
        promptKey="name"
        question="What is the specific gravity for this mineral?"
        markCorrect={markCorrect}
        >                        
        </TextQuestion>, 
        <PhotoToName activeLearner={activeLearner} learnedMinerals={learnedMinerals} markCorrect={markCorrect}></PhotoToName>,
        <NameToPhoto activeLearner={activeLearner} learnedMinerals={learnedMinerals} markCorrect={markCorrect}></NameToPhoto>,
        <EndOfQuiz quizScore={score}></EndOfQuiz>
    ];
    
    const makeButton = (questionIndex) => {
        if (questionIndex === quizComponents.length -1) {
            return (
                <button type="button" onClick={() => {
                    setScore(0);
                    setQuestionIndex(0);
                }}>
                Give me a different quiz
                </button>
            )
        } else {
            return (
                <button type="button" onClick={() => setQuestionIndex(questionIndex+1)}>
                {questionIndex < (quizComponents.length - 2)  ? "Next question" : "Score my quiz"}    
                </button>
            )
        }
    };

    return (
    <div className="quizQuestions">
        <h1>Quiz</h1>
        {quizComponents[questionIndex]}
        {makeButton(questionIndex)}
    </div>
    );
};

export default Quiz;