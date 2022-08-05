import axios from 'axios';
import { useState } from "react"; 

const getNewMineralURL = (activeLearner) => {
    const activeLearnerID = activeLearner.id;
    return process.env.REACT_APP_BACKEND_URL
        + '/learners' 
        + "/" + activeLearnerID
        + "/randomUnlearnedMineral"; 
};


const LearnMinerals = ({activeLearner}) => {

    const [mineralData, setMineralData] = useState(null);

    const getMineralData = ({activeLearner}) => {
        axios.get(getNewMineralURL(activeLearner)).then((response) => {
            setMineralData(response.data);
        }).catch((err) => {
            console.log(err);
        });
    };

    if (mineralData === null && activeLearner !== null) {
        getMineralData({activeLearner});
    }

    return (
        <div>
            <h1>Learn Minerals</h1>
            <h3>{JSON.stringify(mineralData)}</h3>
        </div>
    
    );
};

export default LearnMinerals;