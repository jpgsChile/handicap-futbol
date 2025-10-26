;; Eventos de partido (v1)

(define-constant ERR-NOT-FOUND (err u404))
(define-constant ERR-UNAUTHORIZED (err u401))

(define-data-var next-event-id uint u0)

(define-map events
  { game-id: uint, index: uint }
  { club-id: uint, who: principal, tipo: (string-utf8 16), minuto: uint, meta: (string-utf8 32), cid: (string-utf8 128) })

(define-map event-counters
  { game-id: uint, tipo: (string-utf8 16) }
  { count: uint })

(define-public (registrar-evento-ff (game-id uint) (club-id uint) (who principal) (tipo (string-utf8 16)) (minuto uint) (meta (string-utf8 32)) (cid (string-utf8 128)))
  (if (is-eq tx-sender who)
      (let ((idx (+ (var-get next-event-id) u1)))
        (begin
          (var-set next-event-id idx)
          (map-set events { game-id: game-id, index: idx } { club-id: club-id, who: who, tipo: tipo, minuto: minuto, meta: meta, cid: cid })
          (let ((k { game-id: game-id, tipo: tipo }))
            (map-set event-counters k { count: (+ (default-to u0 (get count (map-get? event-counters k))) u1) }))
          (ok idx)))
      ERR-UNAUTHORIZED))

(define-read-only (get-evento (game-id uint) (index uint))
  (match (map-get? events { game-id: game-id, index: index })
    ev (ok ev)
    ERR-NOT-FOUND))

(define-read-only (get-contador (game-id uint) (tipo (string-utf8 16)))
  (let ((rec (default-to { count: u0 } (map-get? event-counters { game-id: game-id, tipo: tipo }))))
    (ok (get count rec))) )


