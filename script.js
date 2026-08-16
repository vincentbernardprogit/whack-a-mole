const groundHoles = document.querySelectorAll(".ground-hole")
const moles = document.querySelectorAll(".mole")
const snakes = document.querySelectorAll(".snake")
const highScore = document.querySelector(".high-score")
const pop = document.querySelector("#pop")

let previousGroundHole, gameOver, score

function start() {
	gameOver = false
	score = 0
	highScore.textContent = 0
	summonMole()
	setTimeout(() => {
		gameOver = true
		alert("Time's up!")
	}, 20000)
}

function selectGroundHole(groundHoles) {
	const groundHole = Math.floor(Math.random() * groundHoles.length)
	const currentGroundHole = groundHoles[groundHole]
	if (currentGroundHole == previousGroundHole) selectGroundHole(groundHoles)
	previousGroundHole = currentGroundHole
	return currentGroundHole
}

function setMoleAppearanceDuration(min, max) {
  	return Math.round(Math.random() * (max - min) + min)
}

function summonMole() {
	const currentGroundHole = selectGroundHole(groundHoles)
	const currentMoleAppearanceDuration = setMoleAppearanceDuration(1000, 5000)

	const appearIndex = Math.floor(Math.random() * 2)
	let appear
	if (appearIndex == 0) appear = "mole-appear"
	if (appearIndex == 1) appear = "snake-appear"
	currentGroundHole.classList.add(appear)

	setTimeout(() => {
		currentGroundHole.classList.remove(appear)
		if (!gameOver) summonMole()
	}, currentMoleAppearanceDuration)
}

function hitMole() {
	score++
	pop.play()
	this.parentNode.classList.remove("mole-appear")
	highScore.textContent = score
}

function hitSnake() {
	score--
	pop.play()
	this.parentNode.classList.remove("snake-appear")
	if (score <= 0) highScore.textContent = 0
	else highScore.textContent = score
}

moles.forEach(mole => {mole.addEventListener("click", hitMole)})

snakes.forEach(snake => {snake.addEventListener("click", hitSnake)})