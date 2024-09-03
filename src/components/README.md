# Componets

Here you will find to differents componets that make up the simulator.

- [__Form__](https://github.com/COOVITEL/simulador-credito/tree/master/src/components/form): Form contain all inputs necessary for the simulation of partner, for example: Name, years, score, debit, garantia, salary, etc. This datas is valid for all partners and always displayed on the form.

- [__Dialog__](https://github.com/COOVITEL/simulador-credito/blob/master/src/components/Dialog.tsx): Dialog is a component that see the simulation of the partner, in this dialog the asesor can to see all datas and calculates about the simulation, for example, the values, tasas, types of the credit, values that the partner need to pay and discounts of the credit.

For the simulation the partner can to choose from three options Fidelizacion, sociales y no-sociales, this options div in differents components in the form.

- [__FormUser__](https://github.com/COOVITEL/simulador-credito/blob/master/src/components/FormUser.tsx): This component contain all form for the partner and the controls with the statuses so that the user can choose the credit line for the simulation.

- [__Fidelizacion__](https://github.com/COOVITEL/simulador-credito/blob/master/src/components/Fidelizacion.tsx): In this component the partner have four inputs, number of years how partner, amount of contributions, number of months and value of the credit.

- [__NoSociales__](https://github.com/COOVITEL/simulador-credito/blob/master/src/components/NoSociales.tsx): In this component the partner have three inputs, type of the credit, number of months and value of the credit. The rate in this case depends on the type of partner and their profile.

- [__Sociales__](https://github.com/COOVITEL/simulador-credito/blob/master/src/components/Sociales.tsx): In this component the partner have three inputs, type of the credit, number of months and value of the credit.
