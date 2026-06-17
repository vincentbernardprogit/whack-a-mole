const preloader = document.querySelector(".preloader")
const confirmationButton = document.querySelector(".confirmation-button")
const groundHoles = document.querySelectorAll('.ground-hole')
const moles = document.querySelectorAll('.mole')
const highScore = document.querySelector('.high-score')
const pop = document.querySelector('#pop')

let previousGroundHole, gameOver, score

function setConfirmationButtonActive(){
	setTimeout(() => {
		confirmationButton.classList.remove("inactive")
	}, 3000)
}

addEventListener("load", setConfirmationButtonActive)

function clickConfirmationButton(){
	preloader.classList.add("disappear")
}

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
	currentGroundHole.classList.add('appear')

	setTimeout(() => {
		currentGroundHole.classList.remove('appear')
		if (!gameOver) {
			summonMole()
		}
	}, currentMoleAppearanceDuration)
}

function hitMole() {
	score++
	pop.play()
	this.parentNode.classList.remove('appear')
	highScore.textContent = score
}

moles.forEach(mole => {
  	mole.addEventListener('click', hitMole)
})