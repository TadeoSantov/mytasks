"use client";

import React from 'react'
import { useGlobalState } from '../context/globalProvider';
import Tasks from '../Components/Tasks/Tasks';

function completed() {
  const {completedTasks} = useGlobalState();

  return <Tasks title="Completed Tasks" tasks={completedTasks}/>
}

export default completed