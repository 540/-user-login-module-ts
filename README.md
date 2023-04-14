# User login module

Ejercicio para trabajar dobles de test

# Descripción

User login módulo es una plataforma que se encarga de iniciar la sesión de nuestros usuarios
usando diferentes proveedores.

Este módulo fue subcontratado a una empresa externa con la que por varios desacuerdos no ha llegado a finalizar
el desarrollo dejándonos esta implementación parcial. Nuestro trabajo, acabarlo.

El código está separado de la siguiente manera:
Domain:
- User: Es la clase que vamos a utilizar para modelas la información de nuestros usuarios

Application:
- UserLoginService: Es un servicio que se va a encargar de loggear a los usuarios
- SessionManager: Es una interfaz que define el contrato que habrá que cumplir para añadir un nuevo proveedor de sesión

Infraestructura:
- FacebookSessionManager: Esto parece ser la implementación de Facebook como proveedor de sesión de usuarios. La
  empresa externa nos dijo que esta parte estaba implementada, era funcional y cumplía con las reglas de negocio...

Este módulo es una parte clave de nuestro negocio (entonces, ¿por qué se externalizó? no lo sabemos). Es un sistema
que vamos a necesitar que escale con fácilmente con nuevas funcionalidades e implementaciones de diferentes gestores
de sesión (Google, Facebook, Github, ...) para que el negocio pueda seguir incorporando nuevos usuario.

### Paso 1
Permite añadir usuarios a la sesión manualmente implementando el método `manualLogin(user: User):void`
- Si el usuario no está en la lista, se añade al array de usuarios (loggedUsers)
- Si el usuario ya está logueado se lanza una excepción con el mensaje “User already logged in”

### Paso 2
Permite recuperar los usuarios que están actualmente logueados implementando el método `getLoggedUsers(): User[]`

### Paso 3
Permite consultar saber cuántas sesiones tenemos activas en un servicio externo mediante el método `getExternalSessions(): number` en nuestro UserLoginService
- Llamará a SessionManager.getSessions() y devuelve directamente el número total de sesiones activas que retorne el servicio externo

### Paso 4
Permite logear usuarios usando el API de Facebook mediante el método `login(userName: string, password: string): string` \
- Para loguear un usuario llamaremos a `SessionManager.login(userName: string, password: string): boolean` 
- Si devuelve true significará que el usuario ha sido logueado correctamente: En este caso crearemos un usuario con ese userName, lo añadiremos al listado de usuarios logeados y devolveremos un mensaje (string) “Login correcto”.
- Si devuelve false, no crearemos el usuario y devolveremos un mensaje (string) “Login incorrecto”.

### Paso 5
Permite desloguear usuarios de Facebook mediante un método `logout(user: User): string` en nuestro UserLoginService
- Para deslogear un usuario llamaremos a `SessionManager.logout(userName: string): string`
- En caso de existir el usuario en el listado de usuarios logeados lo eliminaremos del listado y llamaremos al logout de SessionManager devolviendo un "Ok" desde el UserLoginService
- En caso de no existir, devolveremos un "User not found" desde UserLoginService
