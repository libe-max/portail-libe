import axios from 'axios'

const baseUrl = 'http://10.14.244.101:8081/'

export const httpFiles = axios.create({
  baseURL: baseUrl + 'files/'
})

export const httpApiHome = axios.create({
  baseURL: baseUrl + 'api/home'
})

export const httpApiTemoingage = axios.create({
  baseURL: baseUrl + 'api/temoignage'
})

export const httpApiQuiz = axios.create({
  baseURL: baseUrl + 'api/quiz'
})
