let progressSpan=document.querySelector('.progress-container span');
let progressBar=document.querySelector('.progress-bar');
let scoreSpan=document.querySelector('.score-val');
let question=document.querySelector('.question');
let answersContainer=document.querySelector('.answers');
let questions;
let currentQuestion=0;
let score=0;
let orserStyle='ABCD';
let correctAnswer;
// start
startGame();
// start game function
function startGame(){
    // make request
    let request=new XMLHttpRequest();
    request.open("GET", "js/questions.json", true);
    request.send();
    request.onreadystatechange = function(){
        // check if request success
        if(this.readyState === 4 && this.status === 200){
            // get questions
            questions= JSON.parse(this.response);
            // shuffle questions Orders
            questions=shuffleOrders(questions);
            // set the question and its answers
            setQuestion(questions[currentQuestion]);
            // click answer
            clickAnswer(questions[currentQuestion]);
            // end loader
            let loader=document.querySelector('.loader-container');
            let gameContainer=document.querySelector('.game-container');
            loader.style.display='none';
            gameContainer.style.display='block';
        }
    }
}

// shuffle function
function shuffleOrders(arr){
    let current = arr.length-1;
    while(current>=0){
        let random = Math.floor(Math.random()*arr.length);
        // swap current value with random value
        let temp = arr[current];
        arr[current] = arr[random];
        arr[random] = temp;
        current--;
    }
    return arr;
}  
// set question and its answers to html function
function setQuestion(questionOBJ){
    // reset question and answers
    question.innerHTML='';
    answersContainer.innerHTML='';
    // shuffle answers Orders
    let answersOrder= shuffleOrders(Array.from(Array(4).keys()));
    // set question to html
    question.textContent=questionOBJ.question;
    // set answers
    for(let i=1; i<=4;i++){
        // create li
        let li=document.createElement('li');
        // add dataset
        li.dataset.answer=i;
        li.style.order=answersOrder[i-1];
        // create span of orderStyle
        let span=document.createElement('span');
        span.appendChild(document.createTextNode(orserStyle[i-1]));
        // create p of the aswer
        let answerP=document.createElement('p');
        answerP.appendChild(document.createTextNode(questionOBJ[`choice${i}`]));
        // append span and answerP to li
        li.appendChild(span);
        li.appendChild(answerP);
        // append li to answersContainer
        answersContainer.appendChild(li);
    }
}
// click answer
function clickAnswer(questionOBJ){
    // get correct answer
    correctAnswer=questionOBJ['answer'];
    // get li of answers
    let answersLi=document.querySelectorAll('.answers li');
    // loop on li to add event listener
    answersLi.forEach((answer)=>{
        answer.addEventListener('click',function(){
            // if correct answer clicked
            if(answer.dataset.answer==correctAnswer){
                // increase score
                score+=10;
                scoreSpan.innerHTML=score;
                // get next question
                nextQuestion();
            }
            else{
                // get next question
                nextQuestion();
            }
        });
    });
}
function nextQuestion(){
    // check if end questions
    if(currentQuestion!=questions.length-1){
        currentQuestion++;
        // set question counter for ex 1/10 
        progressSpan.innerHTML=`Question ${currentQuestion+1}/${questions.length}`;
        // set progress width
        progressBar.style.width=`${(currentQuestion+1)*10}%`;
        // set new question and its answers to html function
        setQuestion(questions[currentQuestion]);
        // add click event to new question answers
        clickAnswer(questions[currentQuestion]);
    }
    else{
        // set last score
        localStorage.setItem('lastScore',score);
        // set flag to avoid resend data when go back
        localStorage.setItem('flag','false');
        window.location.assign('end.html');
    }
}