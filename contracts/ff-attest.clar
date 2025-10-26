;; Testificaciones (v1)

(define-map attests
  { entity: (string-utf8 16), id: uint, who: principal }
  { weight: uint, comment: (string-utf8 64), cid: (string-utf8 128) })

(define-map attest-counters
  { entity: (string-utf8 16), id: uint }
  { sum: uint, count: uint })

(define-map verifications
  { entity: (string-utf8 16), id: uint }
  { nivel: (string-utf8 16) })

(define-public (attest (entity (string-utf8 16)) (id uint) (weight uint) (comment (string-utf8 64)) (cid (string-utf8 128)))
  (let (
        (k { entity: entity, id: id })
        (key { entity: entity, id: id, who: tx-sender })
       )
    (let ((existing (map-get? attests key)))
      (let ((c (default-to { sum: u0, count: u0 } (map-get? attest-counters k))))
        (begin
          (map-set attests key { weight: weight, comment: comment, cid: cid })
          (if (is-some existing)
            (let ((prev (get weight (unwrap-panic existing))))
              (map-set attest-counters k { sum: (+ (- (get sum c) prev) weight), count: (get count c) }))
            (map-set attest-counters k { sum: (+ (get sum c) weight), count: (+ (get count c) u1) }))
          (ok true))))))

;; Resumen de attestations para una entidad/id (sum y count)
(define-read-only (attest-resumen (entity (string-utf8 16)) (id uint))
  (let ((rec (default-to { sum: u0, count: u0 } (map-get? attest-counters { entity: entity, id: id }))))
    (ok rec)))

;; Elevar verificacion para juego (simple MVP)
(define-public (elevar-verificacion (game-id uint) (nivel (string-utf8 16)))
  (begin
    (map-set verifications { entity: u"juego", id: game-id } { nivel: nivel })
    (ok true)))

(define-read-only (get-verificacion-juego (game-id uint))
  (default-to { nivel: u"none" } (map-get? verifications { entity: u"juego", id: game-id })))


