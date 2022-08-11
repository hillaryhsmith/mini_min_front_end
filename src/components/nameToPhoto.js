import axios from 'axios';
import { useState, useEffect } from "react";
import Photo from './photo';

// URLS

const getLearnedMineralsURL = (activeLearner) => {
    const activeLearnerID = activeLearner.id;
    return process.env.REACT_APP_BACKEND_URL
    + "/learners"
    + "/" + activeLearnerID
    + "/learnedMinerals";
};

const getPhotoURL = (mineralData) => {
    const mineralID = mineralData.id;
    return process.env.REACT_APP_BACKEND_URL
        + "/minerals"
        + "/" + mineralID
        + "/randomPhoto";
};


// Helper function 

const removeRandomListElement = (list) => {
    const index = Math.floor(Math.random() * list.length);
    
    const value = list[index];
    list.splice(index, 1);

    return value;
};

// API calls 

const getLearnedMinerals = (activeLearner) => {
    return axios.get(getLearnedMineralsURL(activeLearner)).then((response) => {
        return response.data;
    }).catch((err) => {
        console.log(err);
    });
};

const getPhoto = (mineralData) => {
    return axios.get(getPhotoURL(mineralData)).then((response) => {
        return Object.assign({mineralID: mineralData.id}, response.data);
    }).catch((err) => {
        console.log(err);
    });
};

// Component

const NameToPhoto = ({activeLearner}) => {
    //Local state
    const [photos, setPhotos] = useState([null, null, null, null]);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [possibleAnswers, setPossibleAnswers] = useState(null);
    const [prompt, setPrompt] = useState(null);
    const [submitMessage, setSubmitMessage] = useState(null);
    
    // Messages
    const question = "Which photo depicts the mineral?"
    const correct = "That's correct!"
    const incorrect = "Sorry. That's incorrect."

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
        const photoPromises = answers.map(getPhoto);

        Promise.all(photoPromises).then((photos) => {
            setPossibleAnswers(answers);
            setPhotos(photos);
            setPrompt(correctMineral.name);
            setCorrectAnswer(correctMineral.id.toString());
        });
    };

    const uniqueQuestionName = "choicephotoname";

    // Check answer
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
        if (correctAnswer === null && activeLearner !== null) {
            getLearnedMinerals(activeLearner).then((learnedMinerals) => {
                generateQuestion(learnedMinerals);
            });
        }
    });

    if (correctAnswer === null) {
        return <div><p>{activeLearner === null ? "Please log in" : "Loading quiz..."}</p></div>
    }

    // Render section
    
    return (
    <div>
        <h2>{question}</h2>
        <h2>{prompt}</h2>
        <label>a</label>
        <Photo photoData = {photos[0]} mineralID = {possibleAnswers[0].id}></Photo>
        <label>b</label>
        <Photo photoData = {photos[1]} mineralID = {possibleAnswers[1].id}></Photo>
        <label>c</label>
        <Photo photoData = {photos[2]} mineralID = {possibleAnswers[2].id}></Photo>
        <label>d</label>
        <Photo photoData = {photos[3]} mineralID = {possibleAnswers[3].id}></Photo>
        <form>
            <div>
                <label>a</label>
                <input type="radio" name={uniqueQuestionName} value={possibleAnswers[0].id}/>
                <label>b</label>
                <input type="radio" name={uniqueQuestionName} value={possibleAnswers[1].id}/>
                <label>c</label>
                <input type="radio" name={uniqueQuestionName} value={possibleAnswers[2].id}/>
                <label>d</label>
                <input type="radio" name={uniqueQuestionName} value={possibleAnswers[3].id}/>
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

export default NameToPhoto;
