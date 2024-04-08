import http from "../Services/http-common"

const ROOT = "schoolClasses?include=teacher,department,events";

const getAll = ()     => { return http.get(`${ROOT}`); };
const get    = (id)   => { return http.get(`${ROOT}/${id}`); };
const create = (data) => { return http.post(`${ROOT}`, data); };
const update = (data) => { return http.put(`${ROOT}`, data); };
const remove = (id)   => { return http.delete(`${ROOT}/${id}`); };          // Achtung: dieses spezielle Hochkomma muss verwendet werden!

const events = (schoolClassId)=>{
    return http.get(`${ROOT}/${schoolClassId}/events`)
};
const exportedObject = {
    getAll, get, create, update, remove,events
};



export default exportedObject;