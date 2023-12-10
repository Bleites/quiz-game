const questions = [
	{
		question: 'Qual é a capital do Brasil?',
		choices: ['Brasília', 'Rio de Janeiro', 'São Paulo', 'Salvador'],
		answer: 'Brasília',
	},
	{
		question: 'Qual é a capital da Argentina?',
		choices: ['Buenos Aires', 'Brasília', 'Lisboa', 'Paris'],
		answer: 'Buenos Aires',
	},
	{
		question: 'Qual é a capital da França?',
		choices: ['Roma', 'Madri', 'Paris', 'Londres'],
		answer: 'Paris',
	},
	{
		question: 'Qual é a capital da Espanha?',
		choices: ['Lisboa', 'Madri', 'Barcelona', 'Valência'],
		answer: 'Madri',
	},
	{
		question: 'Qual é a capital da Itália?',
		choices: ['Veneza', 'Milão', 'Roma', 'Nápoles'],
		answer: 'Roma',
	},
	{
		question: 'Qual é a capital do Canadá?',
		choices: ['Toronto', 'Vancouver', 'Ottawa', 'Montreal'],
		answer: 'Ottawa',
	},
	{
		question: 'Qual é a capital dos Estados Unidos?',
		choices: ['Nova York', 'Los Angeles', 'Chicago', 'Washington D.C.'],
		answer: 'Washington D.C.',
	},
	{
		question: 'Qual é a capital do Reino Unido?',
		choices: ['Liverpool', 'Manchester', 'Edimburgo', 'Londres'],
		answer: 'Londres',
	},
];

// selecionar os elementos
const questionElement = document.querySelector('#question');
const choiceElements = document.querySelectorAll('.choice');
const nextButton = document.querySelector('#next');
const scoreElement = document.querySelector('#score');
const wrongElement = document.querySelector('#wrong');
const container = document.querySelector('.quiz-container');

// variaveis globais

// para armazenar a pergunta em que estamos
let currentQuestion = 0;
// para armazenar as perguntas que acertamos
let score = 0;
// para armazenar as perguntas que erramos
let wrong = 0;
// para saber se a pergunta já foi respondida para passarmos para a próxima, quando isto for true, o button next fica activo
let answerChosed = false;

// functions

// função de carregar as perguntas
function loadQuestion() {
	// variavel declarada vai apontar para o array questions e chamar o valor 0 de currentQuestion
	const currentQuestionData = questions[currentQuestion];
	// vamos ao nosso elemento onde vai ser armazenada a pergunta e dizemos que o texto vai ser igual ao index da pergunta actual e só
	// queremos a propriedade pergunta
	questionElement.innerText = currentQuestionData.question;

	// aqui declaramos a variavel que vai apontar para as escolhas da pergunta actual //shuffle é para misturar as escolhas
	const choices = shuffleArray(currentQuestionData.choices);

	for (let i = 0; i < choiceElements.length; i++) {
		// cada elemento(button) de choices vai receber como texto o texto de cada choice por index(i)
		choiceElements[i].innerText = choices[i];
	}

	answerChosed = false;
}

// função de embaralhar respostas
function shuffleArray(array) {
	let currentIndex = array.length,
		temporaryValue,
		randomIndex;

	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

function checkAnswer(e) {
	if (answerChosed) return;

	answerChosed = true;

	// ou seja se onde clicamos (no button) o texto for igual a resposta certa armazenada em questions da pergunta actual
	if (e.target.innerText === questions[currentQuestion].answer) {
		// vamos dar score;
		score++;
		scoreElement.innerText = `Pontuação: ${score}`;
		alert('Correto!');
	} else {
		// vamos dar ponto negativo;
		wrong++;
		wrongElement.innerText = `Errou: ${wrong}`;
		alert(`Errado, a resposta correta é ${questions[currentQuestion].answer}`);
	}
}

choiceElements.forEach((btn) => btn.addEventListener('click', checkAnswer));

nextButton.addEventListener('click', () => {
	if (!answerChosed) {
		alert('Por favor, responda a pergunta !');
		return;
	}

	currentQuestion++;
	nextButton.style.backgroundColor = 'Blue';

	if (currentQuestion < questions.length) {
		loadQuestion();
	} else {
		let divFim = document.createElement('div');
		divFim.innerHTML = `Fim do jogo parabens o seu resultado foi ${score} perguntas certas e ${wrong} perguntas erradas. `;
		container.appendChild(divFim);
	}
});

loadQuestion();
