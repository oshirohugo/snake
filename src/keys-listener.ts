export type ControllerParams = {
  onStart: () => void;
  onLeft: () => void;
  onUp: () => void;
  onRight: () => void;
  onDown: () => void;
};

class KeysListener {
  constructor(private callBacks: ControllerParams) {}

  listen() {
    document.addEventListener("keydown", (e) => {
      switch (e.keyCode) {
        case 83: // s
          this.callBacks.onStart();
          break;
        case 37: // left
          this.callBacks.onLeft();
          break;
        case 38: // up
          this.callBacks.onUp();
          break;
        case 39: // right
          this.callBacks.onRight();
          break;
        case 40: // down
          this.callBacks.onDown();
          break;
      }
      e.preventDefault();
    });
  }
}

export default KeysListener;
