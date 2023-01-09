export class Quiz
{
	constructor(theme, questions, results)
	{
		this.theme = theme;
		this.questions = questions;
		this.results = results;

		this.score = 0;
		this.maxScore = this.questions.reduce((prev, curr) => prev+curr.getMaxScore(), 0);
		
		this.result = 0;
	}

	getResult() {
		return this.results[this.result];
	}

	checkResult(resultArray) {
		resultArray.forEach((answers, index) => {
			this.score += this.questions[index].check(answers);
			console.log(this.score, answers);
		});
		this.results.forEach((result, index) => {
			if(result.Check(this.score)) {
				this.result = index;
			}
		});
	}



}