import {
    incrementCustomProperty,
    setCustomProperty,
    getCustomProperty,
  } from "./updateCustomProperty.js"
  
  const dogElem = document.querySelector("[data-dog]")
  const JUMP_SPEED = 0.45
  const GRAVITY = 0.00115
  const DOG_FRAME_COUNT = 2
  const FRAME_TIME = 100
  
  let isJumping
  let dogFrame
  let currentFrameTime
  let yVelocity
  export function setupDog() {
    isJumping = false
    dogFrame = 0
    currentFrameTime = 0
    yVelocity = 0
    setCustomProperty(dogElem, "--bottom", 0)
    document.removeEventListener("keydown", onJump)
    document.addEventListener("keydown", onJump)
  }
  
  export function updateDog(delta, speedScale) {
    handleRun(delta, speedScale)
    handleJump(delta)
  }
  
  export function getDogRect() {
    return dogElem.getBoundingClientRect()
  }
  
  export function setDogLose() {
    dogElem.src = "images/dog-lose.png"
  }
  
  function handleRun(delta, speedScale) {
    if (isJumping) {
      dogElem.src = `images/dog-stationary.png`
      return
    }
  
    if (currentFrameTime >= FRAME_TIME) {
      dogFrame = (dogFrame + 1) % DOG_FRAME_COUNT
      dogElem.src = `images/dog-run-${dogFrame}.png`
      currentFrameTime -= FRAME_TIME
    }
    currentFrameTime += delta * speedScale
  }
  
  function handleJump(delta) {
    if (!isJumping) return
  
    incrementCustomProperty(dogElem, "--bottom", yVelocity * delta)
  
    if (getCustomProperty(dogElem, "--bottom") <= 0) {
      setCustomProperty(dogElem, "--bottom", 0)
      isJumping = false
    }
  
    yVelocity -= GRAVITY * delta
  }
  
  function onJump(e) {
    if (e.code !== "Space" || isJumping) return
  
    yVelocity = JUMP_SPEED
    isJumping = true
  }
