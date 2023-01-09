function showResult(resultDiv, text) {
    resultDiv.innerHTML = text;
}

// Завдання 2.3.1
function UserObject(surname, name) {
    this.surname = surname;
    this.name = name;
}

const userObject = new UserObject();

function task231() {
    const task = document.getElementById("task231");

    const result = task.querySelector("#result");

    const name = task.querySelector("#user-name").value;
    const surname = task.querySelector("#user-surname").value;

    if( name == "" || surname == "" ) {
        alert("Please enter a name and surname.");
        return;
    }

    userObject.name = name;
    userObject.surname = surname;


    showResult(result, JSON.stringify(userObject));

}

// Завдання 2.3.2
function StudentObject() {

    this.setSpec = function (spec) {
        this.spec = spec
    }

    this.setGroup = function (group) {
        this.group = group
    }

    this.deleteSpec = function () {
        this.spec = null;
    }

    this.deleteGroup = function () {
        this.group = null;
    }

}
const studentObject = new StudentObject();

function task232() {
    const task = document.getElementById("task232");

    const result = task.querySelector("#result");

    const spec = task.querySelector("#student-speciality").value;
    const group = task.querySelector("#student-group").value;

    if( spec == "" || group == "" ) {
        alert("Please enter a speciality and group.");
        return;
    }

    studentObject.setSpec(spec);
    studentObject.setGroup(group);
    
    showResult(result, JSON.stringify(studentObject));

    const deleteButton = document.getElementById("deleteButton");

    deleteButton.addEventListener("click", (e) => {
        studentObject.deleteSpec();
        studentObject.deleteGroup();
        showResult(result, JSON.stringify(studentObject));
    });
}

// Завдання 2.3.3
function task233() {
    const task = document.getElementById("task233");

    const result = task.querySelector("#result");

    const copyObject = Object.assign({}, userObject, studentObject);

    showResult(result, JSON.stringify(copyObject));
}


// Завдання 2.3.4
function task234() {
    const task = document.getElementById("task234");

    const result = task.querySelector("#result");

    StudentObject.prototype.showData = function (){
        const message = `Спеціальність: ${this.spec} Група: ${this.group}`;
        showResult(result, message);
    };

    studentObject.showData();
}

// Завдання 2.3.5
function task235() {
    const task = document.getElementById("task235");

    const result = task.querySelector("#result");

    const test = task.querySelector("#test").value;
    const attempts = task.querySelector("#attempts").value;
    const score = task.querySelector("#score").value;

    if( test == "" || attempts == "" || score == "") {
        alert("Please enter data.");
        return;
    }
    if(isNaN(attempts) || isNaN(score)) {
        alert("Attempts and score must be a number.");
        return;
    }

    const successObject = { 
        test, attempts, score,
        calculateAverageScore() {
            this.averageScore = this.score / this.attempts;
        }
    }

    //наслідуємо властивості і методи об’єкту «Студент»
    successObject.__proto__ = studentObject;

    //перевизначаємо в об’єкті «Успішність» метод «Показати дані».
    const showData = function() {
        const message = `Тест: ${this.test} Спроби: ${this.attempts} Середня оцінка: ${this.averageScore} Спеціальність: ${this.spec} Група: ${this.group}`;
        showResult(result, message);
    }
    successObject.showData = showData.bind(successObject);

    successObject.calculateAverageScore();

    successObject.showData();

}


// Завдання 2.3.6
class Student {
    set spec(value) {
        if(value == "") {
            return;
        }
        this._spec = value;
    }

    get spec() {
        return this._spec;
    }

    set group(value) {
        if(value == "") {
            return;
        }
        this._group = value;
    }

    get group() {
        return this._group;
    }

    showData(result) {
        const message = `Спеціальність: ${this._spec} Група: ${this._group}`;
        showResult(result, message);
    }
}

class Success extends Student {
    set test(value) {
        if(value == "") {
            return;
        }
        this._test = value;
    }

    get test() {
        return this._test;
    }

    set attempts(value) {
        if(isNaN(value)) {
            this._attempts = 0;
        } else {
            this._attempts = value;
        }
    }

    get attempts() {
        return this._attempts;
    }

    set score(value) {
        if(isNaN(value)) {
            this._score = 0;
        } else {
            this._score = value;
        }
    }

    get score() {
        return this._score;
    }

    get average() {
        return this._score / this._attempts;
    }

    showData(result) {
        const message = `Тест: ${this._test} Спроби: ${this._attempts} Середня оцінка: ${this.average} Спеціальність: ${this._spec} Група: ${this._group}`;
        showResult(result, message);
    }
}

function task236() {
    const task = document.getElementById("task236");

    const result = task.querySelector("#result");

    const successObject = new Success();

    successObject.test = "Назва тесту";
    successObject.attempts = 10;
    successObject.score = 100;
    successObject.spec = "122";
    successObject.group = "TR-13";

    successObject.showData(result);
    
}