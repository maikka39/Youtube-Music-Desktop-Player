const leftArrow = document.createElement('span')
leftArrow.innerText = '➜'
leftArrow.setAttribute('onclick', 'window.history.back()')
leftArrow.setAttribute('class', 'navigate_arrow reverted_arrow')

const rightArrow = document.createElement('span')
rightArrow.innerText = '➜'
rightArrow.setAttribute('onclick', 'window.history.forward()')
rightArrow.setAttribute('class', 'navigate_arrow')

const centerbar = document.querySelector('.center-content.ytmusic-nav-bar')
centerbar.insertBefore(leftArrow, centerbar.children[0])
centerbar.appendChild(rightArrow)
