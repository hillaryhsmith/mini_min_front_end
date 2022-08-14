import { useState, useEffect } from "react";
import { removeRandomListElement, evaluateResponse, resetQuestion, submitButton } from "../helpers/quizHelpers";

// Component

const TextQuestion = ({activeLearner, learnedMinerals, answerKey, promptKey, question, markCorrect, markComplete, isSubmitted}) => {

    // Local state
    const [prompt, setPrompt] = useState(null);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [possibleAnswers, setPossibleAnswers] = useState(null);
    const [submitMessage, setSubmitMessage] = useState(null);

    const generateQuestion = (learnedMinerals, answerKey, promptKey) => {
        const learnedMineralsCopy = [...learnedMinerals]; 
        const correctMineral = removeRandomListElement(learnedMineralsCopy);

        const candidateMinerals = learnedMineralsCopy.filter((mineral) => {
            return mineral[promptKey] !== correctMineral[promptKey];
        });

        const answerCandidates = candidateMinerals.map((mineral) => mineral[answerKey]);
        const uniqueCandidates = Array.from(new Set(answerCandidates));
        
        let incorrectAnswers = [];
        for (let i = 0; i < 3; i++) {
            incorrectAnswers.push(removeRandomListElement(uniqueCandidates));
        }

        let answers = [];
        answers.push(correctMineral[answerKey]);
        for (let i = 0; i < 3; i++) {
            answers.push(incorrectAnswers[i]);
        }

        // we could also shuffle
        setPossibleAnswers(answers.sort());

        setCorrectAnswer(correctMineral[answerKey]);
        setPrompt(correctMineral[promptKey]);
    };

    const uniqueQuestionName = "choice" + answerKey + promptKey;

    // Initialize page
    useEffect(() => {
        resetQuestion(uniqueQuestionName, setSubmitMessage);
        generateQuestion(learnedMinerals, answerKey, promptKey);
    }, [learnedMinerals, answerKey, promptKey, uniqueQuestionName]);

    if (possibleAnswers === null) {
        return <div><p>{activeLearner === null ? "Please log in" : "Loading quiz..."}</p></div>
    }

    const submitHandler = () => {
        evaluateResponse(uniqueQuestionName, correctAnswer, setSubmitMessage, markCorrect, markComplete);
    };

    return (
    <div>
        <h2>{question}</h2>
        <h3>{prompt}</h3>
        <form>
            <div>
                <label>{possibleAnswers[0]}</label>
                <input type="radio" name={uniqueQuestionName} value={possibleAnswers[0]}/>
                <label>{possibleAnswers[1]}</label>
                <input type="radio" name={uniqueQuestionName} value={possibleAnswers[1]}/>
                <label>{possibleAnswers[2]}</label>
                <input type="radio" name={uniqueQuestionName} value={possibleAnswers[2]}/>
                <label>{possibleAnswers[3]}</label>
                <input type="radio" name={uniqueQuestionName} value={possibleAnswers[3]}/>
            </div>
        </form>
        {submitButton(isSubmitted, submitHandler)}        
        <p>{submitMessage}</p>

    </div>
    );
};

export default TextQuestion;