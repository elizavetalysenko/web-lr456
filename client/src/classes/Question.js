export class Question 
{
	constructor(text, answers , type)
	{
		this.text = text; 
		this.answers = answers; 
        this.type = type;
	}

	check(answer) {
        let score = 0;

        if (answer == null || answer == undefined) return 0;

        if(this.type == 'input') {
            score += this.checkInput(answer);
        } else if(this.type == "drag&drop") {
            score += this.checkDragDrop(answer);
        } else if(this.type == "select") {
            score += this.checkSelect(answer);
        } else if(this.type == "radio" || this.type == "checkbox"){
            answer.forEach((val, index) => {
                if(val) {
                    score += this.answers[index].value;
                }
            });
        }
        return score;
    }

    checkDragDrop(answer) {
        return this.answers[answer].value;
    }

    checkInput(answer) {
        return this.answers[0].text == answer ? this.answers[0].value : 0
    }

    checkSelect(answer) {
        return this.answers[answer].value;
    }

    getMaxScore() {
        let maxScore = 0;
        this.answers.forEach(answer => maxScore += answer.value);
        return maxScore;
    }
}