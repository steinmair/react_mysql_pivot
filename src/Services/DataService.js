import http from "../Services/http-common"

const getAll = (endpoint)     => { return http.get(`${endpoint}`); };
const get    = (endpoint,id)   => { return http.get(`${endpoint}/${id}`); };
const create = (endpoint,data) => { return http.post(`${endpoint}`, data); };
const update = (endpoint,data) => { return http.put(`${endpoint}`, data); };
const remove = (endpoint,id)   => { return http.delete(`${endpoint}/${id}`); };// Achtung: dieses spezielle Hochkomma muss verwendet werden!
const getMasterDetail = (master,detailId,detail) => {return http.get(`${master}/${detailId}/${detail}`);}

const exportedObject = {
    getAll, get, create, update, remove, getMasterDetail
};

export default exportedObject;