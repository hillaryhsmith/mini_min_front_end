import axios from 'axios';
import { useState, useEffect } from "react";
import Photo from './photo';
import { evaluateResponse, removeRandomListElement, resetQuestion, submitButton } from "../helpers/quizHelpers";

// URLS

const getPhotoURL = (mineralData) => {
    const mineralID = mineralData.id;
    return process.env.REACT_APP_BACKEND_URL
        + "/minerals"
        + "/" + mineralID
        + "/randomPhoto";
};

// API calls 

const getPhoto = (mineralData) => {
    return axios.get(getPhotoURL(mineralData)).then((response) => {
        return Object.assign({mineralID: mineralData.id}, response.data);
    }).catch((err) => {
        console.log(err);
    });
};

const anyPhotoMismatch = (photos, possibleAnswerMinerals) => {
    for (let i = 0; i < possibleAnswerMinerals.length; i++) {
        if (photos[i].mineralID !== possibleAnswerMinerals[i].id) {
            return true;
        }
    }

    return false;
}

// Component

const NameToPhoto = ({activeLearner, learnedMinerals, markCorrect, markComplete, isSubmitted}) => {
    //Local state
    const [photos, setPhotos] = useState([null, null, null, null]);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [possibleAnswers, setPossibleAnswers] = useState(null);
    const [prompt, setPrompt] = useState(null);
    const [submitMessage, setSubmitMessage] = useState(null);
    
    // Messages
    const question = "Which photo depicts the mineral?"
    
    // Generate question 
    const generateQuestion = (learnedMinerals) => {
        const learnedMineralsCopy = [...learnedMinerals]; 
        const correctMineral = removeRandomListElement(learnedMineralsCopy);

        let incorrectMinerals = [];
        for (let i = 0; i < 3; i++) {
            incorrectMinerals.push(removeRandomListElement(learnedMineralsCopy));
        }

        let answers = [];
        answers.push(correctMineral);
        for (let i = 0; i < 3; i++) {
            answers.push(incorrectMinerals[i]);
        }
        answers.sort((mineralA, mineralB) => mineralA.mindatId - mineralB.mindatId);

        // we could also shuffle        
        setPrompt(correctMineral.name);
        setPossibleAnswers(answers);
        setCorrectAnswer(correctMineral.id.toString());
    };

    const uniqueQuestionName = "choicephotoname";
    
    // Initialize page
    useEffect(() => {
        resetQuestion(uniqueQuestionName, setSubmitMessage);
        generateQuestion(learnedMinerals);
    }, [learnedMinerals]);

    useEffect(() => {
        if ((possibleAnswers !== null) &&
            (photos[0] === null || anyPhotoMismatch(photos, possibleAnswers))) {
                Promise.all(possibleAnswers.map(getPhoto)).then(setPhotos);
            }
    }, [possibleAnswers, photos]);

    if (correctAnswer === null) {
        return <div><p>{activeLearner === null ? "Please log in" : "Loading quiz..."}</p></div>
    }

    const submitHandler = () => {
        evaluateResponse(uniqueQuestionName, correctAnswer, setSubmitMessage, markCorrect, markComplete);
    };
    
    return (
    <div className='quiz-question'>
        <h2>{question}</h2>
        <h2>{prompt}</h2>
        <div className='mineralPhoto'>
            <label>a</label>
            <Photo photoData = {photos[0]} mineralID = {possibleAnswers[0].id}></Photo>
            <hr></hr>
            <label>b</label>
            <Photo photoData = {photos[1]} mineralID = {possibleAnswers[1].id}></Photo>
            <hr></hr>
            <label>c</label>
            <Photo photoData = {photos[2]} mineralID = {possibleAnswers[2].id}></Photo>
            <hr></hr>
            <label>d</label>
            <Photo photoData = {photos[3]} mineralID = {possibleAnswers[3].id}></Photo>
        </div>
        <form>
            <div id="quiz-container">
                <label>
                    <input type="radio" name={uniqueQuestionName} value={possibleAnswers[0].id}
                           disabled={isSubmitted}/>
                    a
                </label>
                <label>
                    <input type="radio" name={uniqueQuestionName} value={possibleAnswers[1].id}
                           disabled={isSubmitted}/>
                    b
                </label>
                <label>
                    <input type="radio" name={uniqueQuestionName} value={possibleAnswers[2].id}
                           disabled={isSubmitted}/>
                    c
                </label>
                <label>
                    <input type="radio" name={uniqueQuestionName} value={possibleAnswers[3].id}
                           disabled={isSubmitted}/>
                    d
                </label>
            </div>
        </form>
        <br></br>
        {submitButton(isSubmitted, submitHandler)}
        <p>{submitMessage}</p>
    </div>
    );
};

export default NameToPhoto;
