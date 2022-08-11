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

const PhotoToName = ({activeLearner}) => {
    //Local state
    const [photoData, setPhotoData] = useState(null);
    const [correctMineralId, setCorrectMineralId] = useState(null);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [possibleAnswers, setPossibleAnswers] = useState(null);
    const [submitMessage, setSubmitMessage] = useState(null);
    
    // Messages
    const question = "Which mineral is depicted in this photo?"
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
        answers.push(correctMineral.name);
        for (let i = 0; i < 3; i++) {
            answers.push(incorrectMinerals[i].name);
        }

        // we could also shuffle
        setPossibleAnswers(answers.sort());
        setCorrectAnswer(correctMineral.name);
        setCorrectMineralId(correctMineral.id);

        getPhoto(correctMineral).then((photoData) => setPhotoData(photoData));
    };

    const uniqueQuestionName = "choicenamephoto";

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
        if (possibleAnswers === null && activeLearner !== null) {
            getLearnedMinerals(activeLearner).then((learnedMinerals) => {
                generateQuestion(learnedMinerals);
            });
        }
    });

    if (possibleAnswers === null) {
        return <div><p>{activeLearner === null ? "Please log in" : "Loading quiz..."}</p></div>
    }

    // Render section
    
    return (
    <div>
        <h2>{question}</h2>
        <Photo photoData = {photoData} mineralID = {correctMineralId}></Photo>
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

export default PhotoToName;