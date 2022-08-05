import axios from 'axios';
import { useState } from "react";

const getMessages = (learnStatus) => {
    if (learnStatus === "learn") {
        return ["Show me a new mineral to learn!", "I've learned this mineral"];
    } else {
        return ["Show me a new mineral to review", "I've forgotten this mineral"];
    };
}

const getPhotoURL = (mineralData) => {
    const mineralID = mineralData.id;
    return process.env.REACT_APP_BACKEND_URL
        + "/minerals"
        + "/" + mineralID
        + "/randomPhoto";
};

const getDifferentPhotoURL = (mineralData, photoID) => {
    const mineralID = mineralData.id;
    return process.env.REACT_APP_BACKEND_URL
    + "/minerals"
    + "/" + mineralID
    + "/" + photoID
    + "/randomPhoto";
};

const learnMineralURL = (mineralData, activeLearner) => {
    const mineralID = mineralData.id;
    const learnerID = activeLearner.id;
    return process.env.REACT_APP_BACKEND_URL
    + "/learners"
    + "/" + learnerID
    + "/" + mineralID;
};

const getDifferentMineralURL = (mineralData, activeLearner) => {
    const mineralID = mineralData.id;
    const learnerID = activeLearner.id;
    return process.env.REACT_APP_BACKEND_URL
    + "/learners"
    + "/" + learnerID
    + "/" + mineralID
    + "/randomDifferentLearnedMineral";
};


const Mineral = (mineralData, learnStatus) => {
    const [photoID, setPhotoID] = useState(null)

    if (mineralData === null) {
        return <div></div>;
    }

    
    const [showNewMineral, learnUnlearn] = getMessages(learnStatus);

    // const getMineralData = ({activeLearner}) => {
    //     axios.get(getNewMineralURL(activeLearner)).then((response) => {
    //         setMineralData(response.data);
    //     }).catch((err) => {
    //         console.log(err);
    //     });
    // };

    const getPhoto = () => {};
    const getDifferentPhoto = () => {};
    const learnMineral = () => {};
    const getDifferentMineral = () => {};

    return (
        <div>
            <div>
                <button type="button" onClick={getDifferentPhoto}>
                Show me a new photo of this mineral!
                </button>
            </div>
            <div>
                <button type="button" onClick={learnMineral}>
                {showNewMineral}
                </button>
            </div>
            <div>
                <button type="button" onClick={getDifferentMineral}>
                {learnUnlearn}
                </button>
            </div>
        </div>
        )
};
export default Mineral;