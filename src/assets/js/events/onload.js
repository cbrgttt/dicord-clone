window.addEventListener( 'load', () => {
  document.querySelector( '.page-logo' ).classList.remove( 'shifted' )
} )


setTimeout( () => {
  const $loader = document.getElementById( 'loader' )
  const $content = document.getElementById( 'content' )

  $loader.style.display = 'none'
  $content.style.display = 'block'
}, Math.random() * 1000 )


setTimeout( ( ) => {
  window.rerePageLoaded = true
}, 400 )
