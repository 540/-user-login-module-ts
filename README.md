# User login module

Ejercicio para trabajar dobles de test

# Descripción

User login módulo es una plataforma que se encarga de iniciar la sesión de nuestros usuarios
usando diferentes proveedores.

Este módulo fue subcontratado a una empresa externa con la que, por varios desacuerdos, no ha llegado a finalizar
el desarrollo. Es por esto que la implementación de esta parte se ha quedado sin terminar. Nuestro trabajo, acabarlo.

El código está separado de la siguiente manera:

- **User**: Es la clase que vamos a utilizar para modelar la información de nuestros usuarios.
- **UserLoginService**: Es un servicio que se va a encargar de loggear a los usuarios.
- **SessionManager**: Es una interfaz que define el contrato que habrá que cumplir para añadir un nuevo proveedor de sesión.
- **FacebookSessionManager**: Esto parece ser la implementación de Facebook como proveedor de sesión de usuarios. La
  empresa externa nos dijo que esta parte estaba implementada, era funcional y cumplía con las reglas de negocio...

Este módulo es una parte clave de nuestro negocio (entonces, ¿por qué se externalizó? No lo sabemos). Es un sistema
que vamos a necesitar que escale con fácilmente con nuevas funcionalidades e implementaciones de diferentes gestores
de sesión (Google, Facebook, Github...) para que el negocio pueda seguir incorporando nuevos usuarios.

¿Vamos a por ello?

Planteamos los siguientes pasos para resolver el ejercicio:

### Paso 1

Queremos un inicializador de sesiones de usuario que permita añadir usuarios a la sesión manualmente. Para ello, implementaremos
el método **manualLogin(user: User): string** siguiendo la siguiente lógica:
- Si el usuario no está en la lista, se añade al array de usuarios (loggedUsers) e indica que se ha añadido: "_User successfully logged in_"
- Si el usuario ya está logueado se lanza un mensaje indicando que el usuario ya está logueado:  “_User already logged in_”


### Paso 2

Queremos que dicho inicializador de sesiones nos permita recuperar los usuarios que están actualmente logueados en nuestro sistema:

Añadir el método **getLoggedUsers()** que devuelva un array de usuarios logueados.


### Paso 3

Necesitamos saber cuántas sesiones tenemos activas en un servicio externo (Facebook).

Para ello crearemos un método **getExternalSessions()** en nuestro UserLoginService que llamará a **FacebookSessionManager.getSessions()**
Este método devuelve el número total de sesiones activas en el servicio externo. Devolveremos directamente el valor que retorne la llamada externa.


### Paso 4 

Queremos poder loguear usuarios usando el API de Facebook.

- Crear un método **login(userName: string, password: string): string**  en nuestro UserLoginService.
- Para loguear un usuario llamaremos a **FacebookSessionManager.login(String userName: string, password: string)**
  - Si devuelve true significará que el usuario ha sido logueado correctamente. En este caso crearemos un usuario con ese userName, lo añadiremos al listado de usuarios logeados de nuestro sistema y devolveremos un mensaje “_Login correcto_”
  - Si devuelve false, no crearemos el usuario y devolveremos un mensaje de “_Login incorrecto_”


### Paso 5

Queremos poder desloguear usuarios del servicio externo (Facebook)

- Crear un método **String logout(user: User)** en nuestro **UserLoginService**
Para desloguear un usuario llamaremos a **FacebookSessionManager.logout(userName: string)**
  - En caso de existir el usuario en el listado de usuarios logeados lo eliminaremos del listado y llamaremos al logout de FacebookSessionManager devolviendo un mensaje de “_User logged out_” desde el UserLoginService
  - En caso de no existir, devolveremos un mensaje de “_User not found_” desde UserLoginService

### Paso 6

Queremos controlar las posibles causas de un error en el logout.

- **FacebookSessionManager** lanzará un error en cada caso y en **userLoginService** manejaremos el error y devolveremos un mensaje descriptivo al usuario.
  - Errores:
    - **FacebookSessionManager** no responde: error “_ServiceNotAvailable_”
    - Usuario no logueado en Facebook: error “_UserNotLoggedIn_”
  

- El servicio userLoginService devolverá los siguientes mensajes para cada error:
  - “_ServiceNotAvailable_” -> ‘Service not available’
  - “_UserNotLoggedIn_” -> ‘User not logged in Facebook’
