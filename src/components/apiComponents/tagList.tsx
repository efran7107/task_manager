import { Tag, Task } from "@/types/types";
import { useUser } from "../componentsProvider/UserProvider";
import { functions } from "@/functions/functions";
import toast from "react-hot-toast";

export const TagList = ({
  id,
  label,
  className,
  tagList,
  tagInput,
  setTagInput,
  task,
}: {
  id: string;
  label: string;
  className: string;
  tagList: Tag[];
  tagInput: string;
  setTagInput: (tagInput: string) => void;
  task: Task;
}) => {
  const { updateTags } = useUser();
  return (
    <div className={className}>
      <label id={id}>{label}: </label>
      <input
        type="text"
        name={id}
        id={id}
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
      />
      <button
        disabled={
          functions.disableButton(tagList, tagInput) === "delete" ||
          functions.disableButton(tagList, tagInput) === "not-enough"
        }
        onClick={() => {
          updateTags(tagInput, task.id, "add");
          setTagInput("");
          toast.success("tag added");
        }}
      >
        add
      </button>
      <button
        disabled={
          functions.disableButton(tagList, tagInput) === "add" ||
          functions.disableButton(tagList, tagInput) === "not-enough"
        }
        onClick={() => {
          updateTags(tagInput, task.id, "delete");
          setTagInput("");
          toast.success("tag deleted");
        }}
      >
        delete
      </button>
    </div>
  );
};
