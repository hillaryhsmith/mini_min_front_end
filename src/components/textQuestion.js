import axios from 'axios';
import { useState, useEffect } from "react";

// URLS

const getLearnedMineralsURL = (activeLearner) => {
    const activeLearnerID = activeLearner.id;
    return process.env.REACT_APP_BACKEND_URL
    + "/learners"
    + "/" + activeLearnerID
    + "/learnedMinerals";
};

const removeRandomListElement = (list) => {
    const index = Math.floor(Math.random() * list.length);
    
    const value = list[index];
    list.splice(index, 1);

    return value;
};

 //API calls 
const getLearnedMinerals = (activeLearner) => {
    return axios.get(getLearnedMineralsURL(activeLearner)).then((response) => {
        return response.data;
    }).catch((err) => {
        console.log(err);
    });
};

// Component

const TextQuestion = ({activeLearner, answerKey, promptKey, question}) => {

    // Local state
    const [prompt, setPrompt] = useState(null);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [possibleAnswers, setPossibleAnswers] = useState(null);
    const [submitMessage, setSubmitMessage] = useState(null);
    
    // Messages
    const correct = "That's correct!"
    const incorrect = "Sorry. That's incorrect."

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

    const evaluateResponse = () => {
        let learnerChoice = null 
        const choices = document.getElementsByName(uniqueQuestionName);
        for (let i = 0; i < choices.length; i++) {
            if (choices[i].checked) {
                learnerChoice = choices[i].value;
            }
            
        }

        if (learnerChoice === correctAnswer) {
            setSubmitMessage(correct);
        } else {
            setSubmitMessage(incorrect);
        };
    };
    
    // Initialize page
    useEffect(() => {
        if (possibleAnswers === null && activeLearner !== null) {
            getLearnedMinerals(activeLearner).then((learnedMinerals) => {
                generateQuestion(learnedMinerals, answerKey, promptKey);
            });
        }
    });

    if (possibleAnswers === null) {
        return <div><p>{activeLearner === null ? "Please log in" : "Loading quiz..."}</p></div>
    }


    // Rendered section
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

        <div>
            <button type="button" onClick={evaluateResponse}>
            Submit
            </button>
        </div>
        <p>{submitMessage}</p>

    </div>
    );
};

export default TextQuestion;