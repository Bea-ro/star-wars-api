import '/style.css'

const container = document.querySelector('#app')
const btn = document.querySelector('button')

const charactersAnchor = document.querySelector('#characters')
const locationAnchor = document.querySelector('#locations')
const droidsAnchor = document.querySelector('#droids')

let dataList = []
let page = 1
let destination = "locations"

const getData = async () => {
  const data = await fetch(`https://starwars-databank-server.vercel.app/api/v1/${destination}?page=${page}&limit=10`)
  console.log('1', data)
  const json = await data.json()
  console.log('2', json)
  const dataArray = json.data
  console.log('3', dataArray)
  dataList = [...dataList, ...dataArray]
  console.log('4', dataList)
  mapData(dataList)
}

const mapData = (list) => {
  const mappedData = list.map((item) => ({
    name: item.name,
    description: item.description,
    image: item.image
  }))
  console.log('4', mappedData)
  printData(mappedData)
}

const printData = (list) => {
  container.innerHTML = ""
  for (const item of list) {
    const figure = document.createElement('figure')
    figure.innerHTML = `
      <img src=${item.image} alt=${item.name} />
      <h1>${item.name}</h1>
      <div>
        <p>${item.description}</p>
      </div>
    `
    container.appendChild(figure)
  }
}

btn.addEventListener('click', () => {
  page++
  getData()
})

charactersAnchor.addEventListener('click', () => {
  dataList = []
  destination = 'characters'
  page = 1
  getData()
})

locationAnchor.addEventListener('click', () => {
  dataList = []
  destination = 'locations'
  page = 1
  getData()
})

droidsAnchor.addEventListener('click', () => {
  dataList = []
  destination = 'droids'
  page = 1
  getData()
})

getData()