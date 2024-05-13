import { actualizarCantidadDisplay, renderGrafico, actualizarSimboloDivisa, iniciarEntradaCantidad, renderDivisaOptions } from './front.js'
import { convertirADivisa, obtenerVariacionDivisa } from './conversion.js'

document.addEventListener('DOMContentLoaded', () => {
  const botonConvertir = document.querySelector('#convert-button')
  const montoInput = document.querySelector('#amount-input')
  const seleccionarDivisa = document.querySelector('#currency')

  renderDivisaOptions()

  botonConvertir.addEventListener('click', async () => {
    const monto = parseFloat(montoInput.value)
    const divisaSeleccionada = seleccionarDivisa.value

    if (isNaN(monto) || monto <= 0) {
      alert('Ingresa un monto en pesos chilenos')
      return
    }

    try {
      const montoConvertido = await convertirADivisa(monto, divisaSeleccionada)
      actualizarCantidadDisplay(montoConvertido)

      const variacionData = await obtenerVariacionDivisa(divisaSeleccionada)
      renderGrafico(variacionData)

      const labels = variacionData.labels.map(date => {
        const formattedDate = new Date(date);
        return formattedDate.toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' });
      })

      renderGrafico({ variation: variacionData.variation, labels })

      let currencySymbol
      if (divisaSeleccionada === 'Dolar') {
        currencySymbol = '$'
      } else if (divisaSeleccionada === 'UF') {
        currencySymbol = 'UF'
      } else if (divisaSeleccionada === 'UTM') {
        currencySymbol = 'UTM'
      } else if (divisaSeleccionada === 'Euro') {
        currencySymbol = '€'
      }
      actualizarSimboloDivisa(currencySymbol)

    } catch (error) {
      console.error(`Error al convertir a ${divisaSeleccionada}`, error)
      alert(`Hubo un error al convertir a ${divisaSeleccionada}. Por favor, intenta de nuevo más tarde`)
    }
  })

  iniciarEntradaCantidad()

})
