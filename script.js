const preloader = document.querySelector(".preloader")
const confirmationButton = document.querySelector(".confirmation-button")
const groundHoles = document.querySelectorAll(".ground-hole")
const moles = document.querySelectorAll(".mole")
const coneheadMoles = document.querySelectorAll(".conehead-mole")
const bucketheadMoles = document.querySelectorAll(".buckethead-mole")
const snakes = document.querySelectorAll(".snake")
const highScore = document.querySelector(".high-score")
const pop = document.querySelector("#pop")

let previousGroundHole, gameOver, score, coneheadMoleHitCount = 0, bucketheadMoleHitCount = 0

function setConfirmationButtonActive() {
	setTimeout(() => {
		confirmationButton.classList.remove("inactive")
	}, 3000)
}

addEventListener("load", setConfirmationButtonActive)

function clickConfirmationButton() {
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

	const appearIndex = Math.floor(Math.random() * 4)
	let appear
	if (appearIndex == 0) appear = "mole-appear"
	if (appearIndex == 1) appear = "conehead-mole-appear"
	if (appearIndex == 2) appear = "buckethead-mole-appear"
	if (appearIndex == 3) appear = "snake-appear"
	currentGroundHole.classList.add(appear)

	setTimeout(() => {
		currentGroundHole.classList.remove(appear)
		if (!gameOver) summonMole()
	}, currentMoleAppearanceDuration)
}

function hitMole() {
	if (this.parentNode.className == "ground-hole") score += 0
	else if (this.parentNode.classList == "ground-hole mole-appear") {
		score++
		pop.play()
		this.parentNode.classList.remove("mole-appear")
		highScore.textContent = score
	}
}

function hitConeheadMole() {
	if (this.parentNode.className == "ground-hole") score += 0
	else if (this.parentNode.classList == "ground-hole conehead-mole-appear") {
		coneheadMoleHitCount++
		if (coneheadMoleHitCount == 1) {
			pop.play()
			this.style.backgroundImage = "url(images/mole.png)"
			this.style.backgroundSize = "60%"
			this.style.backgroundRepeat = "no-repeat"
		}
		else if (coneheadMoleHitCount == 2) {
			score++
			pop.play()
			this.parentNode.classList.remove("conehead-mole-appear")
			highScore.textContent = score
			coneheadMoleHitCount = 0
		}
	}
}
  
function hitBucketheadMole() {
	if (this.parentNode.className == "ground-hole") score += 0
	else if (this.parentNode.classList == "ground-hole buckethead-mole-appear") {
		bucketheadMoleHitCount++
		if (bucketheadMoleHitCount == 1) {
			pop.play()
			this.style.backgroundImage = "url(images/buckethead_mole_hit.png)"
			this.style.backgroundSize = "50%"
			this.style.backgroundRepeat = "no-repeat"
		}
		else if (bucketheadMoleHitCount == 2) {
			pop.play()
			this.style.backgroundImage = "url(images/mole.png)"
			this.style.backgroundSize = "60%"
			this.style.backgroundRepeat = "no-repeat"
		}
		else if (bucketheadMoleHitCount == 3) {
			score++
			pop.play()
			this.parentNode.classList.remove("buckethead-mole-appear")
			highScore.textContent = score
			bucketheadMoleHitCount = 0
		}
	}
}
  
function hitSnake() {
	if (this.parentNode.className == "ground-hole") score += 0
	else if (this.parentNode.classList == "ground-hole snake-appear") {
		score--
		pop.play()
		this.parentNode.classList.remove("snake-appear")
		if (score <= 0) highScore.textContent = 0
		else highScore.textContent = score
	}
}

moles.forEach(mole => {mole.addEventListener("click", hitMole)})

coneheadMoles.forEach(coneheadMole => {coneheadMole.addEventListener("click", hitConeheadMole)})

bucketheadMoles.forEach(bucketheadMole => {bucketheadMole.addEventListener("click", hitBucketheadMole)})

snakes.forEach(snake => {snake.addEventListener("click", hitSnake)})