const input=JSON.parse(process.argv[2]||'{"op":"status"}');
const response=await fetch('http://127.0.0.1:8091',{method:'POST',body:JSON.stringify(input)});
console.log(await response.text());if(!response.ok)process.exitCode=1;
