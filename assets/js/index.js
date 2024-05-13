import { actualizarCantidadDisplay, renderGrafico, actualizarSimboloDivisa, iniciarEntradaCantidad, renderDivisaOptions } from './front.js'
import { convertirADivisa, obtenerVariacionDivisa } from './conversion.js'

document.addEventListener('DOMContentLoaded', () => {
  const convertButton = document.querySelector('#convert-button')
  const amountInput = document.querySelector('#amount-input')
  const currencySelect = document.querySelector('#currency')

  renderDivisaOptions()

  convertButton.addEventListener('click', async () => {
    const amount = parseFloat(amountInput.value)
    const selectedCurrency = currencySelect.value

    if (isNaN(amount) || amount <= 0) {
      alert('Ingresa un monto en pesos chilenos')
      return
    }

    try {
      const convertedAmount = await convertirADivisa(amount, selectedCurrency)
      actualizarCantidadDisplay(convertedAmount)

      const variationData = await obtenerVariacionDivisa(selectedCurrency)
      renderGrafico(variationData)

      const labels = variationData.labels.map(date => {
        const formattedDate = new Date(date);
        return formattedDate.toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' });
      })

      renderGrafico({ variation: variationData.variation, labels })

      let currencySymbol
      if (selectedCurrency === 'Dolar') {
        currencySymbol = '$'
      } else if (selectedCurrency === 'UF') {
        currencySymbol = 'UF'
      } else if (selectedCurrency === 'UTM') {
        currencySymbol = 'UTM'
      } else if (selectedCurrency === 'Euro') {
        currencySymbol = '€'
      }
      actualizarSimboloDivisa(currencySymbol)

    } catch (error) {
      console.error(`Error al convertir a ${selectedCurrency}`, error)
      alert(`Hubo un error al convertir a ${selectedCurrency}. Por favor, intenta de nuevo más tarde`)
    }
  })

  iniciarEntradaCantidad()

})
