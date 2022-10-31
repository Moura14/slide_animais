export default class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
    this.dis = {
      finalPosition: 0,
      startX: 0,
      movement: 0,
    };
  }

  moveSlide(disX) {
    this.dis.movePosition = disX;
    this.slide.style.transform = `translate3d(${disX}px,0, 0)`;
  }

  upadtePosition(clientX) {
    this.dis.movement = (this.dis.startX - clientX) * 1.6;
    return this.dis.finalPosition - this.dis.movement;
  }

  onStart(event) {
    event.preventDefault();
    this.dis.startX = event.clientX;
    this.wrapper.addEventListener("mousemove", this.onMove);
  }

  onMove(event) {
    const finalPosition = this.upadtePosition(event.clientX);
    this.moveSlide(finalPosition);
  }

  onEnd(event) {
    this.wrapper.removeEventListener("mousemove", this.onMove);
    this.dis.finalPosition = this.dis.movePosition;
  }

  addSlideEvents() {
    this.wrapper.addEventListener("mousedown", this.onStart);
    this.wrapper.addEventListener("mouseup", this.onEnd);
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  init() {
    this.bindEvents();
    this.addSlideEvents();
    return this;
  }
}
