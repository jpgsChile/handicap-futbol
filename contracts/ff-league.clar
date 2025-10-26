;; Modulo de Ligas (v1)

(define-data-var contract-owner principal tx-sender)
(define-constant ERR-UNAUTHORIZED (err u401))
(define-constant ERR-NOT-FOUND (err u404))

(define-data-var next-league-id uint u0)

(define-map leagues
  { id: uint }
  { nombre: (string-utf8 64), ubicacion: (string-utf8 64), categoria: (string-utf8 32) })

(define-public (crear-liga (nombre (string-utf8 64)) (ubicacion (string-utf8 64)) (categoria (string-utf8 32)))
  (let ((id (+ (var-get next-league-id) u1)))
    (begin
      (var-set next-league-id id)
      (map-set leagues { id: id } { nombre: nombre, ubicacion: ubicacion, categoria: categoria })
      (ok id))))

(define-read-only (get-liga (id uint))
  (match (map-get? leagues { id: id })
    liga (ok liga)
    ERR-NOT-FOUND))



