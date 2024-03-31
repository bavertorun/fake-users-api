const fetchCode = document.getElementById('fetchCode')
const runScriptBtn = document.getElementById('runScript')
const output = document.getElementById('output')
const runMessage = document.getElementById('run-message')

fetchCode.textContent = fetchCode.textContent.replace('http:', location.protocol)

runScriptBtn.addEventListener('click',()=>{
    var root = location.protocol + '//localhost:9001'

    fetch('http://localhost:9001/users/1')
      .then((response) => response.json())
      .then((json) => {
        var str = JSON.stringify(json, null, '  ')

        // Format output
        output.innerHTML = Prism.highlight(
          str,
          Prism.languages.javascript,
          'javascript'
        )

        runMessage.className = ''
      })
})