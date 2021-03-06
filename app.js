var questions = [];

<?php
	include('conn.php');
	$sq = "select * from questions";
	$res = $conn->query($sq);
	if($res){
		while($fe=$res->fetch_object()){
			$que = $fe->question;
			$c1 = $fe->choice1;
			$c2 = $fe->choice2;
			$c3 = $fe->choice3;
			$c4 = $fe->choice4;
			$ans = $fe->answer;
			?>
			questions.push(new Question("<?php echo $que; ?>" , ["<?php echo $c1; ?>","<?php echo $c2; ?>","<?php echo $c3; ?>","<?php echo $c4; ?>"],"<?php echo $ans; ?>"));
			<?php

		}
	} 
?>

var quiz = new Quiz(questions);

function showscores(){
	var gameoverhtml = "<h1> Result</h1>";
	gameoverhtml += "<h2 id='score'> Your scores : " + quiz.score + " </h2>";
	gameoverhtml += "<button id='btn'>Play Again</button>"
	var element = document.getElementById("quiz");
	element.innerHTML = gameoverhtml;
	var btton = document.getElementById("btn");
	btton.onclick = function(){
		populate(0);
	}
};

function guess(id,guess){
	var button = document.getElementById(id);
	button.onclick = function(){
		quiz.guess(guess);
		populate(1);
	}
};

function showprogress(){
	var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function populate(j){
	if(j===0){
		quiz.questionIndex = 0;
		quiz.score = 0;
		var html = "<h1>Quiz</h1>";
  		html +=	"<hr style='margin-bottom: 20px'>";
  		html +=	"	<p id='question'></p>";
  		html +=	"	<div class='buttons'>";
  		html +=	"		<button id='btn0'><span id='choice0'></button>";
  		html +=	"		<button id='btn1'><span id='choice1'></button>";
  		html +=	"		<button id='btn2'><span id='choice2'></button>";
  		html +=	"		<button id='btn3'><span id='choice3'></button>";
  		html +=	"	</div>";
  		html +=	"	<hr style='margin-top: 20px'>";
  		html +=	"	<footer>";
  		html +=	"		<p id='progress'>Question x of y</p>";
  		html +=	"	</footer>";
  		var element = document.getElementById("quiz");
		element.innerHTML = html;
	}
	if(quiz.isEnded()){
		showscores();
	}else{
		console.log(quiz.questionIndex);
		var element = document.getElementById("question");
		element.innerHTML = quiz.getQuestionIndex().text;
		var choices = quiz.getQuestionIndex().choices;
		for(var i=0;i<choices.length;i++){
			var element = document.getElementById("choice" + i);
			element.innerHTML = choices[i];
			guess("btn" + i , choices[i]);
		}
		showprogress();
	}
};

function foo(){
	populate(0);	
}

