---
title: "Validación en el servidor: por qué nunca debes fiarte del navegador"
description: "La validación del formulario en el navegador es para la experiencia de usuario, no para la seguridad. Quién puede saltársela, qué pasa si lo hace y cómo validar bien en el servidor."
publishDate: 2026-11-18
author: "Jordi Sánchez"
category: "Seguridad"
section: "general"
draft: false
---

Casi todas las aplicaciones web validan los datos dos veces: una en el navegador, mientras el usuario escribe, y otra —o eso debería— en el servidor, antes de guardarlos. La primera es comodidad. La segunda es la que de verdad protege tu aplicación. Confundirlas es uno de los errores más comunes y más caros.

La idea de fondo es sencilla: **todo lo que llega del cliente es, por definición, no fiable**. No porque tus usuarios sean malintencionados, sino porque entre tu código JavaScript y tu base de datos hay un espacio que no controlas.

## La validación del navegador es una sugerencia, no un candado

Cuando pones `required`, `type="email"` o `maxlength="20"` en un formulario, el navegador ayuda al usuario a no equivocarse. Es rápido y mejora la experiencia. Pero esa comprobación vive en una máquina que no es tuya, y cualquiera puede ignorarla:

- Abriendo las herramientas de desarrollo y borrando el atributo `required`.
- Enviando la petición directamente con `curl`, Postman o un script, sin pasar por tu formulario.
- Usando un cliente de API que ni siquiera carga tu HTML.

En otras palabras: la petición que llega a tu servidor **puede no parecerse en nada** a lo que tu formulario permitía. Si tu única defensa era el `required` del navegador, no tienes defensa.

## Qué puede salir mal si solo validas en el cliente

Un campo sin validar en el servidor no es un detalle estético. Según qué hagas con ese dato, el impacto va desde lo molesto a lo grave:

- **Datos corruptos**: un precio negativo, una fecha imposible, un campo vacío donde esperabas texto. Tu lógica de negocio empieza a dar resultados absurdos.
- **Errores en cadena**: un valor inesperado rompe un cálculo tres capas más abajo, en un sitio que nada tiene que ver con el formulario.
- **Agujeros de seguridad**: si ese dato acaba en una consulta, en una plantilla HTML o en una llamada a otro sistema sin comprobarse, abres la puerta a inyecciones y a abusos.

El patrón es siempre el mismo: confiaste en que el dato tendría cierta forma, y no la tenía.

## Validar bien en el servidor

La regla práctica es: **el servidor valida como si el cliente no existiera**. Da igual lo que el navegador ya haya comprobado; vuelves a comprobarlo todo antes de usar el dato.

Para eso ayuda definir un esquema explícito de lo que aceptas y rechazar todo lo demás. Con una librería de validación como Zod, en TypeScript, se ve así:

```ts
import { z } from "zod";

const ReservaSchema = z.object({
  nombre: z.string().trim().min(1).max(80),
  email: z.string().email(),
  personas: z.number().int().positive().max(20),
  fecha: z.coerce.date(),
});

export function parseReserva(datosSinConfiar: unknown) {
  // Si algo no encaja, esto lanza y la petición nunca llega a la lógica de negocio.
  return ReservaSchema.parse(datosSinConfiar);
}
```

Fíjate en tres cosas:

1. El dato de entrada se llama `unknown` a propósito. No es un `Reserva`; es lo que sea que haya mandado el cliente, y hay que demostrar que es válido.
2. Cada campo tiene límites concretos: longitud, formato, rango. No basta con "es un número"; es un número entero, positivo y como mucho 20.
3. Si algo falla, se corta **antes** de tocar la base de datos o la lógica de negocio.

## No es validar o no validar: es dónde

La conclusión no es que la validación del navegador sobre. Mejora la experiencia y evita viajes al servidor innecesarios. Pero cumple otra función distinta:

- **En el cliente** validas para *ayudar* al usuario. Rápido, inmediato, prescindible.
- **En el servidor** validas para *proteger* tu aplicación. Obligatorio, sin excepciones, aunque el cliente ya lo haya hecho.

Si tuvieras que elegir solo una, te quedas con la del servidor. Una aplicación sin validación en el cliente es incómoda. Una aplicación sin validación en el servidor es un problema esperando a ocurrir.
