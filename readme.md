# use-double-press

A react native hook for enabling _both_ single and double press in native `Pressable` and `Touchable` components

[NPM](https://www.npmjs.com/package/use-double-press)

## Install

```sh
yarn add use-double-press

npm install use-double-press
```

See a copy-pastable hook below

## Usage

```jsx
import React from "react";
import { Pressable } from "react-native";
import usePress from "use-double-press";

const DoublePress = () => {
  const pressHandler = usePress({
    onPress: () => console.log("Single Press"),
    onDoublePress: () => console.log("Double Press"),
    delay: 200,
  });

  return <Pressable onPress={pressHandler}></Pressable>;
};
```

## Props

| Property      | Type     | Default | Description                     |
| ------------- | -------- | ------- | ------------------------------- |
| delay         | number   | 200     | Time for delay between taps     |
| onPress       | function | null    | callback for single press event |
| onDoublePress | function | null    | callback for double press event |

## Raw Hook

JavaScript

```jsx
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
```

TypeScript

```tsx
interface Props {
  onPress?: (...args: any[]) => void;
  onDoublePress?: (...args: any[]) => void;
  delay?: number;
}

export default (props: Props): ((...args: any[]) => void) => {
  const delayTime = props.delay ?? 200;
  let pressCount = 0;
  let lastTime = new Date().getTime();
  let timer: NodeJS.Timeout | undefined;
  let now = new Date().getTime();

  return (...args: any[]) => {
    if (pressCount === 0) {
      pressCount = 1;

      timer = setTimeout(() => {
        props.onPress?.(...args);
        pressCount = 0;
        timer = undefined;
      }, delayTime);

      lastTime = now;
    } else {
      if (now - lastTime < delayTime) {
        timer && clearTimeout(timer);
        props.onDoublePress?.(...args);
        pressCount = 0;
      }
    }
  };
};
```

## License

MIT
