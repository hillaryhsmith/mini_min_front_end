import axios from 'axios';
import { useState, useEffect } from "react"; 
import Mineral from "../components/mineral";
import ReviewMineralsList from '../components/reviewMineralsList';

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

// Page component 

const ReviewMinerals = ({updateMineralsLearned, activeLearner, mineralsLearned}) => {
    // Local state
    const [mineralData, setMineralData] = useState(null);
    const [learnedMinerals, setLearnedMinerals] = useState(null);
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
        return axios.delete(unlearnMineralURL(mineralData, activeLearner)).then((response) => {
            setLearnMessage("You unlearned a mineral!")
            updateMineralsLearned();
        }).catch((err) => {
            console.log(err);
        });
    };
    
    // Initialize page with mineral data
    useEffect(() => {
        if (mineralData === null && activeLearner !== null && mineralsLearned > 0) {
            getRandomLearnedMineral();
        }
    });

    useEffect(() => {
        if (activeLearner !== null && mineralsLearned > 0) {
            getLearnedMinerals(activeLearner).then((learnedMinerals) => setLearnedMinerals(learnedMinerals));
        }
    }, [activeLearner, mineralsLearned]);

    if (mineralsLearned === 0) {
        return <p>Please learn some minerals before attempting to review</p>
    }  

    // Render section 
    return (
        <div id="review-mineral">
            <h1>Review Minerals</h1>
            <ReviewMineralsList learnedMinerals={learnedMinerals} setSelectedMineral={setMineralData}></ReviewMineralsList>
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