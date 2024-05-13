import { fetchData } from './api.js'

const convertirADivisa = async (amount, currency) => {
  try {
    const exchangeRate = await obtenerTasaDeCambio(currency)
    const convertedAmount = amount / exchangeRate
    return convertedAmount
  } catch (error) {
    throw new Error(`Error al convertir a ${currency}`)
  }
}

const obtenerTasaDeCambio = async (currency) => {
  try {
    const data = await fetchData(currency.toLowerCase())
    const exchangeRate = data.serie[0].valor
    return exchangeRate
  } catch (error) {
    throw new Error(`Error al obtener la tasa de cambio de ${currency}`)
  }
}

const obtenerVariacionDivisa = async (currency) => {
  try {
    const data = await fetchData(currency.toLowerCase())
    const variation = data.serie.slice(0, 10).map(entry => entry.valor)
    const labels = data.serie.slice(0, 10).map(entry => entry.fecha)
    return { variation: variation.reverse(), labels: labels.reverse() }
  } catch (error) {
    throw new Error(`Error al obtener la variación de ${currency}`)
  }
}


export { convertirADivisa, obtenerTasaDeCambio, obtenerVariacionDivisa }
