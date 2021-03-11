import React, { useState, createContext, useEffect } from 'react'

export const UserContext = createContext();

export const UserProvider = (props) => {

  const [users, setUsers] = useState([]);
  const [whoAmI, setWhoAmI] = useState({});

  
  const fetchUsers = async() => {
    let data = await fetch('/rest/users')
    data = await data.json();
    setUsers([...data]);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async user => {
    let res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(user)
    })
    res = await res.json();
    setUsers([...users, user])
  }

  const login = async user => {
    let res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(user)
    })
    res = await res.json();
  }

  const whoIsOnline = async() => {
    let data = await fetch('/api/login')
    data = await data.json();
    setWhoAmI({...data});
  }

  const values = {
    users,
    setUsers,
    addUser,
    login,
    whoIsOnline
  }

  return (
    <UserContext.Provider value={values}>
      {props.children}
    </UserContext.Provider>
  );
}