export default (props) => {
  const { onDoublePress, onPress, delay } = props;
  const delayTime = delay || 200;
  let pressCount = 0;
  let lastTime = new Date().getTime();
  let timer;
  let now = new Date().getTime();

  return (...args) => {
    if (pressCount === 0) {
      pressCount = 1;

      timer = setTimeout(() => {
        onPress && onPress(...args);
        pressCount = 0;
        timer = undefined;
      }, delayTime);

      lastTime = now;
    } else {
      if (now - lastTime < delayTime) {
        timer && clearTimeout(timer);
        onDoublePress && onDoublePress(...args);
        pressCount = 0;
      }
    }
  };
};
