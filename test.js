const {
  performance
} = require( "perf_hooks" );

const arr = [ 10, 12, 15, 21 ];

function loop(){
  let sum = 0;
  for( var i = 0; i < 1000000000; i++ ){
    sum = sum + i;
  }
  
}

const start = performance.now();

loop();
const end = performance.now();
console.log( `1,000,000,000 loops took ${ end - start } ms` );

