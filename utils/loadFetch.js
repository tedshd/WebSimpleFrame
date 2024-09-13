export function loadFetch(dom, url) {
    fetch(url)
    .then(response => response.text())
    .then(data => {
        dom.innerHTML = data;
        const scripts = dom.querySelectorAll('script');
        scripts.forEach(script => {
            const newScript = document.createElement('script');
            if (script.src) {
                newScript.src = script.src;
            } else {
                newScript.text = script.innerHTML;
            }
            document.body.appendChild(newScript);
        });
    })
    .catch(error => {
        console.error('Error loading the content:', url, error);
    });
}
