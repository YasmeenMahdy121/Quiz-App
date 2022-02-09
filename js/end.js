let save=document.querySelector('button');
let input=document.querySelector('input');
let score=0;
let users=[];
// flag to avoid resend data when go back
let flag=localStorage.getItem('flag');
// get last score
if(localStorage.getItem('lastScore')!==null){
    score=localStorage.getItem('lastScore');
}
// get high scores
if(localStorage.getItem('highScores')!==null){
    users=JSON.parse(localStorage.getItem('highScores'));
}
// set last score to html
document.querySelector('.end-container strong').innerHTML=score;
// enable save btn
input.oninput = function(){
    if(input.value==''){
        save.classList.add('disabled');
    }
    else{
        save.classList.remove('disabled');
    }
}
// click save btn
save.addEventListener('click',function(){
    if(input.value!=''&&flag=='false'){
        // add user high score
        users.push({
            name : input.value,
            score : score
        });
        // set new high scores to local storage
        localStorage.setItem("highScores", JSON.stringify(users));
        // reset form info
        document.querySelector('form').reset();
        // avoid resend data
        localStorage.setItem('flag','true');
        // go to home page
        window.location.assign('index.html');
    }
});