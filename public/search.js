const key = (new URLSearchParams(location.search)).get('search')
document.getElementById('keyword').innerHTML = key
