const removeRandomListElement = (list) => {
    const index = Math.floor(Math.random() * list.length);
    
    const value = list[index];
    list.splice(index, 1);

    return value;
};

const evaluateResponse = (uniqueQuestionName, correctAnswer, setSubmitMessage, markCorrect, markComplete) => {
    let learnerChoice = null 
    const choices = document.getElementsByName(uniqueQuestionName);
    for (let i = 0; i < choices.length; i++) {
        if (choices[i].checked) {
            learnerChoice = choices[i].value;
        } else {
            choices[i].disabled=true;
        }
    }
    

    if (learnerChoice === correctAnswer) {
        setSubmitMessage("That's correct!");
        markCorrect();
    } else {
        setSubmitMessage("Sorry. That's incorrect.");
    };

    markComplete()
};

const resetQuestion = (uniqueQuestionName, setSubmitMessage) => {
    setSubmitMessage(null);
    
    const choices = document.getElementsByName(uniqueQuestionName);
    for (let i = 0; i < choices.length; i++) {        
        choices[i].checked = false;
        choices[i].disabled = false;
    } 
};

const submitButton = (isSubmitted, submitHandler) => {
    if (isSubmitted === false) {
        return (
            <button type="button" onClick={submitHandler}>
            Submit
            </button>
        )
    } else {
        return ""
    }
};

export {removeRandomListElement, evaluateResponse, resetQuestion, submitButton};