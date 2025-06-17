const http = require("http");

function testRoute(route) {
  console.log(`Testando rota: ${route}`);

  const options = {
    hostname: "localhost",
    port: 8080,
    path: route,
    method: "GET",
  };

  const req = http.request(options, (res) => {
    console.log(`Status Code: ${res.statusCode}`);

    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      console.log("Resposta recebida com sucesso");
      if (res.statusCode !== 200) {
        console.error(`Erro na resposta: ${data}`);
      }
    });
  });

  req.on("error", (error) => {
    console.error(`Erro ao conectar: ${error.message}`);
  });

  req.end();
}

testRoute("/modern-editor");
testRoute("/editor-test");
