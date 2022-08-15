const ReviewMineralsList = ({learnedMinerals, setSelectedMineral}) => {    
    if (learnedMinerals === null) {
        return <div></div>
    }

    const mineralListElement = (mineral) => {
        return (
            <p key={mineral.name} onClick={()=>setSelectedMineral(mineral)}>
                {mineral.name}
            </p>
        );
    };
    
    return (
        <div id="mineral-list">
            <h2>Learned Minerals</h2>
            <p>Click mineral name to review</p>
            <div id="list">{learnedMinerals.map(mineralListElement)}</div>
            
        </div>
    )

};

export default ReviewMineralsList;
