import PhotoToName from "../components/photoToName";
import NameToPhoto from "../components/nameToPhoto";
import TextQuestion from "../components/textQuestion";

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

    useEffect(() => {
        if (learnedMinerals === null && activeLearner !== null) {
            getLearnedMinerals(activeLearner).then((learnedMinerals) => {
                setLearnedMinerals(learnedMinerals);
            });
        };
    }, [learnedMinerals, activeLearner]);


    if (learnedMinerals === null) {
        return <div><p>{activeLearner === null ? "Please log in" : "Loading quiz..."}</p></div>
    }

    if ((new Set(learnedMinerals.map((mineral) => mineral.formula))).size < 4 ||
        (new Set(learnedMinerals.map((mineral) => mineral.hardness))).size < 4) {
        return <div><p>Please learn more minerals before attempting the quiz</p></div>
    }

    return (
    <div>
        <h1>Quiz</h1>
        <TextQuestion activeLearner={activeLearner}
                      answerKey="name"
                      promptKey="formula"
                      question="What mineral does this chemical formula describe?">                        
        </TextQuestion>
        <TextQuestion activeLearner={activeLearner}
                      answerKey="formula"
                      promptKey="name"
                      question="What is the chemical formula for this mineral?">                        
        </TextQuestion>
        <TextQuestion activeLearner={activeLearner}
                      answerKey="specificGravity"
                      promptKey="name"
                      question="What is the specific gravity for this mineral?">                        
        </TextQuestion> 
        <PhotoToName activeLearner={activeLearner}></PhotoToName>
        <NameToPhoto activeLearner={activeLearner}></NameToPhoto>     
    </div>
    );
};

export default Quiz;