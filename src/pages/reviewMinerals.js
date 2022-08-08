import axios from 'axios';
import { useState, useEffect } from "react"; 
import Mineral from "../components/mineral";

// URLS

const getRandomLearnedMineralURL = (activeLearner) => {
    const learnerID = activeLearner.id;
    return process.env.REACT_APP_BACKEND_URL
    + "/learners"
    + "/" + learnerID
    + "/randomLearnedMineral";
};

const getRandomDifferentLearnedMineralURL = (mineralData, activeLearner) => {
    const mineralID = mineralData.id;
    const learnerID = activeLearner.id;
    return process.env.REACT_APP_BACKEND_URL
    + "/learners"
    + "/" + learnerID
    + "/" + mineralID
    + "/randomDifferentLearnedMineral";
};

const unlearnMineralURL = (mineralData, activeLearner) => {
    const mineralID = mineralData.id;
    const learnerID = activeLearner.id;
    return process.env.REACT_APP_BACKEND_URL
    + "/learners"
    + "/" + learnerID
    + "/" + mineralID
    + "/unlearnMineral";
};

// Page component 

const ReviewMinerals = ({updateMineralsLearned, activeLearner}) => {
    // Local state
    const [mineralData, setMineralData] = useState(null);
    const [learnMessage, setLearnMessage] = useState("")
    
    // Messages
    const showNewMineral = "Show me a new mineral to review";
    const learnUnlearn = "I've forgotten this mineral";

    // API calls 

    const getRandomLearnedMineral = () => {
        axios.get(getRandomLearnedMineralURL(activeLearner)).then((response) => {    
            setMineralData(response.data);
        }).catch((err) =>{
            console.log(err)
        });
    };

    const getRandomDifferentLearnedMineral = () => {
        axios.get(getRandomDifferentLearnedMineralURL(mineralData, activeLearner)).then((response) => {
            setMineralData(response.data);
        }).catch((err) => {
            console.log(err);
        });
    };

    const unlearnMineral = () => {
        axios.delete(unlearnMineralURL(mineralData, activeLearner)).then((response) => {
            setLearnMessage("You unlearned a mineral!")
            updateMineralsLearned();
        }).catch((err) => {
            console.log(err);
        });
    };
    
    // Initialize page with mineral data
    useEffect(() => {
        if (mineralData === null && activeLearner !== null) {
            getRandomLearnedMineral();
        }
    });

    // Render section 
    return (
        <div>
            <h1>Review Minerals</h1>
            <Mineral mineralData={mineralData} 
                     learnUnlearn={learnUnlearn}
                     learnUnlearnAction={unlearnMineral} 
                     showNewMineral={showNewMineral}
                     showNewMineralAction={getRandomDifferentLearnedMineral}>
                     learnMessage={learnMessage}
            </Mineral>
        </div>
    
    );
    
};

export default ReviewMinerals;