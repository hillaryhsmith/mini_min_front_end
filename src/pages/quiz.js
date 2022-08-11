import PhotoToName from "../components/photoToName";
import TextQuestion from "../components/textQuestion";

const Quiz = ({activeLearner}) => {
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
    </div>
    );
};

// check at least 4 minerals know before quiz allowed 

export default Quiz;