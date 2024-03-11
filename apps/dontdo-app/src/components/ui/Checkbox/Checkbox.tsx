import { Icon } from "@iconify/react";
import {
  ChangeEventHandler,
  forwardRef,
  MutableRefObject,
  useRef,
} from "react";
import styles from "./Checkbox.module.scss";

interface CheckboxProps {
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ checked, onChange }, ref) => {
    const nativeCheckboxRef = useRef<HTMLInputElement>(null);

    const actualNativeCheckboxRef = (ref ||
      nativeCheckboxRef) as MutableRefObject<HTMLInputElement>;

    const handleClick = () => {
      if (!actualNativeCheckboxRef.current) {
        return;
      }
      actualNativeCheckboxRef.current.click();
    };

    return (
      <div onClick={handleClick} className={styles.checkbox}>
        {checked && <Icon icon="gravity-ui:check" />}
        <input
          ref={actualNativeCheckboxRef}
          checked={checked}
          onChange={onChange}
          className={styles.nativeCheckbox}
          type="checkbox"
        />
      </div>
    );
  },
);
