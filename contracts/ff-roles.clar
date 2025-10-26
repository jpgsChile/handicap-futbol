;; Modulo de Roles (v1)

(define-data-var contract-owner principal tx-sender)

(define-constant ERR-UNAUTHORIZED (err u401))

;; roles:
;; 1 jugador, 2 dt, 3 rep, 4 liga, 5 admin

(define-map roles
  { who: principal, role: uint }
  { enabled: bool })

(define-public (asignar-rol (who principal) (role uint) (enabled bool))
  (if (is-eq tx-sender (var-get contract-owner))
      (begin
        (map-set roles { who: who, role: role } { enabled: enabled })
        (ok true))
      ERR-UNAUTHORIZED))

(define-read-only (tiene-rol (who principal) (role uint))
  (default-to false (get enabled (map-get? roles { who: who, role: role }))))


