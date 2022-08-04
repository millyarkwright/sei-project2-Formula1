import { useState, useEffect } from 'react'
import axios from 'axios' // id don't set file path, it'll look into Node.js

function App() {

  // ! state


  // ! execution
  useEffect(() => {

    const getData = async () => {
      try {
        const { data } = await axios.get('http://ergast.com/api/f1/current.json?limit=1000')
        console.log('LATEST SEASON SCHEDULE ->', data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  useEffect(() => {

    const getData = async () => {
      try {
        const { data } = await axios.get('http://ergast.com/api/f1/current/last/results.json')
        console.log('CURRENT RESULT (LATEST) ->', data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  useEffect(() => {

    const getData = async () => {
      try {
        const { data } = await axios.get('http://ergast.com/api/f1/2022/1/results.json')
        console.log('RESULT SEASON/ROUND ->', data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  useEffect(() => {

    const getData = async () => {
      try {
        const { data } = await axios.get('http://ergast.com/api/f1/drivers.json?limit=1000')
        console.log('Drivers Info ->', data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  useEffect(() => {

    const getData = async () => {
      try {
        const { data } = await axios.get('http://ergast.com/api/f1/2022/driverStandings.json')
        console.log('Driver standings ->', data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])


  // ! JSX
  return (
    <div className='container'>
      <h1>F1</h1>

    </div>
  )
}
export default App
