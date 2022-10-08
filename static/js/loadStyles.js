//The 'loadStyle' function avoid the race condition beetween bootstrap and the custom stylesheets
function loadStyle(src) {
    return new Promise((resolve, reject) => {
        let link = document.createElement("link")
        link.href = src
        link.rel = "stylesheet"

        link.onload = () => resolve(link)
        link.onerror = () => reject(new Error(`Could not load ${src}`))

        document.head.append(link)
    })
}