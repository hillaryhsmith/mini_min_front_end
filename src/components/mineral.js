import axios from 'axios';
import { useState, useEffect } from "react";

import Photo from './photo';


const getPhotoURL = (mineralData) => {
    const mineralID = mineralData.id;
    return process.env.REACT_APP_BACKEND_URL
        + "/minerals"
        + "/" + mineralID
        + "/randomPhoto";
};

const getDifferentPhotoURL = (mineralData, photoData) => {
    const photoID = photoData.id;
    const mineralID = mineralData.id;
    return process.env.REACT_APP_BACKEND_URL
    + "/minerals"
    + "/" + mineralID
    + "/" + photoID
    + "/randomDifferentPhoto";
};

const Mineral = ({mineralData, learnUnlearn, learnUnlearnAction, showNewMineral, showNewMineralAction, learnMessage}) => {
    const [photoData, setPhotoData] = useState(null)

    const updatePhotoState = (photoResponse) => {
        const photoAndMineralId = Object.assign({mineralID: mineralData.id}, photoResponse);
        setPhotoData(photoAndMineralId);
    }
        
    const getPhoto = () => {
        axios.get(getPhotoURL(mineralData)).then((response) => {
            updatePhotoState(response.data);
        }).catch((err) => {
            console.log(err);
        });
    };

    const getDifferentPhoto = () => {
        axios.get(getDifferentPhotoURL(mineralData, photoData)).then((response) => {
            updatePhotoState(response.data);
        }).catch((err) => {
            console.log(err);
        });
    };

    useEffect(() => {
        if (mineralData !== null && 
            (photoData === null || photoData.mineralID !== mineralData.id)) {
            getPhoto();
        }
    });

    if (mineralData === null) {
        return <div></div>;
    }

    return (
        <div>
            <h2>{mineralData.name}</h2>
            <h3>{mineralData.formula}</h3>
            <Photo photoData = {photoData} mineralID = {mineralData.id}></Photo>
            <div>
                <button type="button" onClick={getDifferentPhoto}>
                Show me a new photo of this mineral!
                </button>
            </div>
            <div>
                <h4>Hardness</h4>
                <p>{mineralData.hardness}</p>
                <h4>Specific Gravity</h4>
                <p>{mineralData.specificGravity}</p>
                <h4>Color</h4>
                <p>{mineralData.color}</p>
                <h4>Streak</h4>
                <p>{mineralData.streak}</p>
                <h4>Lustre</h4>
                <p>{mineralData.lustre}</p>
                <h4>Crystal System</h4>
                <p>{mineralData.crystalSystem}</p>
                <h4>Crystal Morphology</h4>
                <p>{mineralData.crystalMorphology}</p>
                <h4>Polymorphs</h4>
                <p>{mineralData.polymorphs}</p>
                <h4>Description</h4>
                <p>{mineralData.description}</p>
            </div>
            <div>
                <button type="button" onClick={() => {learnUnlearnAction().then(showNewMineralAction);}}>
                {learnUnlearn}
                </button>
                <p>{learnMessage}</p>
            </div>
            <div>
                <button type="button" onClick={showNewMineralAction}>
                {showNewMineral}
                </button>
            </div>
            <div>
                <a href={"https://www.mindat.org/min-" + mineralData.mindatId + ".html"} target="_blank" rel="noreferrer">
                    For More Detailed Information on {mineralData.name}
                </a>
            </div>
        </div>
        )
};
export default Mineral;