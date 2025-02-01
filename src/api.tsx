
const local = 'http://localhost:3000/'
const header = {"Content-type" : 'application/json'};
const request = {
    method: '',
    headers: header,
    body: {},
}

const getRequests = {
    getDataInfo:(cat: string) => 
        fetch(`${local}${cat}`)
        .then(res => res.json()),
    getSingleData: (cat:string, key: string, value: string | number) =>
        fetch( `${local}${cat}?${key}=${value}`)
        .then(res => res.json())
        .then(dataArr => dataArr[0])
}

const postRequests = {
    addData: (cat: string, data: object) => {
        const raw = JSON.stringify(data)
        return fetch(
            `${local}${cat}`,
            {...request, method: 'POST', body: raw}
        )
            .then(res => res.json())
    }
}

export const apiOptions = {
    getRequests,
    postRequests
}