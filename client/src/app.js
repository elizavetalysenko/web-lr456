import { Question } from './classes/Question.js';
import { Answer } from './classes/Answer.js';
import { Result } from './classes/Result.js';
import { Quiz } from './classes/Quiz.js';
import { init } from './tools/init.js';
import { shuffle } from './tools/shuffle.js';

const questions = 
[
	new Question("__: \"none\"",
    [
		new Answer("display", 1),
		new Answer("position", 0),
		new Answer("flex", 0),
		new Answer("color", 0)
	], "drag&drop"),

	new Question("Вкажіть властивість стилю position:", 
	[
		new Answer("fixed", 0.5),
		new Answer("block", 0),
		new Answer("static", 0.5),
		new Answer("top", 0)
	], "checkbox"),

	new Question("Які із CSS-селекторів є селекторами за атрибутом id HTML-елемента?", 
	[
		new Answer("!div", 0),
		new Answer(".div", 0),
		new Answer("div", 0),
		new Answer("#div", 1)
	], "select"),

	new Question("Яка CSS властивість використовується для зміни фонового кольору?(Приклад вводу: margin)", 
	[
		new Answer("background-color", 1),
	], "input"),

	new Question("Який стиль відповідає за прозорість?", 
	[
		new Answer("z-index", 0),
		new Answer("opacity", 1),
		new Answer("rgba", 0),
		new Answer("font-weight", 0)
	], "radio"),

	new Question("Який атрибут HTML використовується для встановлення вбудованого стилю елемента ?", 
	[
		new Answer("font", 0),
		new Answer("in-style", 0),
		new Answer("style", 1),
		new Answer("class", 0)
	], "radio"),

	new Question("Яка CSS властивість контролює розмір тексту?", 
	[
		new Answer("font-size", 1),
		new Answer("text-height", 0),
		new Answer("text-size", 0),
		new Answer("text-style", 0)
	], "select"),

	new Question("Як змінити нижнє поле елемента?", 
	[
		new Answer("down-margin", 0),
		new Answer("margin-down", 0),
		new Answer("margin-bottom", 1),
		new Answer("bottom-margin", 0)
	], "radio"),

	new Question("text-align: __",
    [
		new Answer("top", 0),
		new Answer("bottom", 0),
		new Answer("center", 1),
		new Answer("side", 0)
	], "drag&drop"),

	new Question("Яким символом позначається селектор по класу ?", 
	[
		new Answer(".", 1),
	], "input"),

];

const results = 
[
	new Result("Ви повнинй нуль", 0),
	new Result("Ви трішки розбираєтесь", 3),
	new Result("Середній клас", 6),
	new Result("Ви досконало знаєте тему", 10)
];

const theme = "Стилі CSS.";

const quiz = new Quiz(theme,shuffle(questions), results);

init(quiz);

