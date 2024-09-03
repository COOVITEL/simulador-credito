# Simulador de Credito Coovitel

This repository contains the credit simulator project, to create different simulations for all Coovitel partners depending on their data.

### What do you need to run this project?

- __Install all dependents__:
Before running this project, first you need to install all dependencies that this project, please execute `npm install`.

- __Run project__:
For run this project, execute `npm run dev` or `yarn , pnpm or other package manager`

This is all you need to run this project

### Strcuture of this project

The code of the projecto you can to find en this [URL](https://github.com/COOVITEL/simulador-credito/tree/master/src)

In earch file you find differents components or function necessary fro its operation, this are somefiles:

- [__Componets__](https://github.com/COOVITEL/simulador-credito/tree/master/src/components): Here you will find the different inputs that you need from the partner to create the correct credit simulator, these components are parts of the form, and 3 different component depending of the type credit line: **No sociales, Sociales o Fidelizacion**

- [__Store__](https://github.com/COOVITEL/simulador-credito/tree/master/src/store): Store contains the structure of the global state that credit simulator has, this state is created with zustand, in this way the data can be accessed from any part to of the project, allows adding controls in different parts of the form.

- [__Utils__](https://github.com/COOVITEL/simulador-credito/tree/master/src/utils): Utils contain all functions that you need in the simulator, for example, you need to find the correct tasa of the credit, the value of salud y pension, ahorros, and others values and data that you need for create the final result.


The documentation for earch file can be found within each of them, along with the documentation or operation of each funcion or process.


Contributors: [Coovitel](https://github.com/COOVITEL) and [ManuRodriguezC](https://github.com/ManuRodriguezC)