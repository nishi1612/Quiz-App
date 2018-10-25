function Quiz(Questions){
	this.score = 0;
	this.questions = Questions;
	this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function(){
	return this.questions[this.questionIndex];
}

Quiz.prototype.isEnded = function(){
	return this.questions.length === this.questionIndex ;
}

Quiz.prototype.guess = function(answer){
	if(this.getQuestionIndex().correctAnswer(answer)){
		this.score++;
	}
	this.questionIndex++;
	
}