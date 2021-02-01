class Usuario {
  constructor(id, nombre, primerApellido, rut, correo, ubicacion) {
    this._id = id;
    this._nombre = nombre;
    this._primerApellido = primerApellido;
    this._rut = rut;
    this._correo = correo;
    this._ubicacion = ubicacion;
  }

  get id() {
    return this._id;
  }

  get nombre() {
    return this._nombre;
  }

  get primerApellido() {
    return this._primerApellido;
  }

  get rut() {
    return this._rut;
  }

  get correo() {
    return this._correo;
  }

  get ubicacion() {
    return this._ubicacion;
  }

  set nombre(nuevo_nombre) {
    this._nombre = nuevo_nombre;
  }
  set primerApellido(nuevo_apellido) {
    this._primerApellido = nuevo_apellido;
  }

  set correo(correo_nuevo) {
    this._correo = correo_nuevo;
  }
  set ubicacion(nueva_ubicacion) {
    this._ubicacion = nueva_ubicacion;
  }

}

Usuario.allUsuarios = []

Usuario.add = (usuario)=>{
    Usuario.allUsuarios.push(usuario)
}

Usuario.findById = (id)=>{
    var user = Usuario.allUsuarios.find((u)=> u.id == id)
    if(user){
        return user
    }else{
        throw new Error('No existe el usuario solicitado')
    }
}

Usuario.DeleteById = (id)=>{
    for (let i = 0; i < Usuario.allUsuarios.length; i++) {
        if(Usuario.allUsuarios[i].id == id){
            Usuario.allUsuarios.splice(i,1);
            break;
        }
        
    }
}

var user = new Usuario(1, "Carlos", "Huerta", "17.283.508-2", "huerta.g.carlos@gmail.com", [-33.45694, -70.64827])

Usuario.add(user);

module.exports= Usuario;
