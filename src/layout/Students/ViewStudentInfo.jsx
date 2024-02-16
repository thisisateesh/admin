import React from 'react'
import Profile from '../../components/Profile'
import { useParams } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'

function ViewStudentInfo() {
  const {id} = useParams()
  const [data , error , loading] = useFetch(`/api/student/details?studentId=${id}` , id)
  console.log(data);
  return (
    <>
    {
      error && error.messsage
    }
    {
      loading && "Loading..."
    }
    
    <Profile data={data}/>
    </>
  )
}

export default ViewStudentInfo
