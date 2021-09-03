const imagemin = require( 'imagemin' )
const webp = require( 'imagemin-webp' )

imagemin( [ 'src/assets/images/pictures/*.{jpg,png}', 'src/assets/images/pictures/*/*.{jpg,png}' ], {
  destination: 'src/assets/images/webp',
  plugins: [
    webp( { quality: 60 } )
  ]
} )
