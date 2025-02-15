const local = "http://localhost:3000/";
const header = { "Content-type": "application/json" };
const request = {
  method: "",
  headers: header,
  body: {},
};

const getRequests = {
  getDataInfo: (cat: string) =>
    fetch(`${local}${cat}`).then((res) => res.json()),
  getSingleData: (cat: string, key: string, value: string | number) =>
    fetch(`${local}${cat}?${key}=${value}`)
      .then((res) => res.json())
      .then((dataArr) => dataArr[0]),
  getFilteredData: (cat: string, key: string, value: string | number) =>
    fetch(`${local}${cat}?${key}=${value}`).then((res) => res.json()),
  getMultipleFilterData: (cat: string, key1: string, val1: string | number, key2: string, val2: string | number) =>
    fetch(`${local}${cat}?${key1}=${val1}&${key2}=${val2}`).then(res => res.json())
  
  
};

const postRequests = {
  addData: (cat: string, data: object) => {
    const raw = JSON.stringify(data);
    return fetch(`${local}${cat}`, {
      ...request,
      method: "POST",
      body: raw,
    }).then((res) => res.json());
  },
};

const patchRequests = {
  editData: (cat: string, data: object, id: number) => {
    const raw = JSON.stringify(data);
    return fetch(`${local}${cat}/${id}`, {
      ...request,
      method: "PATCH",
      body: raw,
    }).then((res) => res.json());
  },
};

export const apiOptions = {
  getRequests,
  postRequests,
  patchRequests,
};
