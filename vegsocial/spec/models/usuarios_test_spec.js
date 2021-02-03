var Usuario = require('../../models/usuarios')

describe('Usuario.AllUsuarios', ()=>{
     it('comienza vacia', ()=>{
         expect(Usuario.allUsuarios.length).toBe(1);
     })
})