import type { Tag as ITag } from "#types/tag.types.ts";
import { clsx } from "clsx";
import { FC } from "react";
import styles from "./Tag.module.scss";
import { Text } from "#ui";

interface TagProps extends ITag {
  className?: string;
  onClick?: (tag: ITag) => void;
}
export const Tag: FC<TagProps> = ({ className, name, id, onClick }) => {
  return (
    <div className={clsx(styles.tag, onClick && styles.clickable, className)}>
      <Text onClick={() => onClick?.({ name, id })}>{name}</Text>
    </div>
  );
};
