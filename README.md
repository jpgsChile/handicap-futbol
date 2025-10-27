##Complemento de información, por problemas de Submission en DoraHacks

https://docs.google.com/document/d/1eryEPgBPyueyjZzNhqLI_YNX8ObrgmU2CemJc3fMRsI/edit?pli=1&tab=t.0#heading=h.ru11sj6eazva

##Link de Vercel

https://handicap-futbol.vercel.app/

## Configuración de entorno (.env.local)

Crea un archivo `.env.local` en la raíz del proyecto con estas variables (puedes ajustar las direcciones/nombres según despliegues):

```
NEXT_PUBLIC_APP_NAME=FuturoFutbol Handicap
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Dirección base donde están desplegados los módulos (no incluyas .contract)
NEXT_PUBLIC_CONTRACT_ADDRESS=ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM

# Nombres de contratos modulares (opcional, tienen defaults)
NEXT_PUBLIC_CN_ROLES=ff-roles
NEXT_PUBLIC_CN_LEAGUE=ff-league
NEXT_PUBLIC_CN_CLUB=ff-club
NEXT_PUBLIC_CN_PLAYER=ff-player
NEXT_PUBLIC_CN_GAME=ff-game
NEXT_PUBLIC_CN_LINEUP=ff-lineup
NEXT_PUBLIC_CN_EVENT=ff-event
NEXT_PUBLIC_CN_ATTEST=ff-attest
NEXT_PUBLIC_CN_VIEWS=ff-views
```

### Variables para Testnet (Wallet)

Cuando despliegues en Testnet, agrega la dirección STX del deployer para cada módulo (si usaste la misma cuenta para todos, serán iguales):

```
# Direcciones (address) de los contratos modulares en Testnet
NEXT_PUBLIC_TN_ADDR_FF_LEAGUE=STXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_TN_ADDR_FF_CLUB=STXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_TN_ADDR_FF_PLAYER=STXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_TN_ADDR_FF_GAME=STXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_TN_ADDR_FF_LINEUP=STXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_TN_ADDR_FF_EVENT=STXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_TN_ADDR_FF_ROLES=STXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_TN_ADDR_FF_ATTEST=STXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_TN_ADDR_FF_VIEWS=STXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

## Arquitectura Modular de Contratos

- ff-league: CRUD de ligas (`crear-liga`, `get-liga`)
- ff-club: CRUD de clubes (`crear-club`, `get-club`)
- ff-player: registro y unión a club (`registrar-jugador-ff`, `jugador-unir-a-club`, `get-jugador`)
- ff-game: creación/cierre de partidos (`crear-juego-ff`, `cerrar-juego`, `get-juego`)
- ff-lineup: alineaciones por partido (`alineacion-agregar`, `alineacion-salida`, `get-alineacion`)
- ff-event: eventos y contadores (`registrar-evento-ff`, `get-evento`, `get-contador`)
- ff-roles: asignación y consulta de roles (`asignar-rol`, `tiene-rol`)
- ff-attest: testificaciones y verificación (`attest`, `attest-resumen`, `elevar-verificacion`, `get-verificacion-juego`)
- ff-views: fachada de lecturas (proxy a todos los módulos):
  - `liga-detalle(id)`
  - `club-detalle(id)`
  - `jugador-detalle(principal)`
  - `juego-detalle(id)`
  - `alineacion-detalle(gameId, principal)`
  - `evento-detalle(gameId, index)`
  - `evento-contador(gameId, tipo)`
  - `attest-resumen(entity, id)`
  - `verificacion-juego(id)`

## Parámetros de verificación (UI)

Configura umbrales de verificación para el semáforo de la vista `Lecturas > Estado de verificación`:

```
NEXT_PUBLIC_VERIFY_MIN_SUM=10
NEXT_PUBLIC_VERIFY_MIN_COUNT=3
```

## Limpieza y migración
- Consulta también el documento de referencia con el mapa completo y checklist de despliegue en `docs/MAPA_MODULOS_Y_DESPLIEGUE.md`.

- Todas las páginas de transacciones usan `HybridTransaction` con `contractNameOverride`.
- Todas las lecturas van vía `ff-views` desde `lib/readOnly.ts`.
- Evitar usar directamente `CONTRACT_NAME` en lecturas/escrituras; en su lugar, usa los CN_* y ff-views.

# ⚽ Handicap-Futbol MVP

**FuturoFútbol - Handicap Fútbol on Stacks Blockchain**

Un MVP completo para la gestión de ligas de fútbol con handicap, construido sobre la blockchain de Stacks usando contratos inteligentes en Clarity.

## 🎯 Características Principales

### 🏆 Gestión de Ligas y Clubes
- **Creación de Ligas**: Registro de ligas con ubicación y categoría
- **Gestión de Clubes**: Creación y administración de clubes por liga
- **Sistema de Roles**: JUGADOR, DT (Director Técnico), REPRESENTANTE, LIGA

### ⚽ Sistema de Partidos
- **Creación de Partidos**: Con metadata IPFS para evidencia
- **Verificación Multi-nivel**: "auto" → "club" → "oficial"
- **Alineaciones**: Gestión de jugadores titulares y suplentes
- **Eventos en Tiempo Real**: Goles, asistencias, tarjetas, cambios, lesiones

### 👥 Gestión de Jugadores
- **Registro Completo**: Nombre, apodo, posiciones, nivel
- **Sistema de Reputación**: Incremental por eventos (+5 gol, +2 asistencia, -1 amarilla, -3 roja)
- **Protección a Menores**: Con consentimiento de guardianes y visibilidad controlada

### 🔐 Sistema de Attestations
- **Multi-rol**: Diferentes tipos de usuarios pueden hacer attestations
- **Evidencia IPFS**: Vinculación con archivos de evidencia
- **Pesos Variables**: Sistema de ponderación por rol

## 🛠️ Tecnologías Utilizadas

### Blockchain
- **Stacks Blockchain**: Red principal
- **Clarity**: Lenguaje de contratos inteligentes
- **Clarinet**: Framework de desarrollo

### Frontend
- **Next.js 14**: Framework React
- **TypeScript**: Tipado estático
- **Stacks Connect**: Integración con wallets

### Infraestructura
- **IPFS**: Almacenamiento de metadata y evidencia
- **Docker**: Entorno de desarrollo local

## 🧱 Stack Técnico

- **Frontend**:
  - Next.js 14.2.x, React 18.3, TypeScript 5.5
  - Componentes clave: `HybridTransaction`, `WalletStatus`, `FormsBasics`, `FormsGame`, `Navbar`
  - Estilos: `app/globals.css` y estilos inline mínimos
- **SDK Stacks**:
  - `@stacks/connect` 6.9, `@stacks/transactions` 6.13, `@stacks/network` 6.9
- **Contratos y Tooling**:
  - Clarity + Clarinet (check, console, devnet, deployments)
  - Módulos: `ff-league`, `ff-club`, `ff-player`, `ff-game`, `ff-lineup`, `ff-event`, `ff-roles`, `ff-attest`, `ff-views`
- **Backend (Next.js API Routes)**:
  - `/api/transaction` (modo Dev via Clarinet console, mock fallback)
  - `/api/devnet/health` y `/api/devnet/start` (diagnóstico e inicio de devnet)
- **Dev/QA**:
  - Script `test-contract.sh` y comandos `npm run validate`, `validate:soft`
  - Páginas `/diagnostico` y `/pruebas-comparativas`

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+
- Docker
- Clarinet CLI
- Git

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/jpgsChile/handicap-futbol.git
cd handicap-futbol
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env.local
# Editar .env.local con tus configuraciones
```

4. **Iniciar el entorno de desarrollo**
```bash
# Terminal 1: Iniciar devnet
clarinet devnet start

# Terminal 2: Iniciar frontend
npm run dev
```

### URLs del Entorno Local
- **Frontend**: http://localhost:3000
- **Stacks API**: http://localhost:3999/doc
- **Stacks Explorer**: http://localhost:8000
- **Bitcoin Explorer**: http://localhost:8001

## 🚀 Despliegue en Testnet (Clarinet)

1. Configura el deployer en `settings/Testnet.toml` (mnemonic de 12/24 palabras) y fondea STX de prueba desde el faucet.
2. Genera plan de despliegue:
```bash
npm run deploy:testnet:plan
```
3. Aplica el plan (ejecuta las TX de deploy):
```bash
npm run deploy:testnet:apply
```
4. Copia la dirección STX del deployer a las variables `NEXT_PUBLIC_TN_ADDR_FF_*` en `.env.local` y reinicia el servidor (`npm run dev`).
5. Prueba en Wallet (Testnet). Si falta alguna variable, la UI bloqueará la operación con un mensaje claro.

## 📁 Estructura del Proyecto

```
handicap-futbol/
├── contracts/
│   ├── ff-league.clar          # Ligas
│   ├── ff-club.clar            # Clubes
│   ├── ff-player.clar          # Jugadores
│   ├── ff-game.clar            # Partidos
│   ├── ff-lineup.clar          # Alineaciones
│   ├── ff-event.clar           # Eventos
│   ├── ff-roles.clar           # Roles
│   ├── ff-attest.clar          # Attestations / verificación
│   └── ff-views.clar           # Fachada de lecturas
├── components/
│   ├── Connect.tsx             # Componente de conexión de wallet
│   ├── FormsBasics.tsx         # Formularios básicos (ligas, clubes, jugadores)
│   ├── FormsGame.tsx           # Formularios de partidos y eventos
│   ├── HybridTransaction.tsx   # Abstracción Dev/Wallet para transacciones
│   └── WalletStatus.tsx        # Estado de wallet/nonce
├── app/
│   ├── page.tsx                # Página principal
│   ├── layout.tsx              # Layout de la aplicación
│   └── globals.css             # Estilos globales
│   ├── diagnostico/page.tsx    # Diagnóstico de red/devnet
│   └── pruebas-comparativas/   # Comparación Dev vs Wallet
├── lib/
│   ├── stacks.ts               # Configuración de Stacks y CN*/TN_ADDR*
│   └── readOnly.ts             # Lecturas via ff-views
├── app/api/
│   ├── transaction/route.ts    # Transacciones en modo Dev (Clarinet)
│   └── devnet/                 # Salud e inicio de devnet
├── Clarinet.toml               # Configuración de Clarinet
├── settings/Testnet.toml       # Configuración de despliegue Testnet
├── package.json                # Dependencias de Node.js
└── tsconfig.json               # Configuración de TypeScript
```

## 🔧 Funcionalidades del Contrato

### Funciones Principales

#### Gestión de Entidades
- `crear-liga`: Crear nueva liga
- `crear-club`: Crear nuevo club
- `registrar-jugador-ff`: Registrar jugador con protección a menores
- `jugador-unir-a-club`: Unir jugador a un club

#### Gestión de Partidos
- `crear-juego`: Crear partido básico
- `crear-juego-ff`: Crear partido con metadata IPFS
- `cerrar-juego`: Finalizar partido

#### Alineaciones y Eventos
- `alineacion-agregar`: Agregar jugador a alineación
- `alineacion-salida`: Registrar salida de jugador
- `registrar-evento`: Registrar evento básico
- `registrar-evento-ff`: Registrar evento con evidencia IPFS
- `registrar-evento-y-reputacion`: Registrar evento y actualizar reputación

#### Sistema de Roles y Attestations
- `asignar-rol`: Asignar rol a usuario
- `tiene-rol`: Verificar si usuario tiene rol
- `attest`: Crear attestation
- `elevar-verificacion`: Elevar nivel de verificación

### Funciones de Lectura
- `get-liga`: Obtener información de liga
- `get-club`: Obtener información de club
- `get-jugador`: Obtener información de jugador
- `get-juego`: Obtener información de partido
- `get-alineacion`: Obtener alineación de jugador
- `get-evento`: Obtener evento específico

## 🎮 Uso de la Aplicación

### 1. Conexión de Wallet
- Conecta tu wallet Stacks usando el botón "Conectar Wallet"
- Asegúrate de estar en la red de prueba (testnet)

### 2. Crear Liga
- Completa el formulario "Crear Liga"
- Ingresa nombre, ubicación y categoría

### 3. Crear Club
- Usa el formulario "Crear Club"
- Selecciona la liga y configura si tiene portero fijo

### 4. Registrar Jugador
- Completa "Registrar Jugador"
- Especifica posiciones, nivel y configuración de menores

### 5. Crear Partido
- Usa "Crear Partido" para programar encuentros
- Agrega metadata IPFS para evidencia

### 6. Gestionar Partido
- Agrega alineaciones con "Alineación Agregar"
- Registra eventos en tiempo real
- Actualiza reputación de jugadores

## 🔒 Seguridad y Privacidad

### Protección a Menores
- Sistema de consentimiento de guardianes
- Control de visibilidad (público/restringido)
- Validación de edad en el registro

### Sistema de Roles
- Autorización granular por función
- Solo propietarios de clubes pueden gestionar sus equipos
- Solo ligas pueden elevar verificación a "oficial"

### Evidencia y Transparencia
- Metadata IPFS para evidencia inmutable
- Sistema de attestations multi-rol
- Historial completo de eventos

## 🧪 Testing

### Contrato Inteligente
```bash
clarinet check
clarinet test
```

### Frontend
```bash
npm run build
npm run start
```

## 📝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Autores

- **Pablo Guzmán** - Desarrollo inicial
- **Andrés Peña** - Desarrollo inicial

## 🙏 Agradecimientos

- Comunidad de Stacks por el excelente ecosistema
- Equipo de Hiro por las herramientas de desarrollo
- Comunidad de desarrolladores de blockchain

## 📞 Contacto

- GitHub: [@jpgsChile](https://github.com/jpgsChile)
- Proyecto: [Handicap-Futbol](https://github.com/jpgsChile/handicap-futbol)
- Vercel: [Handicap-Futbol-Web] https://handicap-futbol.vercel.app/
---

**⚽ ¡Construyendo el futuro del fútbol sobre blockchain! ⚽**
