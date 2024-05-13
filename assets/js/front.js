const actualizarCantidadDisplay = (amount) =>{
  document.querySelector('#show-currency').textContent = amount.toFixed(2)
}

const renderDivisaOptions = () =>{
  const currencySelect = document.querySelector('#currency')
  const currencies = ['Dolar', 'UF', 'UTM', 'Euro']
  currencies.forEach(currency => {
    const option = document.createElement('option')
    option.value = currency
    option.textContent = currency
    currencySelect.appendChild(option)
  })
}

const renderGrafico = (data) =>{
  const graphicCanvas = document.querySelector('#graphic')
  const ctx = graphicCanvas.getContext('2d')

  if (graphicCanvas) {
    const existingChart = Chart.getChart(graphicCanvas)
    if (existingChart) {
      existingChart.destroy()
    }
  }

  ctx.clearRect(0, 0, graphicCanvas.width, graphicCanvas.height)

  new Chart(ctx,{
    type: 'line',
    data: {
      labels: data.labels.reverse(),
      datasets: [{
        label: 'Variación de la moneda/valor',
        data: data.variation,
        borderColor: '#54d4ce',
        backgroundColor: 'rgba(84, 199, 212, 0.2)',
        borderWidth: 2
      }]
    },
    options:{
      responsive: true,
      maintainAspectRatio: false,
      scales:{
        x: { grid: { display: false } },
        y: { grid: { color: '#F9F7F7' } }
      }
    }
  })
}


const actualizarSimboloDivisa = (symbol) =>{
  document.querySelector('#currency-symbol').textContent = symbol
}

const iniciarEntradaCantidad = () =>{
  const amountInput = document.querySelector('#amount-input')

  amountInput.addEventListener('input', ()=>{
    if (amountInput.value.startsWith('0') && amountInput.value.length > 1) {
      amountInput.value = amountInput.value.replace(/^0+/, '')
    } else if (amountInput.value.length > 10) {
      amountInput.value = amountInput.value.slice(0, 10)
    }
    document.querySelector('#show-amount').textContent = amountInput.value
  })
}

export {actualizarCantidadDisplay, renderDivisaOptions, renderGrafico, actualizarSimboloDivisa, iniciarEntradaCantidad}