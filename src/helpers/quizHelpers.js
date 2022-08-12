const removeRandomListElement = (list) => {
    const index = Math.floor(Math.random() * list.length);
    
    const value = list[index];
    list.splice(index, 1);

    return value;
};

const evaluateResponse = (uniqueQuestionName, correctAnswer, setSubmitMessage) => {
    let learnerChoice = null 
    const choices = document.getElementsByName(uniqueQuestionName);
    for (let i = 0; i < choices.length; i++) {
        if (choices[i].checked) {
            learnerChoice = choices[i].value;
        } 
    }

    if (learnerChoice === correctAnswer) {
        setSubmitMessage("That's correct!");
    } else {
        setSubmitMessage("Sorry. That's incorrect.");
    };
};

export {removeRandomListElement, evaluateResponse};