import React, { useState, createContext, useEffect } from 'react'

export const ResidenceContext = createContext();

export const ResidenceProvider = (props) => {

  const [residences, setResidences] = useState([]);


  const fetchResidences = async() => {
    let data = await fetch('/rest/residences')
    data = await data.json();
    setResidences([...data]);
    return data;
  }

  const deleteResidence = async (id) => {
    let res = await fetch('/rest/residences/' + id, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    })
    res = await res.json();
  }

  const confirmDelete = async (userObj) => {
      let res = await fetch("/api/confirmDelete", {
      method: 'POST',
      headers: { 'content-type': 'application/json'},
      body: JSON.stringify(userObj)
      })
    res = await res.json()
    return res;
  }

  const updateResidence = async (id, residence) => {
     let res = await fetch('/rest/residences/' + id, {
      method: 'PUT',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(residence)
     })

    res = await res.json()
    fetchResidences();
  }

  const addResidence = async (residenceObj) => {
    let res = await fetch("/rest/residences", {
      method: 'POST',
      headers: { 'content-type': 'application/json'},
      body: JSON.stringify(residenceObj)
    })
    res = await res.json();
    return res;
  }

  useEffect(() => {
    fetchResidences();
  }, []);

  
  const values = {
    residences,
    setResidences,
    updateResidence,
    fetchResidences,
    addResidence,
    deleteResidence,
    confirmDelete
  }

  return (
    <ResidenceContext.Provider value={values}>
      {props.children}
    </ResidenceContext.Provider>
  );
}