const ReviewMineralsList = ({learnedMinerals, setSelectedMineral}) => {    
    if (learnedMinerals === null) {
        return <div></div>
    }

    const mineralListElement = (mineral) => {
        return (
            <h4 key={mineral.name} onClick={()=>setSelectedMineral(mineral)}>
                {mineral.name}
            </h4>
        );
    };
    
    return (
        <div>
            <h2>Learned Minerals</h2>
            <p>Click mineral name to review</p>
            {learnedMinerals.map(mineralListElement)}
        </div>
    )

};

export default ReviewMineralsList;
