import { Student } from '../classes/Student.js';

function initDragDrop() {
	let dragP;

	document.addEventListener("dragstart", function (event) {
		dragP = event.target;
		event.target.classList.add("dragstart");
	});

	document.addEventListener("drag", function (event) {

	});

	document.addEventListener("dragend", function (event) {
		event.target.classList.remove("dragstart");
	});


	document.addEventListener("dragenter", function (event) {
		if (event.target.className == "droptarget") {
			event.target.classList.add("dragover");
		}
	});

	document.addEventListener("dragover", function (event) {
		event.preventDefault();
	});

	document.addEventListener("dragleave", function (event) {
		if (event.target.className == "droptarget dragover") {
			if(event.target.childElementCount == 0) {
				event.target.classList.remove("dragover");
			}
		}
	});

	document.addEventListener("drop", function (event) {
		event.preventDefault();
		let targetElem = event.target;
		let parent = targetElem.parentNode;
		if(parent.className == "droptarget dragover") {
			targetElem = parent;
		}

		if (targetElem.className == "droptarget dragover") {
			if (targetElem.childElementCount != 0) {
				let childP = targetElem.getElementsByTagName("p")[0];
				let question = targetElem.parentNode.parentNode;
				question.getElementsByClassName("quiz__body")[0].appendChild(childP);
			}
			targetElem.setAttribute("index", dragP.getAttribute("index"));
			targetElem.innerHTML = "";
			targetElem.appendChild(dragP);
		}

	});
}

function fillQuestion(body, head, answers, type, questionIndex) {

	if (type == "select") {
		let select = document.createElement("select");
		answers.forEach((answer, index) => {
			let option = document.createElement("option");
			option.setAttribute("value", index);
			option.innerHTML = answer.text;
			select.appendChild(option);
		});
		body.appendChild(select);
	} else if (type == "input") {
		let button = document.createElement("input");
		button.setAttribute("class", "answer custom-" + type);
		button.setAttribute("name", "question" + questionIndex);
		button.type = type;
		body.appendChild(button);
	} else if (type == "drag&drop") {
		head.innerHTML = head.innerHTML.replace("__", "<div class=\"droptarget\">&nbsp;</div>");
		answers.forEach((answer, index) => {
			let element = document.createElement("p");
			element.setAttribute("draggable", true);
			element.setAttribute("index", index);
			element.setAttribute("class", "dragtarget");
			element.innerHTML = answer.text;
			body.appendChild(element);
		});
		initDragDrop();
	} else {
		answers.forEach((answer, index) => {
			let button = document.createElement("input");
			let id = type+index+questionIndex;
			button.setAttribute("class", "answer custom-" + type);

			button.setAttribute("index", index);
			button.setAttribute("id", id);
			button.setAttribute("name", "question" + questionIndex);
			button.type = type;

			let label = document.createElement("label");
			label.setAttribute("for", id);
			label.innerHTML = answer.text;

			let wrapper = document.createElement("div");
			wrapper.setAttribute("class", "answer-wrapper");
			wrapper.appendChild(button);
			wrapper.appendChild(label);

			body.appendChild(wrapper);
		});
	}
}

function showTab(questions, index) {
	questions[index].style.display = "";
}

function initSteps(questions) {
	const pagesElem = document.getElementById("pages");
	const prev = document.getElementById("prev");
	const next = document.getElementById("next");
	const submit = document.getElementById("submit");

	let currentTab = 0;

	if (currentTab >= questions.length - 1) {
		next.style.display = "none";
		submit.style.display = "";
	}

	next.addEventListener("click", e => {
		questions[currentTab++].style.display = "none";
		if (currentTab >= questions.length - 1) {
			next.style.display = "none";
			submit.style.display = "";
		}

		if (currentTab != 0) {
			prev.style.display = "";
		}
		showTab(questions,currentTab);
		pagesElem.innerHTML = (currentTab + 1) + " / " + questions.length;
	});

	prev.addEventListener("click", e => {
		questions[currentTab--].style.display = "none";
		if (currentTab < questions.length - 1) {
			next.style.display = "";
			submit.style.display = "none";
		}
		if (currentTab == 0) {
			prev.style.display = "none";
		}
		showTab(questions, currentTab);
		pagesElem.innerHTML = (currentTab + 1) + " / " + questions.length;
	});

	pagesElem.innerHTML = (currentTab + 1) + " / " + questions.length;
}

function showResult(quiz, form) {
	let result = quiz.getResult();

	form.innerHTML = "";
	let resultDiv = document.createElement("div");
	resultDiv.setAttribute("class", "reload");
	resultDiv.innerHTML = "Результат: " + quiz.score + "/" + quiz.maxScore;


	let reload = document.createElement("a");
	reload.setAttribute("class", "button");
	reload.setAttribute("href", "");
	reload.innerHTML = "Reload";

	form.appendChild(resultDiv);
	form.appendChild(reload);

}

export function init(quiz) {

	const questionsTab = document.getElementById("questions");
	const questions = document.getElementsByClassName("question");
	const form = document.getElementById("quiz");

	const enterButton = document.getElementById("enter");
	enterButton.addEventListener("click", e => {
		const regForm = document.getElementById("registration");
		regForm.style.display = "none";

		const quizDiv = document.getElementById("quizDiv");
		quizDiv.style.display = "block";
	});

	quiz.questions.forEach((question, index) => {

		let questionDiv = document.createElement("div");
		questionDiv.setAttribute("index", index);
		questionDiv.setAttribute("type", question.type);
		questionDiv.setAttribute("class", "question");
		
		questionDiv.style.display = index == 0 ? "" : "none";

		let quizHead = document.createElement("div");
		quizHead.setAttribute("class", "quiz__head");
		quizHead.innerHTML = question.text;

		let quizBody = document.createElement("div");
		quizBody.setAttribute("class", "quiz__body");

		fillQuestion(quizBody, quizHead, question.answers, question.type, index);

		questionDiv.appendChild(quizHead);
		questionDiv.appendChild(quizBody);
		questionsTab.appendChild(questionDiv);
	});

	form.addEventListener("submit", e => {
		e.preventDefault();
		let resultArray = [];
		for(let question of questions) {
			let index = question.getAttribute("index");
			let type = question.getAttribute("type");
			let answers = question.getElementsByClassName("answer");
			if(type == "input") {
				resultArray[index] = answers[0].value;
			} else if(type == "drag&drop") {
				let answer = question.getElementsByClassName("droptarget")[0];
				resultArray[index] = parseInt(answer.getAttribute("index"));
			} else if(type == "select") {
				let select = question.getElementsByTagName("select")[0];
				resultArray[index] = parseInt(select.selectedIndex);
			} else {
				let answerArray = [];
				for(let answer of answers) {
					answerArray.push(answer.checked);
				}
				resultArray[index] = answerArray;
			}
		}
		
		quiz.checkResult(resultArray);

		const name = document.getElementById("name").value;
		const group = document.getElementById("group").value;

		const student = new Student(name, group, quiz);
		
		student.sendResult();

		showResult(quiz, form);

	});
	
	initSteps(questions);
}
