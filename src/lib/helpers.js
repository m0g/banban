export function clickOutside(element, callbackFunction) {
  function onClick(event) {
    if (!element.contains(event.target)) {
      callbackFunction();
    }
  }

  document.body.addEventListener('click', onClick);

  return {
    update(newCallbackFunction) {
      callbackFunction = newCallbackFunction;
    },
    destroy() {
      document.body.removeEventListener('click', onClick);
    }
  };
}

export function longpress(node, eventName = 'long') {
  // console.log(node);
  const TIME_MS = 100;
  let timeoutPtr;

  // TODO: there is an infinite loop in there
  function handleMouseDown(e) {
    e.stopPropagation();
    console.log('touch down', eventName);
    window.addEventListener('touchmove', handleMoveBeforeLong);
    timeoutPtr = window.setTimeout(() => {
      // console.log('looooong press!');
      window.removeEventListener('touchmove', handleMoveBeforeLong);
      node.dispatchEvent(new CustomEvent(eventName));
      // TODO - ideally make this not trigger long press again
      window.setTimeout(() => node.dispatchEvent(e), 0);
    }, TIME_MS);
  }

  function handleMoveBeforeLong(e) {
    console.log('handle before long');
    window.clearTimeout(timeoutPtr);
    window.removeEventListener('touchmove', handleMoveBeforeLong);
  }

  function handleMouseUp(e) {
    window.clearTimeout(timeoutPtr);
    window.removeEventListener('touchmove', handleMoveBeforeLong);
  }

  // node.addEventListener('mousedown', handleMouseDown);
  // node.addEventListener('mouseup', handleMouseUp);
  node.addEventListener('touchstart', handleMouseDown);
  node.addEventListener('touchend', handleMouseUp);

  return {
    destroy: () => {
      node.removeEventListener('touchstart', handleMouseDown);
      node.removeEventListener('touchend', handleMouseUp);
    }
  };
}
