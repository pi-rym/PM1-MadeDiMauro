const { Activity, Repository } = require("../scripts/models");

describe("demo", function () {
  it("Este test debe pasar siempre", function () {
    expect(4 + 2).toBe(6);
  });
});

describe("Test de clase Repository", () => {
  beforeEach(()=>{
    repository = new Repository();
  });

  it("Repository debe ser una clase", ()=>{
    expect(typeof Repository.prototype.constructor).toBe("function");
  });

  it("Deberia ser una clase de la instacia de Repository", ()=>{
    expect(repository instanceof Repository).toBe(true);
  });

  it("Deberia tener un método llamado getAllActivities()", ()=>{
    expect(typeof repository.getAllActivities).toBe("function");
  });

  it("El metodo getAllActivities() debe retornar un listado de actividades (instancias de la clase Activity)", ()=>{
    repository.createActivity("Actividad1","Ejemplo de actividad","https://image.com.ar/1");
    repository.createActivity("Actividad2","Ejemplo de actividad","https://image.com.ar/2");

    const resultado = repository.getAllActivities();
    expect(Array.isArray(resultado)).toBe(true);

    resultado.forEach(a => {
      expect(a instanceof Activity).toBe(true);
    });
  });

  it("El metodo deleteActivity debe estar definido", ()=>{
    expect(repository.deleteActivity).toBeDefined;
  });
});
