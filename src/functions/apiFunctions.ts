import { AllData } from "@/types/types";
import { functions } from "./functions";
import { DeleteRequests, PostRequests } from "@/api/api";
import toast from "react-hot-toast";

const addTag = (
  tagInput: string,
  taskId: number,
  allData: AllData,
  setAllData: (data: AllData) => void
) => {
  switch (functions.doesTagExist(tagInput, allData.tags)) {
    case true:
      PostRequests.postTaskTagLink({
        tagId: allData.tags.find(
          (currentTask) => currentTask.tagName.slice(1) === tagInput
        )!.id,
        taskId: taskId,
      }).then((res) => {
        if (!res.ok) {
          setAllData(allData);
          toast.error("error adding tag");
        }
        functions.getAllData().then((data) => {
          setAllData(data);
          toast.success("sucessfully added tag");
        });
      });
      break;
    case false:
      PostRequests.postNewTag({ tagName: `#${tagInput}` }).then((newTag) => {
        PostRequests.postTaskTagLink({
          tagId: newTag.id,
          taskId: taskId,
        }).then((res) => {
          if (!res.ok) {
            setAllData(allData);
            toast.error("error adding tag");
          }
          functions.getAllData().then((data) => {
            setAllData(data);
            toast.success("sucessfully added tag");
          });
        });
      });
      break;
    default:
      break;
  }
};

const deleteTag = (
  tagInput: string,
  taskId: number,
  allData: AllData,
  setAllData: (data: AllData) => void
) => {
  switch (functions.isOnlyOneLink(tagInput, allData.tags, allData.taskTags)) {
    case true:
      DeleteRequests.deleteTaskTagLink(
        allData.taskTags.find((link) => {
          if (
            link.tagId ===
              allData.tags.find((tag) => tag.tagName.slice(1) === tagInput)!
                .id &&
            link.taskId === taskId
          ) {
            return link;
          }
        })!.id
      ).then((res) => {
        if (!res.ok) {
          setAllData(allData);
          toast.error("error deleting tag");
        }
        DeleteRequests.deleteTag(
          allData.tags.find((tag) => tag.tagName.slice(1) === tagInput)!.id
        ).then((res) => {
          if (!res.ok) {
            setAllData(allData);
            toast.error("error deleting tag");
          }
          functions.getAllData().then((data) => {
            setAllData(data);
            toast.success("sucessfully deleted tag");
          });
        });
      });
      break;
    case false:
      DeleteRequests.deleteTaskTagLink(
        allData.taskTags.find((link) => {
          if (
            link.tagId ===
              allData.tags.find((tag) => tag.tagName.slice(1) === tagInput)!
                .id &&
            link.taskId === taskId
          ) {
            return link;
          }
        })!.id
      ).then((res) => {
        if (!res.ok) {
          setAllData(allData);
          toast.error("error deleting tag");
        }
        functions.getAllData().then((data) => {
          setAllData(data);
          toast.success("sucessfully deleted tag");
        });
      });
      break;
  }
};

export const apiFunctions = {
  addTag,
  deleteTag,
};
