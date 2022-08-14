import axios from 'axios';
import { useState, useEffect } from "react"; 
import Mineral from "../components/mineral";

// URLS

const getNewMineralURL = (activeLearner) => {
    const activeLearnerID = activeLearner.id;
    return process.env.REACT_APP_BACKEND_URL
        + '/learners' 
        + "/" + activeLearnerID
        + "/randomUnlearnedMineral"; 
};

const getRandomDifferentUnlearnedMineralURL = (mineralData, activeLearner) => {
    const mineralID = mineralData.id;
    const learnerID = activeLearner.id;
    return process.env.REACT_APP_BACKEND_URL
    + "/learners"
    + "/" + learnerID
    + "/" + mineralID
    + "/randomDifferentUnlearnedMineral";
};

const learnMineralURL = (mineralData, activeLearner) => {
    const mineralID = mineralData.id;
    const learnerID = activeLearner.id;
    return process.env.REACT_APP_BACKEND_URL
    + "/learners"
    + "/" + learnerID
    + "/" + mineralID;
};

// Page component

const LearnMinerals = ({updateMineralsLearned, activeLearner}) => {
    // Local state
    const [mineralData, setMineralData] = useState(null);
    const [learnMessage, setLearnMessage] = useState("")
    const [allMineralsLearned, setAllMineralsLearned] = useState(false)
    
    // Messages
    const showNewMineral = "Show me a new mineral to learn!";
    const learnUnlearn = "I've learned this mineral";

    // API calls 
    const getMineralData = () => {
        axios.get(getNewMineralURL(activeLearner)).then((response) => {
            setMineralData(response.data);
        }).catch((err) => {
            console.log(err);
            if (err.response.data === "no minerals available") {
                setAllMineralsLearned(true);
            }
        });
    };

    const getRandomDifferentUnlearnedMineral = () => {
        axios.get(getRandomDifferentUnlearnedMineralURL(mineralData, activeLearner)).then((response) => {
            setMineralData(response.data);
        }).catch((err) => {
            console.log(err);
            if (err.response.data === "no minerals available") {
                setAllMineralsLearned(true);
            }
        });
    };

    const learnMineral = () => {
        return axios.post(learnMineralURL(mineralData, activeLearner)).then((response) => {
            setLearnMessage("You learned a mineral!");
            updateMineralsLearned();
        }).catch((err) => {
            console.log(err);
        });
    };

    // Initialize page with mineral data
    useEffect(() => {
        if (mineralData === null && activeLearner !== null) {
            getMineralData();
        }
    });

    if (allMineralsLearned) {
        return <p id="all-learned">You have learned all the minerals currently in the database.<strong>Great job!</strong></p>
    }  

    // Rendered section
    return (
        <div id="learn-mineral">
            <h1>Learn Minerals</h1>
            <Mineral mineralData={mineralData} 
                     learnUnlearn={learnUnlearn}
                     learnUnlearnAction={learnMineral} 
                     showNewMineral={showNewMineral}
                     showNewMineralAction={getRandomDifferentUnlearnedMineral}>
                     learnMessage={learnMessage}
            </Mineral>
        </div>
    
    );
};

export default LearnMinerals;