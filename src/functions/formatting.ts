import { Tag } from "../types/objectTypes";

const formatName = (name: string): string => {
  return name.slice(0, 1).toUpperCase() + name.slice(1).toLocaleLowerCase();
};

const filterTags = (tags: Tag[], newTagInput: string): Tag[] => {
  const strLeng = newTagInput.length;
  if (strLeng === 1) {
    return tags;
  }
  const newfilter = tags.filter(
    (tag) => tag.tag.slice(0, strLeng) === newTagInput
  );
  return newfilter;
};

export const format = {
  formatName,
  filterTags,
};
