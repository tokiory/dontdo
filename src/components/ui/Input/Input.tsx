import {
  ChangeEventHandler,
  forwardRef,
  HTMLProps,
  MutableRefObject,
  ReactNode,
  useRef,
} from "react";
import styles from "./Input.module.scss";

interface InputProps extends HTMLProps<HTMLInputElement> {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  preSlot?: ReactNode;
  postSlot?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, postSlot, preSlot, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const actualRef = (ref || inputRef) as MutableRefObject<HTMLInputElement>;

    const handleFocus = () => {
      if (actualRef.current) {
        actualRef.current.focus();
      }
    };

    return (
      <div onClick={handleFocus} className={styles.wrapper}>
        {preSlot}
        <input
          ref={actualRef}
          onChange={onChange}
          value={value}
          {...props}
          className={styles.input}
        />
        {postSlot}
      </div>
    );
  },
);
