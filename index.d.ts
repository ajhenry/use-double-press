interface Props {
    onPress?: (...args: any[]) => void;
    onDoublePress?: (...args: any[]) => void;
    delay?: number;
}
declare const _default: (props: Props) => (...args: any[]) => void;
export default _default;
