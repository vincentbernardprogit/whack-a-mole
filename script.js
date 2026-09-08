const preloader = document.querySelector(".preloader")
const confirmationButton = document.querySelector(".confirmation-button")
const groundHoles = document.querySelectorAll('.ground-hole')
const moles = document.querySelectorAll('.mole')
const coneheadMoles = document.querySelectorAll(".conehead-mole")
const highScore = document.querySelector('.high-score')
const pop = document.querySelector('#pop')

let previousGroundHole, gameOver, score, moleHitCount = 0

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
	
	const appearIndex = Math.floor(Math.random() * 2)
	let appear
	if(appearIndex == 0) appear = "mole-appear"
	if(appearIndex == 1) appear = "conehead-mole-appear"
	currentGroundHole.classList.add(appear)

	setTimeout(() => {
		currentGroundHole.classList.remove(appear)
		if (!gameOver) summonMole()
	}, currentMoleAppearanceDuration)
}

function hitMole() {
	if (this.parentNode.className == "ground-hole") score += 0
	else score++
	pop.play()
	this.parentNode.classList.remove("mole-appear")
	highScore.textContent = score
}

function hitConeheadMole() {
	moleHitCount++
	if(moleHitCount == 1){
		pop.play()
		this.style.backgroundImage = "url(images/mole.png)"
		this.style.backgroundSize = "60%"
		this.style.backgroundRepeat = "no-repeat"
	}
	else if(moleHitCount == 2){
		score++
		pop.play()
		this.parentNode.classList.remove("conehead-mole-appear")
		highScore.textContent = score
		moleHitCount = 0
	}
}

moles.forEach(mole => {mole.addEventListener("click", hitMole)})

coneheadMoles.forEach(coneheadMole => {coneheadMole.addEventListener("click", hitConeheadMole)})