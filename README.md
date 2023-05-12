# User login module

Ejercicio para trabajar dobles de test

# Descripción

User login módulo es una plataforma que se encarga de iniciar la sesión de nuestros usuarios
usando diferentes proveedores.

Este módulo fue subcontratado a una empresa externa con la que por varios desacuerdos no ha llegado a finalizar
el desarrollo dejándonos esta implementación parcial. Nuestro trabajo, acabarlo.

El código está separado de la siguiente manera:

Domain:
- User: Es la clase que vamos a utilizar para modelar la información de nuestros usuarios

Application:
- UserLoginService: Es un servicio que se va a encargar de loggear a los usuarios
- SessionManager: Es una interfaz que define el contrato que habrá que cumplir para añadir un nuevo proveedor de sesión

Infraestructura:
- FacebookSessionManager: Esto parece ser la implementación de Facebook como proveedor de sesión de usuarios. La
  empresa externa nos dijo que esta parte estaba implementada, era funcional y cumplía con las reglas de negocio...

Este módulo es una parte clave de nuestro negocio (entonces, ¿por qué se externalizó? no lo sabemos). Es un sistema
que vamos a necesitar que escale con fácilmente con nuevas funcionalidades e implementaciones de diferentes gestores
de sesión (Google, Facebook, Github, ...) para que el negocio pueda seguir incorporando nuevos usuario.

¿Vamos a por ello?
