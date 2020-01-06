export function render(root, config, { setConfig, options }) {
  root.innerHTML = `<div>
        <p>Config is</p>
        <p>${config.configJson}</p>
        <button id="test">Test button</button>
    </div>`
}
