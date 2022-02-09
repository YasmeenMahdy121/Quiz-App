let highScoreContainer=document.querySelector('.highScore-container ul');
let users=[];
// get high scores
if(localStorage.getItem('highScores')!==null){
    users=JSON.parse(localStorage.getItem('highScores'));
}
// sort users by its scores
sortUsers();
// set high scores to html
users.forEach((user)=>{
    // create li
    let li=document.createElement('li');
    // append user name to li
    li.appendChild(document.createTextNode(user.name));
    // create span
    let span=document.createElement('span');
    // append user score to span
    span.appendChild(document.createTextNode(user.score));
    // append span to li
    li.appendChild(span);
    // 
    highScoreContainer.appendChild(li);
});
// click clear btn
let clear=document.querySelector('button');
clear.addEventListener('click',function(){
    // clear high scores
    localStorage.setItem("highScores", JSON.stringify([]));
    highScoreContainer.innerHTML='';
});
// sort users by its scores function
function sortUsers(){
    for(let i = 0; i < users.length; i++){
        for(let j = 0; j < users.length - i - 1; j++){
            if(parseInt(users[j].score) < parseInt(users[j + 1].score)){
                //swapping
                [ users[j], users[j + 1] ] = [ users[j + 1], users[j] ];
            }
        }
    }
}