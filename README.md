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

## 📁 Estructura del Proyecto

```
handicap-futbol/
├── contracts/
│   └── handicap-futbol.clar    # Contrato inteligente principal
├── components/
│   ├── Connect.tsx             # Componente de conexión de wallet
│   ├── FormsBasics.tsx         # Formularios básicos (ligas, clubes, jugadores)
│   └── FormsGame.tsx           # Formularios de partidos y eventos
├── app/
│   ├── page.tsx                # Página principal
│   ├── layout.tsx              # Layout de la aplicación
│   └── globals.css             # Estilos globales
├── lib/
│   └── stacks.ts               # Configuración de Stacks
├── Clarinet.toml               # Configuración de Clarinet
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

---

**⚽ ¡Construyendo el futuro del fútbol sobre blockchain! ⚽**
