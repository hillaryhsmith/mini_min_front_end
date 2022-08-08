const Photo = ({photoData, mineralID}) => {
    if (photoData === null || photoData.mineralID !== mineralID) {
        return <div></div>
    }

    return <img src={photoData.location} alt="hand sample of mineral"/>;
}

export default Photo;

