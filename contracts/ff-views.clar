;; Modulo de lecturas (v1)

(define-constant ERR-NOT-FOUND (err u404))

;; Suponemos que ff-league esta desplegado como ff-league en el mismo address.

(define-read-only (liga-detalle (id uint))
  (contract-call? .ff-league get-liga id))

(define-read-only (club-detalle (id uint))
  (contract-call? .ff-club get-club id))

(define-read-only (jugador-detalle (who principal))
  (contract-call? .ff-player get-jugador who))

;; Juegos y eventos
(define-read-only (juego-detalle (id uint))
  (contract-call? .ff-game get-juego id))

(define-read-only (alineacion-detalle (game-id uint) (who principal))
  (contract-call? .ff-lineup get-alineacion game-id who))

(define-read-only (evento-detalle (game-id uint) (index uint))
  (contract-call? .ff-event get-evento game-id index))

(define-read-only (evento-contador (game-id uint) (tipo (string-utf8 16)))
  (contract-call? .ff-event get-contador game-id tipo))

;; Verificacion/attest agregadas
(define-read-only (attest-resumen (entity (string-utf8 16)) (id uint))
  (contract-call? .ff-attest attest-resumen entity id))

(define-read-only (verificacion-juego (id uint))
  (contract-call? .ff-attest get-verificacion-juego id))


