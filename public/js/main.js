const panel = document.querySelector('#data-panel')
panel.addEventListener('click', (event) => {
  const { target } = event
  if (target.matches('.btn-danger')) {
    if (!window.confirm('確定要刪除餐廳嗎?')) {
      event.preventDefault()
    }
  }
})
