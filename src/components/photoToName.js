import axios from 'axios';
import { useState, useEffect } from "react";
import Photo from './photo';
import { removeRandomListElement, evaluateResponse, submitButton, resetQuestion } from "../helpers/quizHelpers";


// URLS

const getPhotoURL = (mineralID) => {
    return process.env.REACT_APP_BACKEND_URL
        + "/minerals"
        + "/" + mineralID
        + "/randomPhoto";
};

// API calls 

const getPhoto = (mineralID) => {
    return axios.get(getPhotoURL(mineralID)).then((response) => {
        return Object.assign({mineralID: mineralID}, response.data);
    }).catch((err) => {
        console.log(err);
    });
};

// Component

const PhotoToName = ({activeLearner, learnedMinerals, markCorrect, markComplete, isSubmitted}) => {
    //Local state
    const [photoData, setPhotoData] = useState(null);
    const [correctMineralId, setCorrectMineralId] = useState(null);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [possibleAnswers, setPossibleAnswers] = useState(null);
    const [submitMessage, setSubmitMessage] = useState(null);
    
    // Messages
    const question = "Which mineral is depicted in this photo?"

    // Generate question 
    const generateQuestion = (learnedMinerals) => {
        const learnedMineralsCopy = [...learnedMinerals]; 
        const correctMineral = removeRandomListElement(learnedMineralsCopy);
        
        let incorrectMinerals = [];
        for (let i = 0; i < 3; i++) {
            incorrectMinerals.push(removeRandomListElement(learnedMineralsCopy));
        }

        let answers = [];
        answers.push(correctMineral.name);
        for (let i = 0; i < 3; i++) {
            answers.push(incorrectMinerals[i].name);
        }

        // we could also shuffle
        setPossibleAnswers(answers.sort());
        setCorrectAnswer(correctMineral.name);
        setCorrectMineralId(correctMineral.id);
    };

    const uniqueQuestionName = "choicenamephoto";
    
    // Initialize page
    useEffect(() => {
        resetQuestion(uniqueQuestionName, setSubmitMessage);
        generateQuestion(learnedMinerals);
    }, [learnedMinerals]);

    useEffect(() => {
        if (correctMineralId !== null && 
            (photoData === null || photoData.mineralID !== correctMineralId)) {
            getPhoto(correctMineralId).then(setPhotoData);
        } 
    }, [correctMineralId, photoData]);

    if (possibleAnswers === null) {
        return <div><p>{activeLearner === null ? "Please log in" : "Loading quiz..."}</p></div>
    }

    
    const submitHandler = () => {
        evaluateResponse(uniqueQuestionName, correctAnswer, setSubmitMessage, markCorrect, markComplete);
    };
    
    return (
    <div className='quiz-question'>
        <h2>{question}</h2>
        <div className='mineralPhoto'>
            <Photo photoData = {photoData} mineralID = {correctMineralId}></Photo>
        </div>
        <form>
            <div id="quiz-container">
                <label>
                    <input type="radio" name={uniqueQuestionName} value={possibleAnswers[0]}
                       disabled={isSubmitted}/>
                    {possibleAnswers[0]}
                </label>
                <label>
                    <input type="radio" name={uniqueQuestionName} value={possibleAnswers[1]}
                       disabled={isSubmitted}/>
                    {possibleAnswers[1]}
                </label>
                <label>
                    <input type="radio" name={uniqueQuestionName} value={possibleAnswers[2]}
                       disabled={isSubmitted}/>
                    {possibleAnswers[2]}
                </label>
                <label>
                    <input type="radio" name={uniqueQuestionName} value={possibleAnswers[3]}
                       disabled={isSubmitted}/>
                    {possibleAnswers[3]}
                </label>
            </div>
        </form>
        <br></br>
        {submitButton(isSubmitted, submitHandler)}
        <p>{submitMessage}</p>
    </div>
    );
};

export default PhotoToName;
