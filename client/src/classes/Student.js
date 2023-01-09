export class Student {
    constructor(name, group, quiz) {
        this.name = name;
        this.group = group;
        this.quiz = quiz;
    }

    sendResult() {
        const host = '127.0.0.1';
        const port = 3000;
        const url = 'http://' + host + ':' + port + '/send';

        axios.post(url, {
            name: this.name,
            group: this.group,
            result: this.quiz.score,
            maxScore: this.quiz.maxScore,
            theme: this.quiz.theme,
        });
        }
    
}